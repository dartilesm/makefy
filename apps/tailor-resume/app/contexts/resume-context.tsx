"use client";

import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { DeepPartial } from "ai";
import { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDataSchemaTypeExtended } from "@/app/components/resume-enhancer";
import { ResumeAnalysisFormValues } from "../components/resume-analysis-form";

interface ResumeContextType {
  resumeForm: UseFormReturn<ResumeDataSchemaTypeExtended> | null;
  suggestions: DeepPartial<ResumeSuggestionsSchemaType> | undefined;
  jobInfo: ResumeAnalysisFormValues | undefined;
  setSuggestions: (data: DeepPartial<ResumeSuggestionsSchemaType>) => void;
}

const ResumeContext = createContext<ResumeContextType>({
  resumeForm: null,
  suggestions: undefined,
  jobInfo: undefined,
  setSuggestions: () => {},
});

interface ResumeProviderProps {
  children: ReactNode;
  resumeForm: UseFormReturn<ResumeDataSchemaTypeExtended>;
  suggestions: DeepPartial<ResumeSuggestionsSchemaType> | undefined;
  jobInfo: ResumeAnalysisFormValues | undefined;
  setSuggestions: (data: DeepPartial<ResumeSuggestionsSchemaType>) => void;
}

export function ResumeProvider({
  children,
  resumeForm,
  suggestions,
  jobInfo,
  setSuggestions,
}: ResumeProviderProps) {
  return (
    <ResumeContext.Provider
      value={{ resumeForm, suggestions, jobInfo, setSuggestions }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
