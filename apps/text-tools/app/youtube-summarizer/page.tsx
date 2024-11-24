"use client";

import { useCompletion } from "ai/react";
import { Button } from "@makefy/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@makefy/ui/components/card";
import { Input } from "@makefy/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@makefy/ui/components/select";
import { useState } from "react";

export default function YouTubeSummarizer() {
  const [videoUrl, setVideoUrl] = useState("");
  const [style, setStyle] = useState("concise");
  const [error, setError] = useState("");

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/youtube-summarizer/generate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await complete("", {
        body: {
          videoUrl,
          style,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>YouTube Video Summarizer</CardTitle>
          <CardDescription>
            Get a quick summary of any YouTube video
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">YouTube Video URL</label>
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                type="url"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Summary Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="bullet-points">Bullet Points</SelectItem>
                  <SelectItem value="key-takeaways">Key Takeaways</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Generating Summary..." : "Generate Summary"}
            </Button>
          </form>

          {completion && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Summary:</h3>
              <div className="bg-muted whitespace-pre-wrap rounded-lg p-4 text-sm">
                {completion}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
