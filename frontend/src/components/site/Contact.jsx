import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Github, Linkedin, Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { PROFILE } from "@/lib/data";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CONTACT_LINKS = [
  {
    id: "email",
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    Icon: Mail,
  },
  {
    id: "phone",
    label: "Phone",
    value: PROFILE.phone,
    href: `tel:${PROFILE.phoneRaw}`,
    Icon: Phone,
  },
  {
    id: "github",
    label: "GitHub",
    value: "Ayushbaghel1901",
    href: PROFILE.github,
    Icon: Github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "nayushbaghel19",
    href: PROFILE.linkedin,
    Icon: Linkedin,
  },
  {
    id: "location",
    label: "Location",
    value: PROFILE.location,
    href: "https://maps.google.com/?q=Gwalior,Madhya+Pradesh,India",
    Icon: MapPin,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      toast.success(res.data?.message || "Message sent. I'll get back to you soon!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Could not send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden" data-testid="contact-section">
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel index="05" label="Contact" />
            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight">
              Let&apos;s build <br />
              something <span className="text-cyan-400">together</span>.
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-md">
              Open to internships, collaboration on ML / data projects, or just
              a good conversation about AI tooling. Drop a message.
            </p>

            <div className="mt-10 space-y-3">
              {CONTACT_LINKS.map((c, i) => {
                const Icon = c.Icon;
                return (
                  <motion.a
                    key={c.id}
                    href={c.href}
                    target={c.id === "email" || c.id === "phone" ? "_self" : "_blank"}
                    rel="noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group flex items-center gap-4 p-4 rounded-md border border-white/10 bg-[#0e0e0e] hover:border-cyan-400/50 hover:bg-[#111] transition-colors"
                    data-testid={`contact-link-${c.id}`}
                  >
                    <div className="w-10 h-10 grid place-items-center rounded-sm border border-white/10 bg-white/5 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-colors">
                      <Icon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                        {c.label}
                      </div>
                      <div className="text-sm text-white font-medium group-hover:text-cyan-300 transition">
                        {c.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-md border border-white/10 bg-[#0e0e0e]"
              data-testid="contact-form"
            >
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400 mb-2">
                Send a message
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Start the conversation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  testid="contact-name-input"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                  testid="contact-email-input"
                />
              </div>
              <div className="mt-4">
                <Field
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="What's it about?"
                  testid="contact-subject-input"
                />
              </div>
              <div className="mt-4">
                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about your project or idea..."
                  rows={6}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors resize-none"
                  data-testid="contact-message-input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-black font-semibold px-6 py-3 rounded-sm transition-colors shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
                data-testid="contact-submit-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send message
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, testid }) {
  return (
    <div>
      <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors"
        data-testid={testid}
        required={name !== "subject"}
      />
    </div>
  );
}
