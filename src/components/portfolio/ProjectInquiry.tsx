import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { SectionHeading } from "./primitives";
import { toast } from "sonner";
import { Send, ShieldCheck, CheckCircle2, Mail, Linkedin, Phone } from "lucide-react";

const FORM_ENDPOINT =
  "https://docs.google.com/forms/d/e/1FAIpQLSeps41vJaTOsbcXJNWJJL-AE1ORCTClEDLoBlhp4DdFSdtdNg/formResponse";

const ENTRY = {
  name: "entry.1370526335",
  email: "entry.1384350465",
  projectType: "entry.269951072",
  budget: "entry.1696969046",
  message: "entry.867165463",
} as const;

const PROJECT_TYPES = [
  "Python Automation",
  "AI / LLM Automation",
  "CRM Automation",
  "Zapier / Make.com Build",
  "API Integration",
  "SQL & Dashboards",
  "Other",
];

const BUDGET_RANGES = [
  "< $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

export function ProjectInquiry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function reset() {
    setName("");
    setEmail("");
    setProjectType("");
    setBudget("");
    setMessage("");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !projectType || !budget || !message) {
      toast.error("Fill in every field to send.");
      return;
    }

    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.append(ENTRY.name, name);
      body.append(ENTRY.email, email);
      body.append(ENTRY.projectType, projectType);
      body.append(ENTRY.budget, budget);
      body.append(ENTRY.message, message);

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      toast.success("Thank you for submitting your details! I'll get back to you soon.");
      reset();
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong sending your message. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="project-inquiry" className="relative px-6 py-28">
      <SectionHeading
        eyebrow="Project Inquiry"
        title="Have a Project in Mind?"
        subtitle="Tell me what you want to automate and I'll come back with a clear plan to make it happen."
      />

      <div className="mx-auto mt-14 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong glow-border overflow-hidden rounded-3xl"
        >
          <div className="flex items-center gap-2 border-b border-glass-border px-5 py-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-chart-5/70" />
              <span className="size-2.5 rounded-full bg-emerald/70" />
            </span>
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              redento@inquiry ~ %
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-emerald/15 text-emerald">
                  <CheckCircle2 className="size-7" />
                </span>
                <p className="max-w-md text-lg font-semibold text-foreground">
                  Thank you for submitting your details! I'll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 rounded-xl border border-glass-border bg-background/40 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-emerald"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your Name" value={name} onChange={setName} placeholder="Your name" />
                  <Field
                    label="Your Email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@company.com"
                    type="email"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField
                    label="Project Type"
                    value={projectType}
                    onChange={setProjectType}
                    placeholder="Select a type"
                    options={PROJECT_TYPES}
                  />
                  <SelectField
                    label="Budget Range"
                    value={budget}
                    onChange={setBudget}
                    placeholder="Select a range"
                    options={BUDGET_RANGES}
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-emerald">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Tell me about your project"
                    className="mt-1.5 w-full resize-none rounded-xl border border-glass-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald/50"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-cyan px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--glow-cyan)] disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <Send className="size-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <p className="flex items-center justify-center gap-1.5 text-center font-mono text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5 text-emerald" />
                  Messages will be sent securely
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
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
      <label className="font-mono text-xs text-emerald">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald/50"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div>
      <label className="font-mono text-xs text-emerald">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-glass-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-emerald/50"
      >
        <option value="" disabled className="bg-background text-muted-foreground">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-background text-foreground">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
