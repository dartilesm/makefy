"use client";

import { Card, CardContent, CardHeader } from "@makefy/ui/components/card";
import { cn } from "@makefy/ui/lib/utils";
import { CopyButton } from "./copy-button";

interface ToolFormLayoutProps {
  form: React.ReactNode;
  output: React.ReactNode;
  outputText?: string;
  className?: string;
}

export function ToolFormLayout({
  form,
  output,
  outputText,
  className,
}: ToolFormLayoutProps) {
  return (
    <div className={cn("container mx-auto py-10", className)}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="pt-6">{form}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="font-medium">Output</h3>
            {outputText && <CopyButton text={outputText} />}
          </CardHeader>
          <CardContent>{output}</CardContent>
        </Card>
      </div>
    </div>
  );
}
