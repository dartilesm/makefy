export type YouTubeVideoInfo = {
  videoId: string;
  title: string;
  description: string;
  duration: string;
};

export async function getYouTubeVideoInfo(
  url: string,
): Promise<YouTubeVideoInfo> {
  try {
    // Extract video ID from YouTube URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // For now return mock data since we don't have YouTube API access
    // In production, you would want to use YouTube Data API to get real data
    return {
      videoId,
      title: "Sample YouTube Video",
      description: "This is a sample video description",
      duration: "10:00",
    };
  } catch (error) {
    throw new Error("Failed to get YouTube video information");
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}
