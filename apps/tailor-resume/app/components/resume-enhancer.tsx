"use client";

import { useState } from "react";
import { PDFUpload } from "@/app/components/pdf-upload";
import { ResumeData } from "@/app/components/resume-data/resume-data";
import { ResumeSuggestions } from "@/app/components/resume-suggestions/resume-suggestions";
import { Textarea, Label, Button, toast } from "@makefy/ui";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  resumeDataSchema,
  ResumeDataSchemaType,
} from "@/schemas/resume-data.schema";
import {
  resumeSuggestionsSchema,
  ResumeSuggestionsSchemaType,
} from "@/schemas/resume-suggestions.schema";

// Separate component for job description input
function JobDescriptionSection({
  jobDescription,
  setJobDescription,
  onGetSuggestions,
  isLoading,
  hasContent,
}: {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  onGetSuggestions: () => Promise<void>;
  isLoading: boolean;
  hasContent: boolean;
}) {
  return (
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
        <Button
          onClick={onGetSuggestions}
          disabled={isLoading || !hasContent}
          className="w-full"
        >
          Get Suggestions
        </Button>
      </div>
    </div>
  );
}

export default function ResumeEnhancer() {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [rawContent, setRawContent] = useState<string | null>(null);

  // AI object handlers
  const { object: resumeData, submit: getStructuredData } =
    useObject<ResumeDataSchemaType>({
      api: "/api/get-structured-resume-data",
      schema: resumeDataSchema,
    });

  const { object: suggestions, submit: getSuggestions } =
    useObject<ResumeSuggestionsSchemaType>({
      api: "/api/resume-suggestion",
      schema: resumeSuggestionsSchema,
    });

  // PDF upload handler
  async function handlePDFUpload(file: File) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse PDF");
      }

      const { rawContent: content } = await response.json();
      setRawContent(content);
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({
        title: "Error",
        description: "Failed to process the PDF file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Get suggestions handler
  async function handleGetSuggestions() {
    if (!validateInput()) {
      return;
    }

    try {
      setIsLoading(true);
      await processResume();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Helper functions for better organization
  function validateInput() {
    if (!jobDescription.trim() || !rawContent) {
      toast({
        title: "Error",
        description: !jobDescription.trim()
          ? "Please enter a job description"
          : "Please upload a resume first",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  async function processResume() {
    if (!rawContent) return;
    await getStructuredData({ rawContent });
    await getSuggestions({
      resumeText: rawContent,
      jobDescription,
    });
  }

  function handleError(error: unknown) {
    console.error("Error getting suggestions:", error);
    toast({
      title: "Error",
      description: "Failed to get suggestions",
      variant: "destructive",
    });
  }

  return (
    <div className="h-full max-h-full overflow-auto p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {!rawContent && (
            <PDFUpload onUpload={handlePDFUpload} isLoading={isLoading} />
          )}

          {resumeData && suggestions && (
            <ResumeData initialData={resumeData} suggestions={suggestions} />
          )}
        </div>

        <div className="space-y-6 md:col-span-1">
          {!resumeData && !suggestions && (
            <JobDescriptionSection
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onGetSuggestions={handleGetSuggestions}
              isLoading={isLoading}
              hasContent={!!rawContent}
            />
          )}
          {suggestions && <ResumeSuggestions suggestions={suggestions} />}
        </div>
      </div>
    </div>
  );
}
