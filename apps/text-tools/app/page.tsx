import { ToolList } from "./components/tool-list";

export default function TextTools() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Text Tools</h1>
        <p className="text-muted-foreground mt-2">
          A collection of AI-powered tools for text generation and manipulation
        </p>
      </div>

      <ToolList />
    </div>
  );
}
