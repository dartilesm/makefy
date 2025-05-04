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
import { MarkdownViewer } from "@/app/components/markdown-viewer";
import { ToolHero } from "@/app/components/tool-hero";
import { VideoIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function TikTokHookGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("casual");
  const [error, setError] = useState("");

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/tiktok-hooks-generator/generate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await complete("", {
        body: {
          topic,
          tone,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-4xl p-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <ToolHero
        title="TikTok Hook Generator"
        description="Create attention-grabbing hooks for your TikTok videos using AI. Get the perfect first 3 seconds that make viewers want to keep watching."
        icon={<VideoIcon className="h-8 w-8" />}
      />
      <div className="container mx-auto max-w-2xl py-10">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Video Topic</label>
                <Input
                  placeholder="Enter your video topic..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="funny">Funny</SelectItem>
                    <SelectItem value="dramatic">Dramatic</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Generating Hooks..." : "Generate Hooks"}
              </Button>
            </form>

            {completion && (
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Generated Hooks:</h3>
                <div className="bg-card rounded-lg border p-4">
                  <MarkdownViewer content={completion} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
