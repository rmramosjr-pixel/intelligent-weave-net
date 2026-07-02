import {
  Braces,
  Database,
  Workflow,
  Zap,
  Bot,
  Sheet,
  HardDrive,
  Github,
  Container,
  Cpu,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Workflow", href: "#workflow" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export type Skill = {
  name: string;
  detail: string;
  accent: "blue" | "purple" | "cyan" | "emerald";
  icon: LucideIcon;
};

export const SKILLS: Skill[] = [
  { name: "Python", detail: "Automation scripts, ETL, data pipelines", accent: "blue", icon: Braces },
  { name: "SQL", detail: "Query optimization & reporting", accent: "cyan", icon: Database },
  { name: "REST API", detail: "Integration & orchestration", accent: "purple", icon: Workflow },
  { name: "Zapier", detail: "No-code multi-app automation", accent: "emerald", icon: Zap },
  { name: "Make.com", detail: "Complex visual scenarios", accent: "purple", icon: Workflow },
  { name: "OpenAI", detail: "LLM agents & prompt engineering", accent: "cyan", icon: Bot },
  { name: "Google Sheets", detail: "Live dashboards & sync", accent: "emerald", icon: Sheet },
  { name: "Google Drive", detail: "Document automation", accent: "blue", icon: HardDrive },
  { name: "GitHub", detail: "Version control & CI", accent: "purple", icon: Github },
  { name: "Docker", detail: "Containerized deployments", accent: "cyan", icon: Container },
  { name: "Process Automation", detail: "End-to-end ops workflows", accent: "blue", icon: Cpu },
  { name: "Prompt Engineering", detail: "Reliable AI outputs", accent: "emerald", icon: Sparkles },
];

export type WorkflowNode = {
  id: string;
  label: string;
  problem: string;
  solution: string;
  tech: string;
  impact: string;
};

export const WORKFLOW_NODES: WorkflowNode[] = [
  {
    id: "lead",
    label: "Lead Enters",
    problem: "Leads scattered across forms & inboxes",
    solution: "Unified webhook capture point",
    tech: "Webhooks · Zapier",
    impact: "Zero missed leads",
  },
  {
    id: "ai",
    label: "OpenAI Analyzes",
    problem: "Manual qualification is slow",
    solution: "LLM scores & enriches each lead",
    tech: "OpenAI · Python",
    impact: "Instant lead scoring",
  },
  {
    id: "crm",
    label: "CRM Updated",
    problem: "Data entry consumes hours",
    solution: "Auto-create & update records",
    tech: "REST API · CRM",
    impact: "100% data accuracy",
  },
  {
    id: "slack",
    label: "Slack Alert",
    problem: "Sales reacts too late",
    solution: "Real-time routed notifications",
    tech: "Slack API",
    impact: "Faster response time",
  },
  {
    id: "email",
    label: "Email Sent",
    problem: "Follow-ups get forgotten",
    solution: "Personalized auto sequences",
    tech: "Make.com",
    impact: "3x follow-up rate",
  },
  {
    id: "sheet",
    label: "Sheet Logged",
    problem: "No single source of truth",
    solution: "Append to master ledger",
    tech: "Google Sheets",
    impact: "Live audit trail",
  },
  {
    id: "dash",
    label: "Dashboard Refresh",
    problem: "Reporting is a weekly chore",
    solution: "Auto-refreshing KPIs",
    tech: "SQL · Grafana",
    impact: "Real-time visibility",
  },
];

export type Project = {
  title: string;
  category: string;
  summary: string;
  steps: string[];
  impact: string;
  stack: string[];
  accent: "blue" | "purple" | "cyan" | "emerald";
};

export const PROJECTS: Project[] = [
  {
    title: "Zapier CRM Automation",
    category: "Sales Operations",
    summary:
      "An end-to-end lead engine that captures, enriches, scores and routes every inbound lead without human touch.",
    steps: [
      "Lead capture",
      "Enrichment",
      "Lead scoring",
      "Task creation",
      "Email follow-up",
      "CRM updates",
    ],
    impact: "Cut lead handling time by ~85% and eliminated manual data entry.",
    stack: ["Zapier", "OpenAI", "CRM API", "Gmail"],
    accent: "blue",
  },
  {
    title: "Make.com Asana + Xero Automation",
    category: "Finance Ops",
    summary:
      "When a task completes, invoices flow themselves — downloaded, renamed, filed and reflected back into the project.",
    steps: [
      "Task completed",
      "Invoice downloaded",
      "PDF renamed",
      "Uploaded to Drive",
      "Asana updated",
    ],
    impact: "Removed a repetitive daily finance ritual entirely.",
    stack: ["Make.com", "Asana", "Xero", "Google Drive"],
    accent: "purple",
  },
  {
    title: "Python Reporting Automation",
    category: "Business Intelligence",
    summary:
      "A scheduled Python engine that queries the database, builds formatted reports and delivers them straight to inboxes.",
    steps: ["SQL query", "Python transform", "Excel report", "Email delivery", "Dashboard sync"],
    impact: "Saved 1000+ hours of manual reporting per year.",
    stack: ["Python", "SQL", "openpyxl", "SMTP"],
    accent: "cyan",
  },
  {
    title: "Facebook AI Automation",
    category: "Marketing",
    summary:
      "Content that publishes itself — AI writes the copy, generates the imagery and schedules posts across the calendar.",
    steps: ["Facebook API", "OpenAI copy", "Image generation", "Scheduling", "Auto posting"],
    impact: "Turned days of content work into a hands-off pipeline.",
    stack: ["OpenAI", "Facebook API", "Make.com"],
    accent: "emerald",
  },
  {
    title: "Google Workspace Automation",
    category: "Document Ops",
    summary:
      "Documents assemble themselves — data in, formatted PDFs out, filed and shared automatically across Drive.",
    steps: ["Google Drive", "Google Sheets", "PDF generation", "Document automation"],
    impact: "Standardized document output and removed copy-paste errors.",
    stack: ["Google Sheets", "Google Drive", "Apps Script"],
    accent: "blue",
  },
];

export type ExperienceItem = {
  role: string;
  company?: string;
  period: string;
  points: string[];
  current?: boolean;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Application Support Specialist",
    company: "Orchid Cybertech Services Inc.",
    period: "2021 — Present",
    current: true,
    points: [
      "Investigate & resolve production issues",
      "Build Python automation for repetitive tasks",
      "SQL troubleshooting & query optimization",
      "Workflow optimization across teams",
      "Automate recurring reporting",
      "Drive business process improvement",
      "Author technical documentation",
    ],
  },
  {
    role: "Technical Escalation Developer",
    period: "Previous role",
    points: ["Resolved complex escalated technical cases", "Bridged support and engineering"],
  },
  {
    role: "Technical Escalation Engineer",
    period: "Previous role",
    points: ["Deep-dive diagnostics on escalated issues", "Root-cause analysis & fixes"],
  },
  {
    role: "Helpdesk Representative",
    period: "Previous role",
    points: ["Frontline technical support", "Ticket triage & resolution"],
  },
  {
    role: "ADSL Technician",
    period: "Previous role",
    points: ["Network diagnostics & provisioning", "On-site connectivity troubleshooting"],
  },
];

export const STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Automation Projects" },
  { value: 1000, suffix: "+", label: "Hours Saved" },
  { value: 4, suffix: "M+", label: "Database Records Processed" },
];

export type Service = { title: string; desc: string; icon: LucideIcon };

export const SERVICES: Service[] = [
  { title: "Python Automation", desc: "Custom scripts that run the boring work for you.", icon: Braces },
  { title: "AI Automation", desc: "LLM agents embedded into real business workflows.", icon: Bot },
  { title: "CRM Automation", desc: "Leads captured, enriched and routed automatically.", icon: Workflow },
  { title: "Business Automation", desc: "End-to-end operational process automation.", icon: Cpu },
  { title: "Zapier & Make.com", desc: "Robust no-code and low-code scenario builds.", icon: Zap },
  { title: "OpenAI Integration", desc: "Prompt-engineered AI wired into your stack.", icon: Sparkles },
  { title: "API Development", desc: "Reliable REST integrations between systems.", icon: Terminal },
  { title: "SQL & Dashboards", desc: "Automated reporting and live dashboards.", icon: Database },
];

export const PROCESS = [
  { step: "Discovery", desc: "Understand the workflow & pain points" },
  { step: "Analysis", desc: "Map data flow and bottlenecks" },
  { step: "Design", desc: "Architect the automation blueprint" },
  { step: "Automation", desc: "Build resilient pipelines" },
  { step: "Testing", desc: "Validate edge cases & reliability" },
  { step: "Deployment", desc: "Ship to production safely" },
  { step: "Optimization", desc: "Monitor, measure & improve" },
];

export const TECH_STACK = [
  "Python",
  "TypeScript",
  "React",
  "Vite",
  "TailwindCSS",
  "Node.js",
  "OpenAI",
  "Make.com",
  "Zapier",
  "SQL",
  "GitHub",
  "Docker",
  "Google Cloud",
];
