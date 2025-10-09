import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "radial-gradient(1200px 630px at 0% 0%, #0ea5e9 0%, transparent 60%), radial-gradient(1200px 630px at 100% 100%, #22d3ee 0%, #0b0f1a 60%)",
          color: "#e5e7eb",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: -1.2,
              color: "#f8fafc",
              textShadow: "0 6px 30px rgba(56,189,248,0.35)",
            }}
          >
            Valerio Mannucci
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1" }}>
            AI Developer
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", color: "#94a3b8", fontSize: 24 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                background: "linear-gradient(135deg, #38bdf8 0%, #22d3ee 100%)",
                boxShadow: "0 0 20px rgba(56,189,248,0.5)",
              }}
            />
            vale.dev
          </div>
          <div style={{ fontSize: 22, color: "#93c5fd" }}>AI • Next.js • DX</div>
        </div>
      </div>
    ),
    size
  );
}


