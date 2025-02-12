"use client";

import { useState } from "react";
import { PDFUpload } from "@/app/components/pdf-upload";
import { ResumeForm } from "@/app/components/resume-form";
import { ResumeSuggestions } from "@/app/components/resume-suggestions";
import { Textarea, Label, Button, toast } from "@makefy/ui";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { resumeSchema } from "@/schemas/resume-data.schema";
import { resumeSuggestionsSchema } from "@/schemas/resume-suggestions.schema";

export default function ResumeEnhancer() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [rawContent, setRawContent] = useState<string | null>(null);

  const { object: resumeData, submit: getStructuredData } = useObject({
    api: "/api/get-structured-resume-data",
    schema: resumeSchema,
  });

  const { object: suggestions, submit: getSuggestions } = useObject({
    api: "/api/resume-suggestion",
    schema: resumeSuggestionsSchema,
  });

  const handlePDFUpload = async (file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      // First, get the raw content from the PDF
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to parse PDF");
      const { rawContent } = await response.json();
      setRawContent(rawContent);
      setIsLoading(false);
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({
        title: "Error",
        description: "Failed to process the PDF file. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleGetSuggestions = async () => {
    if (!jobDescription.trim() || !rawContent) {
      toast({
        title: "Error",
        description: !jobDescription.trim()
          ? "Please enter a job description"
          : "Please upload a resume first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // First get structured data
      await getStructuredData({ rawContent });
      // Then get suggestions
      await getSuggestions({
        resumeText: rawContent,
        jobDescription,
      });
    } catch (error) {
      console.error("Error getting suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to get suggestions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto h-full max-h-full overflow-auto p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {!rawContent ? (
            <PDFUpload onUpload={handlePDFUpload} isLoading={isLoading} />
          ) : (
            <ResumeForm initialData={resumeData} suggestions={suggestions} />
          )}
        </div>
        <div className="space-y-6 md:col-span-1">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="min-h-[200px]"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleGetSuggestions}
              disabled={isLoading || !rawContent}
              className="w-full"
            >
              Get Suggestions
            </Button>
          </div>
          {suggestions && <ResumeSuggestions suggestions={suggestions} />}
        </div>
      </div>
    </div>
  );
}
