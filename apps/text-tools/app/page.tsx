import { Button } from "@makefy/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@makefy/ui/components/card";
import Link from "next/link";

export default function TextTools() {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Text Tools</CardTitle>
          <CardDescription>
            A collection of AI-powered tools for text generation and
            manipulation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/tiktok-hooks-generator">
            <Button className="w-full">TikTok Hooks Generator</Button>
          </Link>
          <Link href="/youtube-summarizer">
            <Button className="w-full">YouTube Video Summarizer</Button>
          </Link>
          <Link href="/podcast-script-generator">
            <Button className="w-full">Podcast Script Generator</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
