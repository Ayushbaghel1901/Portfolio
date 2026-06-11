import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-black tracking-tight text-white">
            Ayush Baghel
            <span className="text-cyan-400">.</span>
          </span>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500">
            © {new Date().getFullYear()} — Built with care
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 grid place-items-center rounded-sm border border-white/10 text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 transition"
            data-testid="footer-github"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 grid place-items-center rounded-sm border border-white/10 text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 transition"
            data-testid="footer-linkedin"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Email"
            className="w-9 h-9 grid place-items-center rounded-sm border border-white/10 text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 transition"
            data-testid="footer-email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
