import { ImageResponse } from "@vercel/og";

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Clockout";
  const description =
    searchParams.get("description") ||
    "Local Business Automation Services";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#1a1a1a",
          color: "#f0f0f0",
          padding: "72px 80px",
        }}
      >
        {/* Brand bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#e8a832",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#1a1a1a",
            }}
          >
            C
          </div>
          <span
            style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Clockout
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 50 ? 48 : 64,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: description ? "24px" : "0",
            color: "#f0f0f0",
            maxWidth: "900px",
          }}
        >
          {title.length > 100 ? `${title.slice(0, 100)}…` : title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.4,
              color: "#a0a0a0",
              maxWidth: "800px",
            }}
          >
            {description.length > 160
              ? `${description.slice(0, 160)}…`
              : description}
          </div>
        )}

        {/* Accent line at bottom */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              "linear-gradient(90deg, #e8a832 0%, #d63a3a 50%, #e8a832 100%)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
  );
}
