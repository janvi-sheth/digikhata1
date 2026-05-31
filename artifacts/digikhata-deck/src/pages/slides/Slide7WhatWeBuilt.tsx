export default function Slide7WhatWeBuilt() {
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
          <div>WHAT WE BUILT</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#0D9488", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          What We Built
        </div>
        <h2 style={{ fontSize: "4vw", fontWeight: 800, margin: "0 0 2.5vh 0", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1E3A5F", textWrap: "balance" }}>
          4 pages, fully functional
        </h2>
        <p style={{ fontSize: "1.3vw", fontWeight: 400, color: "#475569", margin: "0", lineHeight: 1.6, textWrap: "pretty" }}>
          End-to-end working app — React frontend, Express API, PostgreSQL database, live AI nudges. Zero mocked data in production mode.
        </p>

        <div style={{ marginTop: "4vh", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5vw" }}>
          <div style={{ background: "#FFFFFF", padding: "2vh 2vw", borderRadius: "0.8vw", border: "1px solid #E2E8F0", boxShadow: "0 0.4vw 1vw rgba(30, 58, 95, 0.05)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 800, color: "#0D9488" }}>4</div>
            <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500, marginTop: "0.5vh" }}>App pages</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "2vh 2vw", borderRadius: "0.8vw", border: "1px solid #E2E8F0", boxShadow: "0 0.4vw 1vw rgba(30, 58, 95, 0.05)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 800, color: "#0D9488" }}>3</div>
            <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500, marginTop: "0.5vh" }}>API routes</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "2vh 2vw", borderRadius: "0.8vw", border: "1px solid #E2E8F0", boxShadow: "0 0.4vw 1vw rgba(30, 58, 95, 0.05)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 800, color: "#0D9488" }}>8</div>
            <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500, marginTop: "0.5vh" }}>Budget buckets</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "2vh 2vw", borderRadius: "0.8vw", border: "1px solid #E2E8F0", boxShadow: "0 0.4vw 1vw rgba(30, 58, 95, 0.05)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5vw", fontWeight: 800, color: "#0D9488" }}>0</div>
            <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500, marginTop: "0.5vh" }}>Mocked data</div>
          </div>
        </div>
      </div>

      {/* Right: feature list */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ background: "#FFFFFF", padding: "4vh 3vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "0" }}>
          <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F", marginBottom: "2.5vh" }}>App pages</div>

          <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start", paddingBottom: "2.5vh", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "1.4vw", fontWeight: 800, color: "#0D9488", width: "2.5vw", flexShrink: 0, paddingTop: "0.2vh" }}>01</div>
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "0.5vh" }}>Dashboard</div>
              <div style={{ fontSize: "1vw", color: "#64748B", lineHeight: 1.4 }}>Month progress + 8 category bars with live pacing indicators</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start", paddingTop: "2.5vh", paddingBottom: "2.5vh", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "1.4vw", fontWeight: 800, color: "#0D9488", width: "2.5vw", flexShrink: 0, paddingTop: "0.2vh" }}>02</div>
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "0.5vh" }}>Check Purchase</div>
              <div style={{ fontSize: "1vw", color: "#64748B", lineHeight: 1.4 }}>Enter item + price — get AI nudge + cheaper alternatives instantly</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start", paddingTop: "2.5vh", paddingBottom: "2.5vh", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: "1.4vw", fontWeight: 800, color: "#0D9488", width: "2.5vw", flexShrink: 0, paddingTop: "0.2vh" }}>03</div>
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "0.5vh" }}>Spending History</div>
              <div style={{ fontSize: "1vw", color: "#64748B", lineHeight: 1.4 }}>Full chronological log of all recorded transactions</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start", paddingTop: "2.5vh" }}>
            <div style={{ fontSize: "1.4vw", fontWeight: 800, color: "#0D9488", width: "2.5vw", flexShrink: 0, paddingTop: "0.2vh" }}>04</div>
            <div>
              <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "0.5vh" }}>Profile</div>
              <div style={{ fontSize: "1vw", color: "#64748B", lineHeight: 1.4 }}>Set monthly salary — all 8 buckets auto-fill instantly</div>
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
          <span>Slide 7</span>
        </div>
      </div>
    </div>
  );
}
