import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import { useResumeModal } from "@/lib/ResumeModalContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const VIEW_URL = `${BACKEND_URL}/api/resume/view`;
const DOWNLOAD_URL = `${BACKEND_URL}/api/resume`;

export default function ResumeModal() {
  const { open, closeModal } = useResumeModal();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm grid place-items-center p-4 sm:p-8"
          onClick={closeModal}
          data-testid="resume-modal-overlay"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[90vh] bg-[#0e0e0e] border border-white/10 rounded-md overflow-hidden flex flex-col"
            data-testid="resume-modal"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10 bg-[#0a0a0a]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 grid place-items-center rounded-sm border border-cyan-400/40 bg-cyan-500/10 flex-shrink-0">
                  <FileText className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400">
                    Resume
                  </div>
                  <div className="font-display text-sm font-bold text-white truncate">
                    Ayush Baghel — Resume Preview
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={VIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 px-3 py-2 rounded-sm"
                  data-testid="resume-modal-new-tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> New tab
                </a>
                <a
                  href={DOWNLOAD_URL}
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-black px-3 py-2 rounded-sm"
                  data-testid="resume-modal-download"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="w-9 h-9 grid place-items-center rounded-sm border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition"
                  data-testid="resume-modal-close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="flex-1 bg-[#1a1a1a]">
              <iframe
                src={`${VIEW_URL}#toolbar=1&navpanes=0&view=FitH`}
                title="Resume preview"
                className="w-full h-full"
                data-testid="resume-modal-iframe"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
