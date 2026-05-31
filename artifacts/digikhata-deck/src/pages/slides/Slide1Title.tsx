export default function Slide1Title() {
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
        gridTemplateColumns: "3fr 2fr",
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
          <div>HACKATHON DEMO</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left content */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#0D9488", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Personal Finance
        </div>
        <h1 style={{ fontSize: "6vw", fontWeight: 800, margin: "0 0 2.5vh 0", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#1E3A5F" }}>
          DigiKhata
        </h1>
        <p style={{ fontSize: "1.6vw", fontWeight: 400, color: "#475569", margin: "0 0 5vh 0", lineHeight: 1.5, maxWidth: "38vw", textWrap: "pretty" }}>
          Personal finance for first-time earners. Auto-splits your salary into budget buckets and nudges you before you overspend.
        </p>

        <div style={{ display: "flex", gap: "2vw" }}>
          <div style={{ background: "#FFFFFF", padding: "2.5vh 2vw", borderRadius: "1vw", border: "1px solid #E2E8F0", flex: 1, boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)" }}>
            <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#64748B", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.05em" }}>Budget Buckets</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1vw" }}>
              <div style={{ fontSize: "3.5vw", fontWeight: 700, color: "#1E3A5F" }}>8</div>
              <div style={{ fontSize: "1vw", fontWeight: 600, color: "#0D9488", backgroundColor: "rgba(13, 148, 136, 0.1)", padding: "0.5vh 0.8vw", borderRadius: "2vw" }}>auto-split</div>
            </div>
          </div>
          <div style={{ background: "#FFFFFF", padding: "2.5vh 2vw", borderRadius: "1vw", border: "1px solid #E2E8F0", flex: 1, boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)" }}>
            <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#64748B", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI Nudges</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1vw" }}>
              <div style={{ fontSize: "3.5vw", fontWeight: 700, color: "#1E3A5F" }}>Live</div>
              <div style={{ fontSize: "1vw", fontWeight: 600, color: "#0D9488", backgroundColor: "rgba(13, 148, 136, 0.1)", padding: "0.5vh 0.8vw", borderRadius: "2vw" }}>real-time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: visual card */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ background: "#FFFFFF", padding: "4vh 3vw", borderRadius: "1vw", border: "1px solid #E2E8F0", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)" }}>
          <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F" }}>Monthly Budget Split</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh", marginTop: "2vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748B", width: "8vw", fontWeight: 500 }}>Rent</div>
              <div style={{ flex: 1, height: "1.2vh", background: "#E2E8F0", borderRadius: "0.6vh", overflow: "hidden" }}>
                <div style={{ width: "25%", height: "100%", background: "#0D9488", borderRadius: "0.6vh" }} />
              </div>
              <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#1E3A5F", width: "2.5vw" }}>25%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748B", width: "8vw", fontWeight: 500 }}>Savings</div>
              <div style={{ flex: 1, height: "1.2vh", background: "#E2E8F0", borderRadius: "0.6vh", overflow: "hidden" }}>
                <div style={{ width: "20%", height: "100%", background: "#0D9488", borderRadius: "0.6vh" }} />
              </div>
              <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#1E3A5F", width: "2.5vw" }}>20%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748B", width: "8vw", fontWeight: 500 }}>Investment</div>
              <div style={{ flex: 1, height: "1.2vh", background: "#E2E8F0", borderRadius: "0.6vh", overflow: "hidden" }}>
                <div style={{ width: "20%", height: "100%", background: "#0D9488", borderRadius: "0.6vh" }} />
              </div>
              <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#1E3A5F", width: "2.5vw" }}>20%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748B", width: "8vw", fontWeight: 500 }}>Groceries</div>
              <div style={{ flex: 1, height: "1.2vh", background: "#E2E8F0", borderRadius: "0.6vh", overflow: "hidden" }}>
                <div style={{ width: "10%", height: "100%", background: "rgba(13,148,136,0.6)", borderRadius: "0.6vh" }} />
              </div>
              <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#1E3A5F", width: "2.5vw" }}>10%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748B", width: "8vw", fontWeight: 500 }}>Fun & Leisure</div>
              <div style={{ flex: 1, height: "1.2vh", background: "#E2E8F0", borderRadius: "0.6vh", overflow: "hidden" }}>
                <div style={{ width: "10%", height: "100%", background: "rgba(13,148,136,0.6)", borderRadius: "0.6vh" }} />
              </div>
              <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#1E3A5F", width: "2.5vw" }}>10%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ fontSize: "0.9vw", color: "#64748B", width: "8vw", fontWeight: 500 }}>Others</div>
              <div style={{ flex: 1, height: "1.2vh", background: "#E2E8F0", borderRadius: "0.6vh", overflow: "hidden" }}>
                <div style={{ width: "15%", height: "100%", background: "rgba(13,148,136,0.4)", borderRadius: "0.6vh" }} />
              </div>
              <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#1E3A5F", width: "2.5vw" }}>15%</div>
            </div>
          </div>
          <div style={{ fontSize: "0.85vw", color: "#94A3B8", marginTop: "2vh", fontWeight: 500 }}>Built in 48 hours</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh", fontSize: "0.9vw", color: "#94A3B8", fontWeight: 500 }}>
        <div>DigiKhata</div>
        <div style={{ display: "flex", gap: "1vw" }}>
          <span>Hackathon Demo</span>
          <span>•</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
}
