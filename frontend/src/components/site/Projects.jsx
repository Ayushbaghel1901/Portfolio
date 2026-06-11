import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32" data-testid="projects-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <SectionLabel index="03" label="Projects" />
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight">
              Selected <span className="text-cyan-400">work</span>.
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md">
            Real systems with measurable outcomes — from analytics dashboards to
            secure full-stack platforms and ML pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-md border border-white/10 hover:border-cyan-400/50 bg-[#0e0e0e] transition-colors flex flex-col"
              data-testid={`project-card-${p.id}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan-300">
                    {p.tag}
                  </span>
                </div>
                {p.inProgress && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber-300">
                      In Progress
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-cyan-300 transition">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-cyan-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  {p.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-mono px-2 py-1 rounded-sm bg-white/5 text-zinc-300 border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-white/5 grid grid-cols-2 gap-3">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-xl font-bold text-white">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
