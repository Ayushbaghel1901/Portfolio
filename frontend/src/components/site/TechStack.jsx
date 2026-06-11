import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { AI_TOOLS, TECH_GROUPS, AI_PROVIDER_ICONS } from "@/lib/data";

export default function TechStack() {
  return (
    <section id="stack" className="relative py-24 sm:py-32 overflow-hidden" data-testid="stack-section">
      {/* Soft glow */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl">
          <SectionLabel index="02" label="Tech Stack" />
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight">
            Tools I use to <span className="text-cyan-400">ship</span>.
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            From low-level C++ to high-leverage AI copilots — here is the stack
            that powers my work.
          </p>
        </div>

        {/* AI TOOLS — featured */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/10">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-300">
                AI Tools — Daily Drivers
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {AI_TOOLS.map((tool, i) => {
              const ProviderIcon = AI_PROVIDER_ICONS[tool.name];
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative p-5 rounded-md border border-white/10 bg-[#101010] hover:border-cyan-400/50 transition-colors overflow-hidden"
                  data-testid={`ai-tool-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {/* corner glow */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-cyan-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-cyan-400">
                        {tool.proficiency}
                      </div>
                      <div className="mt-2 font-display text-lg font-bold text-white">
                        {tool.name}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        {tool.note}
                      </div>
                    </div>
                    {ProviderIcon && (
                      <ProviderIcon className="w-5 h-5 text-zinc-500 group-hover:text-cyan-300 transition" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* TECH GROUPS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECH_GROUPS.map((group, gi) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
                className="p-6 rounded-md border border-white/10 bg-[#0e0e0e]"
                data-testid={`tech-group-${group.id}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 grid place-items-center rounded-sm border border-white/10 bg-white/5">
                    <GroupIcon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                      Group · 0{gi + 1}
                    </div>
                    <div className="font-display text-lg font-bold text-white">
                      {group.label}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const Icon = item.Icon;
                    return (
                      <div
                        key={item.name}
                        className="group inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-[#161616] border border-white/5 hover:border-cyan-400/40 hover:bg-[#1b1b1b] transition-colors"
                        data-testid={`tech-item-${item.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                      >
                        <Icon
                          className="w-4 h-4 transition-transform group-hover:scale-110"
                          style={{ color: item.color }}
                        />
                        <span className="text-xs font-medium text-zinc-300 group-hover:text-white">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
