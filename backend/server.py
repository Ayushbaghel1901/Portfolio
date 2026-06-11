from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Header, Depends
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL', 'ayushbaghel19@gmail.com')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', '')

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Resume file path
DATA_DIR = ROOT_DIR / 'data'
DATA_DIR.mkdir(exist_ok=True)
RESUME_PATH = DATA_DIR / 'resume.pdf'

# Create the main app without a prefix
app = FastAPI(title="Ayush Baghel - Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# -------------------- Models --------------------
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default="New message from portfolio", max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    email_sent: bool = False
    read: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# -------------------- Helpers --------------------
def build_email_html(payload: ContactCreate) -> str:
    safe_message = (payload.message or "").replace("\n", "<br/>")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color:#0a0a0a; padding:24px;">
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background:#121212; border:1px solid #1f1f1f; border-radius:8px;">
            <tr>
              <td style="padding:24px 24px 8px 24px;">
                <p style="margin:0; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#22d3ee;">New Portfolio Message</p>
                <h1 style="margin:8px 0 0 0; color:#ffffff; font-size:22px;">{payload.subject or 'New message'}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px 24px; color:#d4d4d8; font-size:14px; line-height:1.6;">
                <p style="margin:16px 0 4px 0;"><strong style="color:#ffffff;">From:</strong> {payload.name} &lt;{payload.email}&gt;</p>
                <hr style="border:none; border-top:1px solid #2a2a2a; margin:16px 0;" />
                <p style="margin:0; white-space:pre-wrap;">{safe_message}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    """


async def send_contact_email(payload: ContactCreate) -> bool:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured; skipping email send.")
        return False

    params = {
        "from": SENDER_EMAIL,
        "to": [OWNER_EMAIL],
        "reply_to": payload.email,
        "subject": f"[Portfolio] {payload.subject or 'New message'} — from {payload.name}",
        "html": build_email_html(payload),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Resend email sent: {result.get('id') if isinstance(result, dict) else result}")
        return True
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        return False


def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=500, detail="Admin token not configured on server")
    if not x_admin_token or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return True


# -------------------- Routes --------------------
@api_router.get("/")
async def root():
    return {"message": "Ayush Baghel Portfolio API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "email_configured": bool(RESEND_API_KEY),
        "resume_available": RESUME_PATH.exists(),
    }


@api_router.post("/contact")
async def submit_contact(payload: ContactCreate):
    email_ok = await send_contact_email(payload)

    record = ContactRecord(
        name=payload.name,
        email=payload.email,
        subject=payload.subject or "New message from portfolio",
        message=payload.message,
        email_sent=email_ok,
    )
    doc = record.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)

    return {
        "success": True,
        "email_sent": email_ok,
        "message": "Thanks! Your message has been received." if email_ok else "Message saved. Email delivery is currently unavailable, but Ayush will see your message.",
        "id": record.id,
    }


@api_router.get("/contacts", dependencies=[Depends(require_admin)])
async def list_contacts():
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    unread = sum(1 for i in items if not i.get("read", False))
    return {"items": items, "count": len(items), "unread": unread}


@api_router.patch("/contacts/{contact_id}/read", dependencies=[Depends(require_admin)])
async def mark_contact_read(contact_id: str, read: bool = True):
    result = await db.contacts.update_one({"id": contact_id}, {"$set": {"read": read}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"success": True, "id": contact_id, "read": read}


@api_router.delete("/contacts/{contact_id}", dependencies=[Depends(require_admin)])
async def delete_contact(contact_id: str):
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"success": True, "id": contact_id}


@api_router.post("/admin/verify")
async def verify_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=500, detail="Admin token not configured on server")
    if not x_admin_token or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return {"success": True, "authorized": True}


@api_router.get("/resume")
async def download_resume():
    if not RESUME_PATH.exists():
        raise HTTPException(status_code=404, detail="Resume not available")
    return FileResponse(
        path=str(RESUME_PATH),
        media_type="application/pdf",
        filename="Ayush_Baghel_Resume.pdf",
    )


@api_router.post("/admin/resume", dependencies=[Depends(require_admin)])
async def upload_resume(file: UploadFile = File(...)):
    if file.content_type not in ("application/pdf", "application/octet-stream"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")
    RESUME_PATH.write_bytes(content)
    logger.info(f"Resume updated. Size={len(content)} bytes")
    return {"success": True, "size_bytes": len(content), "filename": "resume.pdf"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
