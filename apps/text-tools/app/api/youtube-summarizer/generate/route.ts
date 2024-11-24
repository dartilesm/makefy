import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { getYouTubeVideoInfo } from "@/lib/youtube";

export const runtime = "edge";

export async function POST(req: Request) {
  const { videoUrl, style } = await req.json();

  try {
    const videoInfo = await getYouTubeVideoInfo(videoUrl);

    const result = await streamText({
      model: google("gemini-1.5-flash-latest"),
      messages: [
        {
          role: "system",
          content:
            "You are an expert at summarizing YouTube videos in different styles.",
        },
        {
          role: "user",
          content: `Summarize this YouTube video in a ${style} style:
          Title: ${videoInfo.title}
          Description: ${videoInfo.description}
          Duration: ${videoInfo.duration}
          
          ${style === "bullet-points" ? "Use bullet points for the summary." : ""}
          ${style === "key-takeaways" ? "Focus on the main takeaways and lessons." : ""}
          ${style === "concise" ? "Keep it brief and to the point." : ""}
          ${style === "detailed" ? "Provide a comprehensive summary." : ""}`,
        },
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to process YouTube video" }),
      { status: 400 },
    );
  }
}
