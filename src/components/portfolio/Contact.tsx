import { motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SectionHeading } from "./primitives";
import { toast } from "sonner";
import { Send, Github, Mail, Linkedin } from "lucide-react";

const PROMPT_TEXT = "Let's build your automation.";

function useTyped(text: string, start: boolean) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, [text, start]);
  return out;
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const typed = useTyped(PROMPT_TEXT, started);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStarted(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Fill in every field to send.");
      return;
    }
    toast.success("Message queued — I'll get back to you shortly.");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section id="contact" className="relative px-6 py-28" ref={ref}>
      <SectionHeading
        eyebrow="Command Terminal"
        title="Let's automate the boring parts"
        subtitle="Send a transmission and I'll respond with how we can eliminate your repetitive work."
      />

      <div className="mx-auto mt-14 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong glow-border overflow-hidden rounded-3xl"
        >
          {/* terminal header */}
          <div className="flex items-center gap-2 border-b border-glass-border px-5 py-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-chart-5/70" />
              <span className="size-2.5 rounded-full bg-emerald/70" />
            </span>
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              redento@automation ~ %
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <p className="font-mono text-sm text-emerald">
              <span className="text-muted-foreground">&gt;</span> {typed}
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-emerald align-middle" />
            </p>

            <form onSubmit={submit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TermField label="name" value={name} onChange={setName} placeholder="Your name" />
                <TermField
                  label="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@company.com"
                  type="email"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-cyan">--message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="What repetitive process should we automate?"
                  className="mt-1.5 w-full resize-none rounded-xl border border-glass-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cyan/50"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--glow-blue)]"
              >
                Send Transmission
                <Send className="size-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-3 border-t border-glass-border pt-6">
              {[
                { icon: Mail, label: "Email" },
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className="grid size-10 place-items-center rounded-xl border border-glass-border bg-background/40 text-muted-foreground transition-colors hover:text-cyan"
                  aria-label={s.label}
                >
                  <s.icon className="size-4" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TermField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="font-mono text-xs text-cyan">--{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cyan/50"
      />
    </div>
  );
}
