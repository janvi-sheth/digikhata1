export default function Slide3HowItWorks() {
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
          <div>HOW IT WORKS</div>
          <div>2026</div>
        </div>
      </div>

      {/* Title row */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#0D9488", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          How It Works
        </div>
        <h2 style={{ fontSize: "3.5vw", fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1E3A5F" }}>
          Three steps from salary to smart spending
        </h2>
      </div>

      {/* Three step cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2.5vw", alignItems: "stretch" }}>
        <div style={{ background: "#FFFFFF", padding: "4vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ fontSize: "2.5vw", fontWeight: 800, color: "#0D9488", backgroundColor: "rgba(13, 148, 136, 0.08)", width: "5vw", height: "5vw", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "1vw" }}>1</div>
          <div>
            <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "1vh" }}>Enter your salary</div>
            <div style={{ fontSize: "1.1vw", color: "#64748B", lineHeight: 1.6, textWrap: "pretty" }}>
              Set your monthly income once on the Profile page. DigiKhata instantly calculates your 8 budget buckets — no manual entry needed.
            </div>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
            <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>Salary auto-splits into</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#1E3A5F" }}>8 buckets</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "4vh 2.5vw", borderRadius: "1vw", border: "1px solid #0D9488", boxShadow: "0 0.5vw 1.5vw rgba(13, 148, 136, 0.12)", display: "flex", flexDirection: "column", gap: "2vh", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "2.5vw", right: "2.5vw", height: "0.4vh", background: "#0D9488", borderRadius: "0 0 0.4vw 0.4vw" }} />
          <div style={{ fontSize: "2.5vw", fontWeight: 800, color: "#0D9488", backgroundColor: "rgba(13, 148, 136, 0.08)", width: "5vw", height: "5vw", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "1vw" }}>2</div>
          <div>
            <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "1vh" }}>Check a purchase</div>
            <div style={{ fontSize: "1.1vw", color: "#64748B", lineHeight: 1.6, textWrap: "pretty" }}>
              Before buying, enter the item, price, and category. The AI nudge tells you if you're on pace — and finds cheaper alternatives via Anakin.io Wire.
            </div>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
            <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>Real-time price intel from</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#0D9488" }}>Anakin.io Wire</div>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", padding: "4vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ fontSize: "2.5vw", fontWeight: 800, color: "#0D9488", backgroundColor: "rgba(13, 148, 136, 0.08)", width: "5vw", height: "5vw", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "1vw" }}>3</div>
          <div>
            <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F", marginBottom: "1vh" }}>Log it</div>
            <div style={{ fontSize: "1.1vw", color: "#64748B", lineHeight: 1.6, textWrap: "pretty" }}>
              One tap records the spend against the right bucket. The dashboard updates live — category bars, remaining balance, and pacing status all refresh instantly.
            </div>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
            <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>Dashboard syncs</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#1E3A5F" }}>instantly</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh", fontSize: "0.9vw", color: "#94A3B8", fontWeight: 500 }}>
        <div>DigiKhata</div>
        <div style={{ display: "flex", gap: "1vw" }}>
          <span>Hackathon Demo</span>
          <span>•</span>
          <span>Slide 3</span>
        </div>
      </div>
    </div>
  );
}
