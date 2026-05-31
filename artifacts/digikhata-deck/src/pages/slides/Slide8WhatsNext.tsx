export default function Slide8WhatsNext() {
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
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto 1fr auto",
        gap: "4vh 4vw",
        color: "#1E3A5F",
      }}
    >
      {/* Header */}
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "2vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{ width: "2vw", height: "2vw", backgroundColor: "#0D9488", borderRadius: "0.4vw" }} />
          <div style={{ fontSize: "1.2vw", fontWeight: 700, letterSpacing: "0.02em" }}>DigiKhata</div>
        </div>
        <div style={{ display: "flex", gap: "2vw", fontSize: "1vw", fontWeight: 500, color: "#64748B" }}>
          <div>WHAT'S NEXT</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#0D9488", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Roadmap
        </div>
        <h2 style={{ fontSize: "4vw", fontWeight: 800, margin: "0 0 2.5vh 0", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1E3A5F", textWrap: "balance" }}>
          The foundation is laid
        </h2>
        <p style={{ fontSize: "1.4vw", fontWeight: 400, color: "#475569", margin: "0 0 5vh 0", lineHeight: 1.6, textWrap: "pretty" }}>
          The core budget engine, AI nudges, and data layer are production-ready. These are the natural next steps.
        </p>

        <div style={{ background: "#FFFFFF", padding: "3vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)" }}>
          <div style={{ fontSize: "1vw", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5vh" }}>Built this weekend</div>
          <div style={{ display: "flex", gap: "2vw" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3vw", fontWeight: 800, color: "#0D9488" }}>48</div>
              <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>hours</div>
            </div>
            <div style={{ width: "1px", background: "#E2E8F0" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3vw", fontWeight: 800, color: "#0D9488" }}>100%</div>
              <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>TypeScript</div>
            </div>
            <div style={{ width: "1px", background: "#E2E8F0" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3vw", fontWeight: 800, color: "#0D9488" }}>0</div>
              <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>TS errors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: roadmap items */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ background: "#FFFFFF", padding: "3.5vh 3vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
          <div style={{ position: "absolute", left: "3.8vw", top: "6vh", bottom: "6vh", width: "2px", background: "#E2E8F0" }} />

          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start", paddingBottom: "3vh" }}>
            <div style={{ width: "1.4vw", height: "1.4vw", background: "#0D9488", borderRadius: "50%", border: "3px solid #FFFFFF", boxShadow: "0 0 0 2px #0D9488", flexShrink: 0, marginTop: "0.3vh", zIndex: 1 }} />
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F" }}>User authentication</div>
              <div style={{ fontSize: "1vw", color: "#64748B", marginTop: "0.4vh" }}>Multi-user support via Replit Auth or Clerk</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start", paddingBottom: "3vh" }}>
            <div style={{ width: "1.4vw", height: "1.4vw", background: "rgba(13,148,136,0.5)", borderRadius: "50%", border: "3px solid #FFFFFF", boxShadow: "0 0 0 2px rgba(13,148,136,0.5)", flexShrink: 0, marginTop: "0.3vh", zIndex: 1 }} />
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F" }}>Recurring expense detection</div>
              <div style={{ fontSize: "1vw", color: "#64748B", marginTop: "0.4vh" }}>Auto-flag subscriptions and predictable monthly costs</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start", paddingBottom: "3vh" }}>
            <div style={{ width: "1.4vw", height: "1.4vw", background: "rgba(13,148,136,0.3)", borderRadius: "50%", border: "3px solid #FFFFFF", boxShadow: "0 0 0 2px rgba(13,148,136,0.3)", flexShrink: 0, marginTop: "0.3vh", zIndex: 1 }} />
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F" }}>Monthly reset + summary</div>
              <div style={{ fontSize: "1vw", color: "#64748B", marginTop: "0.4vh" }}>Archive the month, show savings achieved, fresh start on the 1st</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start", paddingBottom: "3vh" }}>
            <div style={{ width: "1.4vw", height: "1.4vw", background: "rgba(13,148,136,0.2)", borderRadius: "50%", border: "3px solid #FFFFFF", boxShadow: "0 0 0 2px rgba(13,148,136,0.2)", flexShrink: 0, marginTop: "0.3vh", zIndex: 1 }} />
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F" }}>Mobile app</div>
              <div style={{ fontSize: "1vw", color: "#64748B", marginTop: "0.4vh" }}>React Native / Expo — same API, native experience</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start" }}>
            <div style={{ width: "1.4vw", height: "1.4vw", background: "rgba(13,148,136,0.15)", borderRadius: "50%", border: "3px solid #FFFFFF", boxShadow: "0 0 0 2px rgba(13,148,136,0.15)", flexShrink: 0, marginTop: "0.3vh", zIndex: 1 }} />
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F" }}>Bank statement import</div>
              <div style={{ fontSize: "1vw", color: "#64748B", marginTop: "0.4vh" }}>PDF parsing to auto-populate spending history</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh", fontSize: "0.9vw", color: "#94A3B8", fontWeight: 500 }}>
        <div>DigiKhata</div>
        <div style={{ display: "flex", gap: "1vw" }}>
          <span>Hackathon Demo</span>
          <span>•</span>
          <span>Slide 8</span>
        </div>
      </div>
    </div>
  );
}
