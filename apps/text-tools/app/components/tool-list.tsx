import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@makefy/ui/components/card";
import Link from "next/link";
import {
  VideoIcon,
  MicIcon,
  MessageSquareIcon,
  HelpCircleIcon,
} from "lucide-react";

const tools = [
  {
    title: "TikTok Hooks Generator",
    description:
      "Create engaging hooks for your TikTok videos using AI. Get attention-grabbing first 3 seconds that make viewers want to keep watching.",
    icon: <VideoIcon className="h-6 w-6" />,
    href: "/tiktok-hooks-generator",
  },
  {
    title: "YouTube Video Summarizer",
    description:
      "Get quick, accurate summaries of YouTube videos. Save time while capturing key points and main takeaways.",
    icon: <MessageSquareIcon className="h-6 w-6" />,
    href: "/youtube-summarizer",
  },
  {
    title: "Podcast Script Generator",
    description:
      "Generate professional podcast scripts tailored to your topic, style, and audience. Create engaging content with proper structure and flow.",
    icon: <MicIcon className="h-6 w-6" />,
    href: "/podcast-script-generator",
  },
  {
    title: "Q&A Generator",
    description:
      "Generate comprehensive questions and answers from any text or topic. Perfect for study materials, quizzes, and educational content.",
    icon: <HelpCircleIcon className="h-6 w-6" />,
    href: "/qa-generator",
  },
];

export function ToolList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <Link key={tool.href} href={tool.href} className="group">
          <Card className="hover:bg-muted/50 h-full transition-colors">
            <CardHeader>
              <div
                className="bg-primary/10 text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  viewTransitionName: `tool-icon-${tool.href.replace("/", "")}`,
                }}
              >
                {tool.icon}
              </div>
              <CardTitle
                className="group-hover:text-primary transition-colors"
                style={{
                  viewTransitionName: `tool-name-${tool.href.replace("/", "")}`,
                }}
              >
                {tool.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {tool.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
