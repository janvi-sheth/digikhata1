export default function Slide5NudgeEngine() {
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
          <div>AI NUDGE ENGINE</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#0D9488", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          AI Nudge Engine
        </div>
        <h2 style={{ fontSize: "4vw", fontWeight: 800, margin: "0 0 2vh 0", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1E3A5F", textWrap: "balance" }}>
          Smart nudges before you overspend
        </h2>
        <p style={{ fontSize: "1.3vw", fontWeight: 400, color: "#475569", margin: "0 0 4vh 0", lineHeight: 1.6, textWrap: "pretty" }}>
          Powered by Anakin.io Wire — real-time price intelligence from Flipkart and Amazon. Calm, factual tone. No guilt, no alarm.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ background: "#FFFFFF", padding: "2.5vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", gap: "1.5vw", alignItems: "center" }}>
            <div style={{ width: "3vw", height: "3vw", background: "rgba(13,148,136,0.1)", borderRadius: "0.6vw", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: "1.2vw", height: "1.2vw", background: "#0D9488", borderRadius: "50%" }} />
            </div>
            <div style={{ fontSize: "1.1vw", color: "#1E3A5F", lineHeight: 1.5 }}>Checks if spending pace will breach budget by month-end</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "2.5vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", gap: "1.5vw", alignItems: "center" }}>
            <div style={{ width: "3vw", height: "3vw", background: "rgba(13,148,136,0.1)", borderRadius: "0.6vw", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: "1.2vw", height: "1.2vw", background: "#0D9488", borderRadius: "50%" }} />
            </div>
            <div style={{ fontSize: "1.1vw", color: "#1E3A5F", lineHeight: 1.5 }}>Surfaces cheaper alternatives for every purchase in real time</div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "2.5vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", gap: "1.5vw", alignItems: "center" }}>
            <div style={{ width: "3vw", height: "3vw", background: "rgba(13,148,136,0.1)", borderRadius: "0.6vw", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: "1.2vw", height: "1.2vw", background: "#0D9488", borderRadius: "50%" }} />
            </div>
            <div style={{ fontSize: "1.1vw", color: "#1E3A5F", lineHeight: 1.5 }}>Falls back to demo mode automatically if API key is absent</div>
          </div>
        </div>
      </div>

      {/* Right: mock nudge card UI */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ background: "#FFFFFF", padding: "4vh 3vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "3vh" }}>
          <div style={{ fontSize: "1vw", fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>Live nudge example</div>

          <div style={{ background: "#FAFBFC", border: "1px solid #E2E8F0", borderRadius: "0.8vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500, marginBottom: "0.5vh" }}>Item</div>
            <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F" }}>Boat Airdopes 141</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5vh" }}>
              <div>
                <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>Your price</div>
                <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F" }}>₹1,299</div>
              </div>
              <div>
                <div style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 500 }}>Category</div>
                <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F" }}>Fun & Leisure</div>
              </div>
            </div>
          </div>

          <div style={{ background: "rgba(13,148,136,0.06)", border: "1px solid rgba(13,148,136,0.2)", borderRadius: "0.8vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#0D9488", marginBottom: "1vh" }}>On track — proceed with care</div>
            <div style={{ fontSize: "1vw", color: "#475569", lineHeight: 1.5 }}>You've spent ₹900 of your ₹3,000 Fun & Leisure budget. At current pace you'll use 62% by month-end — within budget.</div>
          </div>

          <div>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#1E3A5F", marginBottom: "1.5vh" }}>Cheaper alternatives found</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2vh" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAFBFC", padding: "1.5vh 1.5vw", borderRadius: "0.6vw", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 500 }}>Flipkart</div>
                <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#0D9488" }}>₹1,143 <span style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 400 }}>(-12%)</span></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAFBFC", padding: "1.5vh 1.5vw", borderRadius: "0.6vw", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 500 }}>Amazon</div>
                <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#0D9488" }}>₹1,195 <span style={{ fontSize: "0.9vw", color: "#64748B", fontWeight: 400 }}>(-8%)</span></div>
              </div>
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
          <span>Slide 5</span>
        </div>
      </div>
    </div>
  );
}
