export default function Slide6TechStack() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAFBFC",
        fontFamily: "'Inter', sans-serif",
        padding: "4vh 4vw",
        boxSizing: "border-box",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto 1fr auto",
        gap: "3vh 0",
        color: "#1E3A5F",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "2vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{ width: "2vw", height: "2vw", backgroundColor: "#0D9488", borderRadius: "0.4vw" }} />
          <div style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "0.02em" }}>DigiKhata</div>
        </div>
        <div style={{ display: "flex", gap: "2vw", fontSize: "1vw", fontWeight: 500, color: "#64748B" }}>
          <div>TECH STACK</div>
          <div>2026</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#0D9488", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Tech Stack
        </div>
        <h2 style={{ fontSize: "3.5vw", fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1E3A5F" }}>
          Production-grade from day one
        </h2>
      </div>

      {/* 4 stack cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "2vw", alignItems: "stretch" }}>
        <div style={{ background: "#FFFFFF", padding: "3.5vh 2vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ fontSize: "1vw", fontWeight: 700, color: "#0D9488", textTransform: "uppercase", letterSpacing: "0.06em", paddingBottom: "1.5vh", borderBottom: "2px solid #0D9488" }}>
            Frontend
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>React 18</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Vite build</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Tailwind CSS</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>shadcn/ui</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>TanStack Query</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>wouter routing</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "3.5vh 2vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ fontSize: "1vw", fontWeight: 700, color: "#0D9488", textTransform: "uppercase", letterSpacing: "0.06em", paddingBottom: "1.5vh", borderBottom: "2px solid #0D9488" }}>
            Backend
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>Express 5</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Node.js 24</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>TypeScript 5.9</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Zod validation</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>pnpm workspaces</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>esbuild bundle</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "3.5vh 2vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ fontSize: "1vw", fontWeight: 700, color: "#0D9488", textTransform: "uppercase", letterSpacing: "0.06em", paddingBottom: "1.5vh", borderBottom: "2px solid #0D9488" }}>
            Data
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>PostgreSQL</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Drizzle ORM</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>drizzle-zod</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>OpenAPI spec</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Orval codegen</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>React Query hooks</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "3.5vh 2vw", borderRadius: "1vw", border: "1px solid #0D9488", boxShadow: "0 0.5vw 1.5vw rgba(13, 148, 136, 0.1)", display: "flex", flexDirection: "column", gap: "2vh", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "2vw", right: "2vw", height: "0.4vh", background: "#0D9488", borderRadius: "0 0 0.4vw 0.4vw" }} />
          <div style={{ fontSize: "1vw", fontWeight: 700, color: "#0D9488", textTransform: "uppercase", letterSpacing: "0.06em", paddingBottom: "1.5vh", borderBottom: "2px solid #0D9488" }}>
            AI / Price Intel
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>Anakin.io Wire</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Universal Scraper</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>5-min TTL cache</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Demo fallback</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Flipkart + Amazon</div>
            <div style={{ fontSize: "1vw", color: "#64748B" }}>Always functional</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh", fontSize: "0.9vw", color: "#94A3B8", fontWeight: 500 }}>
        <div>DigiKhata</div>
        <div style={{ display: "flex", gap: "1vw" }}>
          <span>Hackathon Demo</span>
          <span>•</span>
          <span>Slide 6</span>
        </div>
      </div>
    </div>
  );
}
