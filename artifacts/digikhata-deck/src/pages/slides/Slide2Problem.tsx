export default function Slide2Problem() {
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
          <div>THE PROBLEM</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#0D9488", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          The Problem
        </div>
        <h2 style={{ fontSize: "4vw", fontWeight: 800, margin: "0 0 2.5vh 0", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1E3A5F", textWrap: "balance" }}>
          First salaries disappear fast
        </h2>
        <p style={{ fontSize: "1.4vw", fontWeight: 400, color: "#475569", margin: "0", lineHeight: 1.6, maxWidth: "36vw", textWrap: "pretty" }}>
          College students and first-time earners have no spending guardrails. By the time they realise they've overspent, it's too late.
        </p>
      </div>

      {/* Right: pain-point cards */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2vh" }}>
        <div style={{ background: "#FFFFFF", padding: "2.5vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
          <div style={{ width: "0.4vw", minWidth: "0.4vw", height: "100%", background: "#0D9488", borderRadius: "0.4vw", alignSelf: "stretch", opacity: 0.7 }} />
          <div>
            <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "0.5vh" }}>No spending plan</div>
            <div style={{ fontSize: "1vw", color: "#64748B", lineHeight: 1.5 }}>First salaries disappear without a budget structure in place</div>
          </div>
        </div>
        <div style={{ background: "#FFFFFF", padding: "2.5vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
          <div style={{ width: "0.4vw", minWidth: "0.4vw", background: "#0D9488", borderRadius: "0.4vw", alignSelf: "stretch", opacity: 0.7 }} />
          <div>
            <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "0.5vh" }}>Too complex to start</div>
            <div style={{ fontSize: "1vw", color: "#64748B", lineHeight: 1.5 }}>Generic budgeting apps require hours of manual setup and categorisation</div>
          </div>
        </div>
        <div style={{ background: "#FFFFFF", padding: "2.5vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
          <div style={{ width: "0.4vw", minWidth: "0.4vw", background: "#0D9488", borderRadius: "0.4vw", alignSelf: "stretch", opacity: 0.7 }} />
          <div>
            <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "0.5vh" }}>Warnings come too late</div>
            <div style={{ fontSize: "1vw", color: "#64748B", lineHeight: 1.5 }}>No alerts until the money is already gone — no chance to course-correct</div>
          </div>
        </div>
        <div style={{ background: "#FFFFFF", padding: "2.5vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
          <div style={{ width: "0.4vw", minWidth: "0.4vw", background: "#0D9488", borderRadius: "0.4vw", alignSelf: "stretch", opacity: 0.7 }} />
          <div>
            <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "0.5vh" }}>No safety net</div>
            <div style={{ fontSize: "1vw", color: "#64748B", lineHeight: 1.5 }}>College students have no financial buffer when a category runs dry</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh", fontSize: "0.9vw", color: "#94A3B8", fontWeight: 500 }}>
        <div>DigiKhata</div>
        <div style={{ display: "flex", gap: "1vw" }}>
          <span>Hackathon Demo</span>
          <span>•</span>
          <span>Slide 2</span>
        </div>
      </div>
    </div>
  );
}
