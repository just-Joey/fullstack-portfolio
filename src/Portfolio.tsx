import { useState, useEffect } from "react";

const CONTACT_API = "http://localhost:3001/contact";

const projects = [
  {
    id: "incident",
    label: "incident-logging-service",
    status: "LIVE",
    statusColor: "#22c55e",
    year: "2025",
    tagline: "Production-grade GraphQL microservice for real-time incident management",
    description:
      "A Node.js + GraphQL microservice powering incident tracking, error ingestion, and application event logging across distributed systems. Built with a clean service-layer architecture, structured JSON logging, and AWS Lambda-ready handler stubs — designed to scale from local dev to cloud without touching application code.",
    stack: ["Node.js", "GraphQL", "Apollo Server 4", "Prisma 6", "PostgreSQL", "Supabase", "Pino"],
    highlights: [
      "Four GraphQL domains: Incidents, Errors, AppEvents, Dashboards",
      "Service layer pattern separating business logic from resolvers",
      "Prisma singleton with connection pooling and query logging",
      "DataLoader wired for N+1 prevention",
      "AWS Lambda handler stub — deploy-ready with one config change",
      "Structured Pino logging — CloudWatch-native JSON output", 
      "Claude API integration as AI-generated incident summaries with root cause analysis and risk scoring",
    ],
    github: "https://github.com/joeymaes",
    live: "https://incident-logging.onrender.com/graphql",
    color: "#6366f1",
    icon: "⬡",
  },
  {
    id: "elevated",
    label: "elevated-software-solutions",
    status: "LIVE",
    statusColor: "#f59e0b",
    year: "2025",
    tagline: "AI-powered web presence and lead capture for local service businesses",
    description:
      "A full-stack marketing and automation platform built for Denver-area trades businesses. Features a Claude API-powered chatbot widget with intelligent lead capture, contact form with Supabase persistence, and a custom-designed landing page built around the Rocky Mountain aesthetic. Bridges the gap between small business needs and enterprise-level AI tooling.",
    stack: ["React", "Vite", "Node.js", "Express", "Prisma", "Supabase", "Claude API", "CORS"],
    highlights: [
      "Claude API chatbot widget with real-time lead capture",
      "Contact form with live Supabase/PostgreSQL persistence",
      "Custom violet/amber palette — Rocky Mountain brand identity",
      "CORS and port conflict resolution for macOS dev environments",
      "AI framed as 'virtual assistant' for client trust and adoption",
    ],
    github: "https://github.com/joeymaes",
    live: "https://elevated-software.vercel.app",
    color: "#f59e0b",
    icon: "◈",
  },
  {
    id: "feedback",
    label: "team-feedback-app",
    status: "LIVE",
    statusColor: "#22c55e",
    year: "2025",
    tagline: "Fullstack feedback and performance review tool for engineering teams",
    description:
      "A complete team performance and feedback platform built across the full stack. Supports structured peer reviews, manager feedback cycles, and historical tracking — giving engineering teams visibility into growth over time. Built with a clean REST API, relational data model, and a responsive React frontend.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "REST API"],
    highlights: [
      "Structured peer review and manager feedback cycles",
      "Historical tracking with relational PostgreSQL data model",
      "Clean REST API with full CRUD across feedback domains",
      "Responsive React frontend with role-based views",
    ],
    github: "https://github.com/joeymaes",
    live: "https://your-team-feedback-url.vercel.app",
    color: "#14b8a6",
    icon: "◇",
  },
];

const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { category: "Frontend", items: ["React", "Vite", "HTML/CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "GraphQL", "Apollo", "REST"] },
  { category: "Data", items: ["PostgreSQL", "Prisma", "Supabase", "pgvector"] },
  { category: "AI / LLM", items: ["Claude API", "RAG pipelines", "Prompt engineering", "Claude Code"] },
  { category: "Cloud / DevOps", items: ["AWS Lambda", "API Gateway", "Secrets Manager", "Docker"] },
];

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

function TerminalLine({ text, delay = 0, dim = false }: { text: string; delay?: number; dim?: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: visible ? (dim ? 0.4 : 1) : 0,
      transition: "opacity 0.3s ease",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      fontSize: "13px",
      lineHeight: "1.6",
      color: dim ? "#4a5568" : "#e2e8f0",
      whiteSpace: "pre",
    }}>{text}</div>
  );
}

function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span style={{
      fontSize: "10px",
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: "0.08em",
      color,
      border: `1px solid ${color}40`,
      padding: "2px 8px",
      borderRadius: "3px",
      backgroundColor: `${color}10`,
    }}>{status}</span>
  );
}

function ProjectCard({ project, isActive, onClick }: { project: typeof projects[0]; isActive: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? "#0f1923" : "#080e14",
        border: `1px solid ${isActive ? project.color + "60" : "#1e293b"}`,
        borderRadius: "8px",
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginBottom: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: project.color, fontSize: "16px", lineHeight: 1 }}>{project.icon}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
            color: isActive ? "#f1f5f9" : "#94a3b8",
            letterSpacing: "-0.01em",
          }}>{project.label}</span>
        </div>
        <StatusBadge status={project.status} color={project.statusColor} />
      </div>
      <p style={{
        fontSize: "12px",
        color: "#64748b",
        margin: 0,
        fontFamily: "'JetBrains Mono', monospace",
        lineHeight: "1.5",
      }}>{project.tagline}</p>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const inputStyle = {
    width: "100%",
    background: "#030811",
    border: "1px solid #1e293b",
    borderRadius: "6px",
    padding: "10px 14px",
    color: "#e2e8f0",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s ease",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setErrorMsg("All fields are required.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Could not reach the server. Try again later.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{
        background: "#080e14",
        border: "1px solid #22c55e40",
        borderRadius: "8px",
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "24px", marginBottom: "12px" }}>✓</div>
        <div style={{ color: "#22c55e", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", marginBottom: "8px" }}>
          message sent
        </div>
        <div style={{ color: "#4a5568", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
          I'll get back to you soon.
        </div>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "20px",
            background: "transparent",
            border: "1px solid #1e293b",
            borderRadius: "4px",
            color: "#4a5568",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            padding: "6px 14px",
            cursor: "pointer",
          }}
        >send another</button>
      </div>
    );
  }

  return (
    <div style={{
      background: "#080e14",
      border: "1px solid #1e293b",
      borderRadius: "8px",
      padding: "28px",
    }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>NAME</div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="your name"
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>EMAIL</div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>SUBJECT</div>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="what's this about?"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>MESSAGE</div>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="tell me about the role or project..."
          rows={5}
          style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
        />
      </div>

      {status === "error" && (
        <div style={{
          color: "#ef4444",
          fontSize: "12px",
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: "12px",
          padding: "8px 12px",
          background: "#ef444410",
          border: "1px solid #ef444430",
          borderRadius: "4px",
        }}>⚠ {errorMsg}</div>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        style={{
          background: status === "sending" ? "#6366f120" : "#6366f1",
          border: "none",
          borderRadius: "6px",
          color: status === "sending" ? "#6366f1" : "#fff",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "13px",
          padding: "10px 24px",
          cursor: status === "sending" ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          letterSpacing: "0.02em",
        }}
      >
        {status === "sending" ? "sending..." : "send message →"}
      </button>
    </div>
  );
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [tab, setTab] = useState<"overview" | "stack" | "highlights">("overview");

  return (
    <div style={{
      background: "#030811",
      minHeight: "100vh",
      color: "#e2e8f0",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      padding: "0",
    }}>
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
            <span style={{ fontSize: "11px", color: "#4a5568", letterSpacing: "0.1em" }}>ONLINE — joeymaes.dev</span>
          </div>

          <h1 style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            margin: "0 0 8px",
            letterSpacing: "-0.03em",
            color: "#f8fafc",
            lineHeight: 1.1,
            fontFamily: "'JetBrains Mono', monospace",
          }}>Joey Maes</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            {["Full Stack Engineer", "AI Platform Builder", "Denver, CO"].map((tag, i) => (
              <span key={i} style={{
                fontSize: "12px",
                color: i === 0 ? "#6366f1" : i === 1 ? "#14b8a6" : "#4a5568",
                fontFamily: "'JetBrains Mono', monospace",
              }}>{i > 0 ? "/ " : ""}{tag}</span>
            ))}
          </div>

          <p style={{
            fontSize: "15px",
            color: "#94a3b8",
            maxWidth: "600px",
            lineHeight: "1.7",
            margin: "0 0 28px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 400,
          }}>
            I build the infrastructure that makes AI tooling actually work in production — GraphQL microservices, RAG pipelines, LLM-powered applications, and the developer harnesses that let teams ship faster. 8+ years of full-stack engineering, currently focused on the intersection of AI and developer experience.
          </p>

          <div style={{
            background: "#080e14",
            border: "1px solid #1e293b",
            borderRadius: "8px",
            padding: "20px 24px",
            maxWidth: "580px",
          }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
              {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </div>
            <TerminalLine text="$ whoami" delay={200} />
            <TerminalLine text="joey_maes — full-stack engineer + ai platform builder" delay={600} />
            <TerminalLine text="" delay={800} />
            <TerminalLine text="$ cat skills.txt | grep ai" delay={1000} />
            <TerminalLine text="→ Claude API · RAG pipelines · prompt engineering · Claude Code" delay={1400} />
            <TerminalLine text="" delay={1600} />
            <TerminalLine text="$ git log --oneline -3" delay={1800} />
            <TerminalLine text="a3f91c2 feat: graphql api fully operational with live supabase data" delay={2200} />
            <TerminalLine text="b8d44e1 feat: prisma schema and initial migration" delay={2400} />
            <TerminalLine text="cc19f3a feat: apollo server bootstrap + context builder" delay={2600} />
            <TerminalLine text="" delay={2800} />
            <TerminalLine text="$ █" delay={3000} />
          </div>
        </div>

        {/* Projects */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ color: "#6366f1", fontSize: "12px" }}>▸</span>
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#4a5568" }}>PROJECTS</span>
            <div style={{ flex: 1, height: "1px", background: "#1e293b" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  isActive={activeProject.id === p.id}
                  onClick={() => { setActiveProject(p); setTab("overview"); }}
                />
              ))}
            </div>

            <div style={{
              background: "#080e14",
              border: `1px solid ${activeProject.color}40`,
              borderRadius: "8px",
              padding: "24px",
              minHeight: "300px",
            }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid #1e293b", paddingBottom: "12px" }}>
                {(["overview", "stack", "highlights"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      background: tab === t ? activeProject.color + "20" : "transparent",
                      border: `1px solid ${tab === t ? activeProject.color + "60" : "transparent"}`,
                      color: tab === t ? activeProject.color : "#4a5568",
                      borderRadius: "4px",
                      padding: "4px 12px",
                      fontSize: "11px",
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                    }}
                  >{t}</button>
                ))}
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: "11px", color: "#2d3748", fontFamily: "monospace" }}>{activeProject.year}</span>
              </div>

              {tab === "overview" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ color: activeProject.color, fontSize: "20px" }}>{activeProject.icon}</span>
                    <span style={{ fontSize: "13px", color: "#f1f5f9", fontFamily: "'JetBrains Mono', monospace" }}>
                      {activeProject.label}
                    </span>
                  </div>
                  <p style={{
                    fontSize: "13px",
                    color: "#94a3b8",
                    lineHeight: "1.75",
                    margin: "0 0 20px",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 400,
                  }}>{activeProject.description}</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <a href={activeProject.github} style={{
                      fontSize: "11px",
                      color: "#6366f1",
                      border: "1px solid #6366f130",
                      borderRadius: "4px",
                      padding: "6px 14px",
                      textDecoration: "none",
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "#6366f110",
                    }}>⌥ github</a>
                    {activeProject.live && (
                      <a href={activeProject.live} style={{
                        fontSize: "11px",
                        color: "#22c55e",
                        border: "1px solid #22c55e30",
                        borderRadius: "4px",
                        padding: "6px 14px",
                        textDecoration: "none",
                        fontFamily: "'JetBrains Mono', monospace",
                        background: "#22c55e10",
                      }}>↗ live demo</a>
                    )}
                  </div>
                </div>
              )}

              {tab === "stack" && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {activeProject.stack.map((s) => (
                    <span key={s} style={{
                      fontSize: "12px",
                      fontFamily: "'JetBrains Mono', monospace",
                      color: activeProject.color,
                      background: activeProject.color + "15",
                      border: `1px solid ${activeProject.color}30`,
                      borderRadius: "4px",
                      padding: "4px 10px",
                    }}>{s}</span>
                  ))}
                </div>
              )}

              {tab === "highlights" && (
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {activeProject.highlights.map((h, i) => (
                    <li key={i} style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                      fontSize: "12px",
                      color: "#94a3b8",
                      fontFamily: "system-ui, sans-serif",
                      lineHeight: "1.6",
                    }}>
                      <span style={{ color: activeProject.color, flexShrink: 0, marginTop: "2px" }}>›</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ color: "#14b8a6", fontSize: "12px" }}>▸</span>
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#4a5568" }}>STACK</span>
            <div style={{ flex: 1, height: "1px", background: "#1e293b" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
            {skills.map((group) => (
              <div key={group.category} style={{
                background: "#080e14",
                border: "1px solid #1e293b",
                borderRadius: "8px",
                padding: "16px",
              }}>
                <div style={{ fontSize: "10px", color: "#4a5568", letterSpacing: "0.1em", marginBottom: "10px" }}>
                  {group.category.toUpperCase()}
                </div>
                {group.items.map((item) => (
                  <div key={item} style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    fontFamily: "'JetBrains Mono', monospace",
                    lineHeight: "1.8",
                  }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ color: "#f59e0b", fontSize: "12px" }}>▸</span>
            <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#4a5568" }}>CONTACT</span>
            <div style={{ flex: 1, height: "1px", background: "#1e293b" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>
            <div>
              <div style={{ fontSize: "14px", color: "#f1f5f9", marginBottom: "8px" }}>
                Open to the right opportunity
              </div>
              <p style={{
                fontSize: "13px",
                color: "#64748b",
                fontFamily: "system-ui, sans-serif",
                lineHeight: "1.7",
                margin: "0 0 20px",
              }}>
                AI platform engineering · full stack · Denver, CO or remote. If you're building something interesting, let's talk.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <a href="https://github.com/joeymaes" style={{
                  fontSize: "12px",
                  color: "#6366f1",
                  border: "1px solid #6366f130",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  background: "#6366f110",
                }}>github</a>
                <a href="https://linkedin.com/in/joeymaes" style={{
                  fontSize: "12px",
                  color: "#14b8a6",
                  border: "1px solid #14b8a630",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  background: "#14b8a610",
                }}>linkedin</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: "24px", borderTop: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "#2d3748", fontFamily: "'JetBrains Mono', monospace" }}>
            joey maes · joeymaes.dev · {new Date().getFullYear()}
          </span>
          <span style={{ fontSize: "11px", color: "#2d3748", fontFamily: "'JetBrains Mono', monospace" }}>
            built with react + typescript
          </span>
        </div>

      </div>
    </div>
  );
}
