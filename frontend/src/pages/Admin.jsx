import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ShieldCheck, Lock, LogOut, Inbox, FileUp, Mail, Phone,
  Trash2, CheckCircle2, Circle, RefreshCcw, Upload, FileText, Search, Loader2, Eye, EyeOff
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = "ayush_admin_token";

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  // Verify saved token on mount
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setChecking(false);
      return;
    }
    axios
      .post(`${API}/admin/verify`, null, { headers: { "X-Admin-Token": saved } })
      .then(() => setAuthed(true))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
      })
      .finally(() => setChecking(false));
  }, []);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthed(false);
    toast.success("Logged out");
  };

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0a0a0a] text-zinc-400">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!authed) {
    return <Login token={token} setToken={setToken} onSuccess={() => setAuthed(true)} />;
  }

  return <Dashboard token={localStorage.getItem(TOKEN_KEY)} onLogout={logout} />;
}

function Login({ token, setToken, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Enter your admin token");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/admin/verify`, null, { headers: { "X-Admin-Token": token } });
      localStorage.setItem(TOKEN_KEY, token);
      toast.success("Welcome back, Ayush");
      onSuccess();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Invalid token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-[#0a0a0a] px-6 relative overflow-hidden">
      <div className="absolute -top-32 -right-20 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-8 rounded-md border border-white/10 bg-[#0e0e0e]"
        data-testid="admin-login-form"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 grid place-items-center rounded-sm border border-cyan-400/40 bg-cyan-500/10">
            <ShieldCheck className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400">
              Admin
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Sign in</h1>
          </div>
        </div>
        <p className="text-sm text-zinc-500 mb-6">
          Enter your admin token to access the dashboard.
        </p>

        <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">
          Admin Token
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type={show ? "text" : "password"}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your admin token..."
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm pl-10 pr-12 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 font-mono"
            data-testid="admin-token-input"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            data-testid="admin-token-toggle"
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-black font-semibold px-6 py-3 rounded-sm transition-colors shadow-[0_0_25px_rgba(34,211,238,0.35)]"
          data-testid="admin-login-button"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
          {loading ? "Verifying..." : "Sign in"}
        </button>

        <a
          href="/"
          className="block mt-4 text-center text-xs text-zinc-500 hover:text-cyan-300"
          data-testid="admin-back-link"
        >
          ← Back to portfolio
        </a>
      </motion.form>
    </div>
  );
}

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState("inbox");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  const headers = { "X-Admin-Token": token };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/contacts`, { headers });
      setMessages(res.data.items || []);
      setUnread(res.data.unread || 0);
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filtered = messages.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.subject?.toLowerCase().includes(q) ||
      m.message?.toLowerCase().includes(q)
    );
  });

  const toggleRead = async (msg) => {
    try {
      await axios.patch(
        `${API}/contacts/${msg.id}/read?read=${!msg.read}`,
        null,
        { headers }
      );
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: !msg.read } : m))
      );
      setUnread((u) => (msg.read ? u + 1 : Math.max(0, u - 1)));
    } catch {
      toast.error("Could not update");
    }
  };

  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;
    try {
      await axios.delete(`${API}/contacts/${id}`, { headers });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (active?.id === id) setActive(null);
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 grid place-items-center rounded-sm border border-cyan-400/40 bg-cyan-500/10">
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400">
                Admin Console
              </div>
              <div className="font-display text-base font-bold">
                Ayush Baghel
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-cyan-300 px-3 py-2"
              data-testid="admin-view-site"
            >
              View site →
            </a>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 text-xs font-semibold border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 px-3 py-2 rounded-sm"
              data-testid="admin-logout"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8">
          <TabButton
            active={tab === "inbox"}
            onClick={() => setTab("inbox")}
            icon={Inbox}
            label="Inbox"
            badge={unread}
            testid="tab-inbox"
          />
          <TabButton
            active={tab === "resume"}
            onClick={() => setTab("resume")}
            icon={FileUp}
            label="Resume"
            testid="tab-resume"
          />
        </div>

        {tab === "inbox" && (
          <InboxPanel
            messages={filtered}
            total={messages.length}
            unread={unread}
            loading={loading}
            search={search}
            setSearch={setSearch}
            onRefresh={fetchMessages}
            active={active}
            setActive={setActive}
            toggleRead={toggleRead}
            deleteMsg={deleteMsg}
          />
        )}
        {tab === "resume" && <ResumePanel token={token} />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label, badge, testid }) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border text-sm font-medium transition-colors ${
        active
          ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-300"
          : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
      }`}
      data-testid={testid}
    >
      <Icon className="w-4 h-4" />
      {label}
      {badge > 0 && (
        <span className="ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold rounded-full bg-cyan-500 text-black">
          {badge}
        </span>
      )}
    </button>
  );
}

function InboxPanel({
  messages, total, unread, loading, search, setSearch, onRefresh,
  active, setActive, toggleRead, deleteMsg,
}) {
  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total" value={total} />
        <StatCard label="Unread" value={unread} accent />
        <StatCard label="Read" value={total - unread} className="hidden sm:block" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, subject..."
            className="w-full bg-[#0e0e0e] border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/60 focus:outline-none"
            data-testid="inbox-search"
          />
        </div>
        <button
          onClick={onRefresh}
          className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-cyan-400/40 text-zinc-300 hover:text-cyan-300 px-4 py-2.5 rounded-sm text-sm"
          data-testid="inbox-refresh"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List */}
        <div className="lg:col-span-5 border border-white/10 rounded-sm bg-[#0e0e0e] overflow-hidden">
          {loading && messages.length === 0 ? (
            <div className="p-10 grid place-items-center text-zinc-500">
              <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
            </div>
          ) : messages.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="divide-y divide-white/5 max-h-[640px] overflow-y-auto">
              {messages.map((m) => (
                <li
                  key={m.id}
                  onClick={() => {
                    setActive(m);
                    if (!m.read) toggleRead(m);
                  }}
                  className={`p-4 cursor-pointer transition-colors ${
                    active?.id === m.id
                      ? "bg-cyan-500/5 border-l-2 border-cyan-400"
                      : "hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                  data-testid={`message-item-${m.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      {m.read ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm truncate ${m.read ? "text-zinc-400" : "text-white font-semibold"}`}>
                        {m.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 flex-shrink-0">
                      {formatDate(m.created_at)}
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs text-zinc-500 truncate">{m.email}</div>
                  <div className={`mt-1.5 text-sm truncate ${m.read ? "text-zinc-500" : "text-zinc-300"}`}>
                    {m.subject || "(no subject)"}
                  </div>
                  <div className="mt-1 text-xs text-zinc-600 truncate">{m.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-7 border border-white/10 rounded-sm bg-[#0e0e0e] min-h-[400px]">
          {!active ? (
            <div className="h-full grid place-items-center text-center p-10 text-zinc-500">
              <div>
                <Mail className="w-8 h-8 mx-auto mb-3 text-zinc-700" />
                <p className="text-sm">Select a message to read</p>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8" data-testid="message-detail">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400">
                    From
                  </div>
                  <h3 className="mt-1 font-display text-xl font-bold text-white truncate">
                    {active.name}
                  </h3>
                  <a
                    href={`mailto:${active.email}`}
                    className="text-sm text-cyan-300 hover:underline inline-flex items-center gap-1.5 mt-1"
                  >
                    <Mail className="w-3.5 h-3.5" /> {active.email}
                  </a>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="font-mono text-[10px] text-zinc-500">
                    {formatDate(active.created_at, true)}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded-sm ${
                    active.email_sent ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"
                  }`}>
                    {active.email_sent ? "EMAIL DELIVERED" : "DB ONLY"}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-5">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">
                  Subject
                </div>
                <h4 className="text-lg text-white font-semibold mb-5">
                  {active.subject || "(no subject)"}
                </h4>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">
                  Message
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {active.message}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${active.email}?subject=Re: ${encodeURIComponent(active.subject || "Your message")}`}
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-sm text-sm"
                  data-testid="message-reply"
                >
                  <Mail className="w-4 h-4" /> Reply
                </a>
                <button
                  onClick={() => toggleRead(active)}
                  className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 px-4 py-2 rounded-sm text-sm"
                  data-testid="message-toggle-read"
                >
                  {active.read ? <Circle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  Mark as {active.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => deleteMsg(active.id)}
                  className="ml-auto inline-flex items-center gap-2 border border-red-500/30 hover:border-red-500/60 text-red-400 px-4 py-2 rounded-sm text-sm"
                  data-testid="message-delete"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResumePanel({ token }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onPick = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File too large (max 10MB)");
      return;
    }
    setFile(f);
  };

  const submit = async () => {
    if (!file) {
      toast.error("Select a PDF first");
      return;
    }
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      await axios.post(`${API}/admin/resume`, form, {
        headers: { "X-Admin-Token": token },
      });
      toast.success("Resume updated successfully");
      setFile(null);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onPick(e.dataTransfer.files?.[0]);
          }}
          className={`relative rounded-md border-2 border-dashed transition-colors p-12 text-center ${
            dragOver
              ? "border-cyan-400 bg-cyan-500/5"
              : "border-white/10 bg-[#0e0e0e] hover:border-white/20"
          }`}
          data-testid="resume-dropzone"
        >
          <div className="w-14 h-14 mx-auto grid place-items-center rounded-sm border border-cyan-400/40 bg-cyan-500/10 mb-4">
            <Upload className="w-6 h-6 text-cyan-300" />
          </div>
          <h3 className="font-display text-xl font-bold mb-1">
            Drop your new resume here
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            PDF only · max 10MB
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => onPick(e.target.files?.[0])}
            id="resume-file"
            className="hidden"
            data-testid="resume-file-input"
          />
          <label
            htmlFor="resume-file"
            className="inline-flex cursor-pointer items-center gap-2 border border-white/15 hover:border-white/30 text-white px-5 py-2.5 rounded-sm text-sm font-semibold"
          >
            <FileText className="w-4 h-4" /> Browse files
          </label>

          {file && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-sm bg-white/5 border border-white/10">
              <FileText className="w-5 h-5 text-cyan-300" />
              <div className="text-left">
                <div className="text-sm text-white font-medium">{file.name}</div>
                <div className="text-[10px] font-mono text-zinc-500">
                  {(file.size / 1024).toFixed(1)} KB
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-zinc-500 hover:text-red-400 ml-2"
                data-testid="resume-clear"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={submit}
          disabled={!file || uploading}
          className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold px-6 py-3 rounded-sm shadow-[0_0_25px_rgba(34,211,238,0.35)]"
          data-testid="resume-upload-button"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading..." : "Replace live resume"}
        </button>
      </div>

      <div className="lg:col-span-5">
        <div className="p-6 rounded-md border border-white/10 bg-[#0e0e0e]">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400 mb-2">
            Current resume
          </div>
          <h4 className="font-display text-lg font-bold text-white mb-4">
            Live on portfolio
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed mb-5">
            Anyone clicking &quot;Download Resume&quot; on your portfolio gets the file
            below. Upload a new one to instantly replace it everywhere — no code
            changes needed.
          </p>
          <a
            href={`${API}/resume`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline"
            data-testid="resume-preview-link"
          >
            <FileText className="w-4 h-4" /> Preview current resume
          </a>
        </div>

        <div className="mt-6 p-6 rounded-md border border-white/10 bg-[#0e0e0e]">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">
            Tip
          </div>
          <p className="text-sm text-zinc-400">
            Update your resume after every new project, certification or
            internship. Your portfolio will always serve the latest version.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent, className = "" }) {
  return (
    <div className={`p-5 rounded-sm border border-white/10 bg-[#0e0e0e] ${className}`}>
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
        {label}
      </div>
      <div className={`mt-2 font-display text-3xl font-black ${accent ? "text-cyan-300" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-10 text-center">
      <Inbox className="w-10 h-10 mx-auto text-zinc-700 mb-3" />
      <p className="text-sm text-zinc-500">No messages yet.</p>
      <p className="text-xs text-zinc-600 mt-1">
        New submissions will appear here in real time.
      </p>
    </div>
  );
}

function formatDate(iso, full = false) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (full) {
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
