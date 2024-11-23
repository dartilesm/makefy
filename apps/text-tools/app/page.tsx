"use client";

import { useCompletion } from "ai/react";
import { Button } from "@makefy/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

export default function TikTokHookGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("casual");

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/generate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await complete("", { body: { topic, tone } });
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>TikTok Hook Generator</CardTitle>
        </CardHeader>
        <CardContent>
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

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate Hooks"}
            </Button>
          </form>

          {completion && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Generated Hooks:</h3>
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
