import {
  SiPython, SiJavascript, SiHtml5, SiCss, SiCplusplus,
  SiMysql, SiMongodb, SiPostgresql,
  SiNumpy, SiPandas, SiScikitlearn, SiFlask,
  SiGit, SiGithub, SiJupyter, SiPostman,
  SiGooglegemini, SiOpenai, SiAnthropic,
} from "react-icons/si";
import { Code2, Sparkles, Database, Wrench, BrainCircuit } from "lucide-react";

export const PROFILE = {
  name: "Ayush Baghel",
  firstName: "Ayush",
  role: "AI/ML & Full-Stack Developer",
  tagline:
    "B.Tech Information Technology student crafting data-driven products, intelligent ML pipelines and AI-augmented full-stack apps.",
  location: "Gwalior, Madhya Pradesh, India",
  email: "ayushbaghel19@gmail.com",
  phone: "+91 97701 84477",
  phoneRaw: "+919770184477",
  github: "https://github.com/Ayushbaghel1901",
  linkedin: "https://linkedin.com/in/nayushbaghel19",
  photo:
    "https://customer-assets.emergentagent.com/job_e476834d-6d78-47d9-b0e1-86b131a69550/artifacts/wrcwv469_Gemini_Generated_Image_minkvpminkvpmink%20%281%29.png",
};

export const AI_TOOLS = [
  { name: "Gemini", proficiency: "Expert", note: "3 Pro & Flash, Nano Banana" },
  { name: "ChatGPT", proficiency: "Expert", note: "GPT-5.2 / GPT-4o" },
  { name: "Claude", proficiency: "Expert", note: "Sonnet 4.5 / Opus" },
  { name: "Cursor", proficiency: "Daily Driver", note: "AI-first IDE" },
  { name: "Lovable", proficiency: "Power User", note: "AI app builder" },
  { name: "Antigravity", proficiency: "Power User", note: "Agentic dev" },
  { name: "GitHub Copilot", proficiency: "Advanced", note: "Pair programming" },
  { name: "Perplexity", proficiency: "Daily Driver", note: "Research" },
];

export const TECH_GROUPS = [
  {
    id: "languages",
    label: "Languages",
    icon: Code2,
    items: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "C++", Icon: SiCplusplus, color: "#00599C" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "SQL", Icon: SiMysql, color: "#4479A1" },
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    id: "ml",
    label: "ML & Data",
    icon: BrainCircuit,
    items: [
      { name: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
      { name: "NumPy", Icon: SiNumpy, color: "#013243" },
      { name: "Pandas", Icon: SiPandas, color: "#150458" },
      { name: "Matplotlib", Icon: Sparkles, color: "#11557C" },
      { name: "Seaborn", Icon: Sparkles, color: "#4C72B0" },
      { name: "Power BI", Icon: Sparkles, color: "#F2C811" },
    ],
  },
  {
    id: "backend",
    label: "Backend & DB",
    icon: Database,
    items: [
      { name: "Flask", Icon: SiFlask, color: "#ffffff" },
      { name: "REST APIs", Icon: SiPostman, color: "#FF6C37" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    id: "tools",
    label: "Dev Tools",
    icon: Wrench,
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
      { name: "Jupyter", Icon: SiJupyter, color: "#F37626" },
      { name: "VS Code", Icon: Code2, color: "#007ACC" },
    ],
  },
];

export const PROJECTS = [
  {
    id: "amazon_sales",
    title: "Amazon Sales Data Analysis",
    tag: "Data Analytics",
    summary:
      "End-to-end EDA on a large Amazon sales dataset surfacing revenue trends, top categories and regional patterns — paired with an 8+ visualization Power BI dashboard for data-driven decisions.",
    stack: ["Python", "Pandas", "Matplotlib", "Power BI", "Jupyter"],
    image:
      "https://images.unsplash.com/photo-1557264337-e8a93017fe92?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    metrics: [
      { label: "Visualizations", value: "8+" },
      { label: "Records", value: "1M+" },
    ],
    href: "https://github.com/Ayushbaghel1901",
  },
  {
    id: "exam_system",
    title: "Online Secure Examination & Result Management",
    tag: "Full-Stack",
    summary:
      "Full-stack web app supporting 3,000+ students with RBAC across student, faculty and admin. Normalized schema for concurrent sessions, with SQLi & CSRF mitigations and automated grade computation.",
    stack: ["Python", "Flask", "PostgreSQL", "REST"],
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    metrics: [
      { label: "Students", value: "3K+" },
      { label: "Roles", value: "3" },
    ],
    href: "https://github.com/Ayushbaghel1901",
  },
  {
    id: "plagiarism",
    title: "Code Plagiarism Detection System",
    tag: "Algorithms",
    summary:
      "Plagiarism detector using a 5-metric weighted scoring model: text similarity, token analysis, line-level diff, variable naming patterns and control-flow structure.",
    stack: ["Python", "Flask", "REST", "HTML/CSS"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    metrics: [
      { label: "Metrics", value: "5" },
      { label: "Accuracy", value: "High" },
    ],
    href: "https://github.com/Ayushbaghel1901",
  },
  {
    id: "car_price",
    title: "Car Price Prediction (ML)",
    tag: "Machine Learning",
    summary:
      "Supervised ML pipeline on a 300+ record, 9-feature Kaggle automotive dataset. Comparative evaluation of Random Forest vs Decision Tree regressors using RMSE & R².",
    stack: ["scikit-learn", "Pandas", "Random Forest"],
    image:
      "https://images.unsplash.com/photo-1650003678540-e0576a7702ba?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    metrics: [
      { label: "Features", value: "9" },
      { label: "Models", value: "2" },
    ],
    href: "https://github.com/Ayushbaghel1901",
    inProgress: true,
  },
];

export const EDUCATION = [
  {
    institution: "Madhav Institute of Technology and Science (MITS)",
    degree: "Bachelor of Technology — Information Technology",
    period: "Sep 2024 — Apr 2028",
    location: "Gwalior, India",
    coursework: [
      "Data Structures & Algorithms",
      "DBMS",
      "Object-Oriented Programming",
      "Computer Networks",
      "Operating Systems",
    ],
  },
  {
    institution: "St. Francis Assisi School",
    degree: "Senior Secondary (Class XII) — CBSE",
    period: "2022 — 2024",
    location: "Seoni, Madhya Pradesh",
    coursework: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science",
      "English",
    ],
  },
  {
    institution: "St. Francis Assisi School",
    degree: "Secondary (Class X) — CBSE",
    period: "2021 — 2022",
    location: "Seoni, Madhya Pradesh",
    coursework: [
      "Mathematics",
      "Science",
      "Social Science",
      "English",
      "Hindi",
    ],
  },
];

export const AI_PROVIDER_ICONS = {
  Gemini: SiGooglegemini,
  ChatGPT: SiOpenai,
  Claude: SiAnthropic,
};

export const NAV_LINKS = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#stack", label: "Stack", id: "stack" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#contact", label: "Contact", id: "contact" },
];
