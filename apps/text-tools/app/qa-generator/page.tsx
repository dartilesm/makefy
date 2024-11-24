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
import { Textarea } from "@makefy/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@makefy/ui/components/select";
import { Input } from "@makefy/ui/components/input";
import { useState } from "react";
import { MarkdownViewer } from "@/app/components/markdown-viewer";

export default function QAGenerator() {
  const [content, setContent] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("5");
  const [difficulty, setDifficulty] = useState("medium");
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/qa-generator/generate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await complete("", {
        body: {
          content,
          numberOfQuestions,
          difficulty,
          topic,
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
          <CardTitle>Q&A Generator</CardTitle>
          <CardDescription>
            Generate questions and answers from any text or topic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Paste your text content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Topic (Optional)</label>
              <Input
                placeholder="Specify a topic for focused Q&A..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <p className="text-muted-foreground text-xs">
                If no content is provided, questions will be generated based on
                this topic
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Questions</label>
              <Select
                value={numberOfQuestions}
                onValueChange={setNumberOfQuestions}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of questions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Questions</SelectItem>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Generating Q&A..." : "Generate Q&A"}
            </Button>
          </form>

          {completion && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Generated Q&A:</h3>
              <div className="bg-card rounded-lg border p-4">
                <MarkdownViewer content={completion} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
