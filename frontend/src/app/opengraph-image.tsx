import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anant Kumar — DevOps Engineer | AI Cloud Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Terminal-styled social preview card.
export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0e16",
          fontFamily: "monospace",
          padding: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: "1px solid #1e293b",
            borderRadius: 16,
            background: "#0b0f1a",
            overflow: "hidden",
          }}
        >
          {/* window chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#11151f",
              padding: "16px 22px",
              borderBottom: "1px solid #1e293b",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 99, background: "#ef4444" }} />
            <div style={{ width: 14, height: 14, borderRadius: 99, background: "#f59e0b" }} />
            <div style={{ width: 14, height: 14, borderRadius: 99, background: "#10b981" }} />
            <div style={{ marginLeft: 14, color: "#64748b", fontSize: 22 }}>
              anant@portfolio:~$
            </div>
          </div>

          {/* body */}
          <div style={{ display: "flex", flexDirection: "column", padding: 44, gap: 14 }}>
            <div style={{ color: "#34d399", fontSize: 26 }}>$ whoami</div>
            <div style={{ color: "#f1f5f9", fontSize: 64, fontWeight: 700 }}>
              Anant Kumar
            </div>
            <div style={{ color: "#22d3ee", fontSize: 34 }}>
              DevOps Engineer · AI Cloud Infrastructure
            </div>
            <div style={{ color: "#94a3b8", fontSize: 26, marginTop: 6 }}>
              Kubernetes · GPU / vLLM · CI/CD · Helm · Prometheus
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              {["kubectl get pods", "ask <question>", "projects"].map((c) => (
                <div
                  key={c}
                  style={{
                    color: "#cbd5e1",
                    fontSize: 22,
                    border: "1px solid #334155",
                    borderRadius: 8,
                    padding: "8px 14px",
                    background: "#1e293b66",
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
