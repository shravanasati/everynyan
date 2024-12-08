import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "hsl(var(--background))",
          fontSize: 60,
          fontWeight: 800,
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--secondary)))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          EveryNyan
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: "hsl(var(--foreground))",
            marginTop: 20,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
