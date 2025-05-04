"use client";

import { useCompletion } from "ai/react";
import { Button } from "@makefy/ui/components/button";
import { Input } from "@makefy/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@makefy/ui/components/select";
import { Textarea } from "@makefy/ui/components/textarea";
import { useState } from "react";
import { MarkdownViewer } from "@/app/components/markdown-viewer";
import { Link as LinkIcon, MicIcon, ArrowLeftIcon } from "lucide-react";
import { ToolHero } from "@/app/components/tool-hero";
import { ToolFormLayout } from "@/app/components/tool-form-layout";
import Link from "next/link";

export default function PodcastScriptGenerator() {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("15");
  const [style, setStyle] = useState("conversational");
  const [targetAudience, setTargetAudience] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [error, setError] = useState("");

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/podcast-script-generator/generate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await complete("", {
        body: {
          topic,
          duration,
          style,
          targetAudience,
          keyPoints,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-4xl p-4">
        <Button variant="ghost" className="mb-4 gap-2" asChild>
          <Link href="/">
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <ToolHero
        title="Podcast Script Generator"
        description="Generate professional podcast scripts tailored to your topic, style, and audience. Create engaging content with proper structure and flow."
        icon={<MicIcon className="h-8 w-8" />}
      />
      <ToolFormLayout
        form={
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Podcast Topic</label>
              <Input
                placeholder="Enter your podcast topic..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Target Duration (minutes)
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Script Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="interview">Interview Format</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                  <SelectItem value="debate">Debate Style</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Audience</label>
              <Input
                placeholder="Describe your target audience..."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Key Points (Optional)
              </label>
              <Textarea
                placeholder="Enter key points to cover in the podcast..."
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                rows={4}
              />
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Generating Script..." : "Generate Script"}
            </Button>
          </form>
        }
        output={
          completion ? (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <MarkdownViewer content={completion} />
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground py-8 text-center">
              Your generated script will appear here
            </div>
          )
        }
        outputText={completion}
      />
    </>
  );
}
