import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const PARAGRAPHS = [
  "I'm Ayush — a B.Tech Information Technology student at MITS Gwalior, with a strong focus on data analytics, business intelligence and the storytelling power of clean dashboards.",
  "I love turning messy datasets into clear, decision-ready visuals: Power BI dashboards, EDA in Python, SQL deep-dives, and supervised ML models that go beyond just numbers.",
  "I'm AI-native in how I work — Gemini, GPT, Claude, Cursor and Antigravity are my daily copilots for moving from data to insight, faster and with sharper craft.",
];

const HIGHLIGHTS = [
  { k: "Focus", v: "Data Analytics, BI & Machine Learning" },
  { k: "Currently", v: "Building ML pipelines & analytics dashboards" },
  { k: "Languages", v: "English (Professional), Hindi (Native)" },
  { k: "Open to", v: "Data Analyst internships, BI & ML projects" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel index="01" label="About" />
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight">
              Data-driven by craft.
              <br />
              <span className="text-cyan-400">AI-augmented</span> by default.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-zinc-400 text-base sm:text-lg leading-relaxed">
            {PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-testid={`about-paragraph-${i}`}
              >
                {p}
              </motion.p>
            ))}

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.k}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  data-testid={`about-highlight-${i}`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                    {h.k}
                  </div>
                  <div className="mt-2 text-white font-medium">{h.v}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
