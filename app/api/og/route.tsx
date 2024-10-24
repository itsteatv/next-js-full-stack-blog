import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "itsteatv Blog";

    const imageData = await fetch(
      new URL("../../../public/main.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            backgroundColor: "white",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              width="256"
              height="256"
              src={imageData}
              style={{
                borderRadius: 128,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontStyle: "normal",
              color: "black",
              marginTop: 30,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}
          >
            <b>{title}</b>
          </div>
        </div>
      )
    );
  } catch (error) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
