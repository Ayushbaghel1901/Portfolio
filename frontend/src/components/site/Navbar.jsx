import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/data";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const RESUME_URL = `${BACKEND_URL}/api/resume`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= y) {
          setActive(NAV_LINKS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 group"
          data-testid="nav-logo"
        >
          <span className="font-display text-xl font-black tracking-tight text-white">
            {PROFILE.firstName}
            <span className="text-cyan-400">.</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 group-hover:text-cyan-400 transition">
            portfolio
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                active === link.id
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
              data-testid={`nav-link-${link.id}`}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-3 right-3 -bottom-0.5 h-px bg-cyan-400"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            download
            className="hidden sm:inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm px-4 py-2 rounded-sm transition-colors shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_25px_rgba(34,211,238,0.55)]"
            data-testid="nav-resume-button"
          >
            <Download className="w-4 h-4" /> Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 text-white"
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm font-medium text-zinc-300 hover:text-cyan-400"
                  data-testid={`nav-mobile-link-${link.id}`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                download
                className="mt-2 inline-flex items-center justify-center gap-2 bg-cyan-500 text-black font-semibold text-sm px-4 py-2 rounded-sm"
                data-testid="nav-mobile-resume-button"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
