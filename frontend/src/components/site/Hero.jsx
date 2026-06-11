import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { PROFILE } from "@/lib/data";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const RESUME_URL = `${BACKEND_URL}/api/resume`;

const stat = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.6, ease: "easeOut" } }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen pt-28 pb-20 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background grid */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      {/* Cyan glow */}
      <div className="absolute -top-32 -right-20 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Text */}
        <motion.div style={{ y: textY }} className="lg:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono tracking-[0.2em] uppercase text-cyan-400"
            data-testid="hero-badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Available for internships & collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display mt-6 text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95]"
            data-testid="hero-name"
          >
            Ayush <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Baghel
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed"
            data-testid="hero-tagline"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-sm transition-colors shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_45px_rgba(34,211,238,0.6)]"
              data-testid="hero-resume-button"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white font-semibold px-6 py-3 rounded-sm transition-colors"
              data-testid="hero-contact-button"
            >
              Get in touch <ArrowDownRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-zinc-500"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              {PROFILE.location}
            </span>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 hover:text-white transition"
              data-testid="hero-email-link"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition"
              data-testid="hero-github-link"
            >
              <Github className="w-4 h-4 text-cyan-400" /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition"
              data-testid="hero-linkedin-link"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn
            </a>
          </motion.div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 max-w-md gap-6">
            {[
              { k: "10+", v: "AI tools mastered" },
              { k: "4", v: "Shipped projects" },
              { k: "3K+", v: "Users impacted" },
            ].map((s, i) => (
              <motion.div
                key={s.v}
                variants={stat}
                initial="hidden"
                animate="show"
                custom={i + 1}
                className="border-l border-white/10 pl-4"
                data-testid={`hero-stat-${i}`}
              >
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {s.k}
                </div>
                <div className="mt-1 text-xs font-mono uppercase tracking-[0.18em] text-zinc-500">
                  {s.v}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div style={{ y: photoY }} className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative cyan offset frame */}
            <div className="absolute -inset-3 sm:-inset-4 border border-cyan-400/40 translate-x-3 translate-y-3 rounded-sm pointer-events-none" />
            <div className="absolute -inset-3 sm:-inset-4 border border-white/10 -translate-x-3 -translate-y-3 rounded-sm pointer-events-none" />

            <div
              className="relative w-[260px] sm:w-[320px] lg:w-[380px] aspect-[4/5] overflow-hidden rounded-sm glow-cyan"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
              }}
            >
              <img
                src={PROFILE.photo}
                alt={PROFILE.name}
                className="w-full h-full object-cover object-top contrast-105"
                data-testid="hero-photo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
              {/* Corner ticks */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-400" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-400" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-400" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-400" />
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-6 -left-6 sm:-left-10 px-4 py-3 glass rounded-sm hidden sm:block">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400">
                role
              </div>
              <div className="font-display text-sm font-semibold text-white">
                {PROFILE.role}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
