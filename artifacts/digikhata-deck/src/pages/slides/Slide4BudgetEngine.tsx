export default function Slide4BudgetEngine() {
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
          <div>BUDGET ENGINE</div>
          <div>2026</div>
        </div>
      </div>

      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#0D9488", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Budget Engine
        </div>
        <h2 style={{ fontSize: "4vw", fontWeight: 800, margin: "0 0 2vh 0", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#1E3A5F", textWrap: "balance" }}>
          8 categories, auto-calculated
        </h2>
        <p style={{ fontSize: "1.3vw", fontWeight: 400, color: "#475569", margin: "0 0 4vh 0", lineHeight: 1.6, textWrap: "pretty" }}>
          Enter your monthly salary once. Every bucket is computed instantly — no spreadsheet, no manual percentages.
        </p>

        <div style={{ background: "#FFFFFF", padding: "3vh 2.5vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)" }}>
          <div style={{ fontSize: "1vw", fontWeight: 600, color: "#64748B", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.05em" }}>Example — ₹30,000 salary</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: "0.95vw", color: "#64748B" }}>Rent (25%)</div>
            <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F" }}>₹7,500</div>
          </div>
          <div style={{ height: "1px", background: "#E2E8F0", margin: "1vh 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: "0.95vw", color: "#64748B" }}>Savings (20%)</div>
            <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F" }}>₹6,000</div>
          </div>
          <div style={{ height: "1px", background: "#E2E8F0", margin: "1vh 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: "0.95vw", color: "#64748B" }}>Groceries (10%)</div>
            <div style={{ fontSize: "1.4vw", fontWeight: 700, color: "#1E3A5F" }}>₹3,000</div>
          </div>
        </div>
      </div>

      {/* Right: all 8 buckets visualised */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ background: "#FFFFFF", padding: "3.5vh 3vw", borderRadius: "1vw", border: "1px solid #E2E8F0", boxShadow: "0 0.5vw 1.5vw rgba(30, 58, 95, 0.06)", display: "flex", flexDirection: "column", gap: "2vh" }}>
          <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1E3A5F", marginBottom: "0.5vh" }}>Allocation breakdown</div>

          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 600, width: "10vw" }}>Rent</div>
            <div style={{ flex: 1, height: "1.4vh", background: "#E2E8F0", borderRadius: "0.7vh", overflow: "hidden" }}>
              <div style={{ width: "25%", height: "100%", background: "#0D9488", borderRadius: "0.7vh" }} />
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 700, color: "#0D9488", width: "3vw", textAlign: "right" }}>25%</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 600, width: "10vw" }}>Savings</div>
            <div style={{ flex: 1, height: "1.4vh", background: "#E2E8F0", borderRadius: "0.7vh", overflow: "hidden" }}>
              <div style={{ width: "20%", height: "100%", background: "#0D9488", borderRadius: "0.7vh" }} />
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 700, color: "#0D9488", width: "3vw", textAlign: "right" }}>20%</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 600, width: "10vw" }}>Investment</div>
            <div style={{ flex: 1, height: "1.4vh", background: "#E2E8F0", borderRadius: "0.7vh", overflow: "hidden" }}>
              <div style={{ width: "20%", height: "100%", background: "#0D9488", borderRadius: "0.7vh" }} />
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 700, color: "#0D9488", width: "3vw", textAlign: "right" }}>20%</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 600, width: "10vw" }}>Groceries</div>
            <div style={{ flex: 1, height: "1.4vh", background: "#E2E8F0", borderRadius: "0.7vh", overflow: "hidden" }}>
              <div style={{ width: "10%", height: "100%", background: "rgba(13,148,136,0.7)", borderRadius: "0.7vh" }} />
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 700, color: "#64748B", width: "3vw", textAlign: "right" }}>10%</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 600, width: "10vw" }}>Fun & Leisure</div>
            <div style={{ flex: 1, height: "1.4vh", background: "#E2E8F0", borderRadius: "0.7vh", overflow: "hidden" }}>
              <div style={{ width: "10%", height: "100%", background: "rgba(13,148,136,0.7)", borderRadius: "0.7vh" }} />
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 700, color: "#64748B", width: "3vw", textAlign: "right" }}>10%</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 600, width: "10vw" }}>Health</div>
            <div style={{ flex: 1, height: "1.4vh", background: "#E2E8F0", borderRadius: "0.7vh", overflow: "hidden" }}>
              <div style={{ width: "5%", height: "100%", background: "rgba(13,148,136,0.5)", borderRadius: "0.7vh" }} />
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 700, color: "#64748B", width: "3vw", textAlign: "right" }}>5%</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 600, width: "10vw" }}>Ordering In</div>
            <div style={{ flex: 1, height: "1.4vh", background: "#E2E8F0", borderRadius: "0.7vh", overflow: "hidden" }}>
              <div style={{ width: "5%", height: "100%", background: "rgba(13,148,136,0.5)", borderRadius: "0.7vh" }} />
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 700, color: "#64748B", width: "3vw", textAlign: "right" }}>5%</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "1vw", color: "#1E3A5F", fontWeight: 600, width: "10vw" }}>Shopping</div>
            <div style={{ flex: 1, height: "1.4vh", background: "#E2E8F0", borderRadius: "0.7vh", overflow: "hidden" }}>
              <div style={{ width: "5%", height: "100%", background: "rgba(13,148,136,0.5)", borderRadius: "0.7vh" }} />
            </div>
            <div style={{ fontSize: "1vw", fontWeight: 700, color: "#64748B", width: "3vw", textAlign: "right" }}>5%</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh", fontSize: "0.9vw", color: "#94A3B8", fontWeight: 500 }}>
        <div>DigiKhata</div>
        <div style={{ display: "flex", gap: "1vw" }}>
          <span>Hackathon Demo</span>
          <span>•</span>
          <span>Slide 4</span>
        </div>
      </div>
    </div>
  );
}
