import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32" data-testid="education-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-12">
          <SectionLabel index="04" label="Education" />
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight">
            Academic <span className="text-cyan-400">journey</span>.
          </h2>
        </div>

        <div className="space-y-6">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative p-6 sm:p-8 rounded-md border border-white/10 bg-[#0e0e0e] hover:border-cyan-400/40 transition-colors"
              data-testid={`education-card-${i}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-1">
                  <div className="w-12 h-12 grid place-items-center rounded-sm border border-cyan-400/40 bg-cyan-500/10">
                    <GraduationCap className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>
                <div className="md:col-span-11">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                        {edu.institution}
                      </h3>
                      <p className="mt-1 text-cyan-300 text-sm font-medium">
                        {edu.degree}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {edu.period}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-3">
                      Relevant Coursework
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 border border-white/5"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
