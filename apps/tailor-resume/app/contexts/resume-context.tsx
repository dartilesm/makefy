"use client";

import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { DeepPartial } from "ai";
import { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { ResumeDataSchemaTypeExtended } from "@/app/components/resume-enhancer";

interface ResumeContextType {
  resumeForm: UseFormReturn<ResumeDataSchemaTypeExtended> | null;
  suggestions: DeepPartial<ResumeSuggestionsSchemaType> | undefined;
  setSuggestions: (data: DeepPartial<ResumeSuggestionsSchemaType>) => void;
}

const ResumeContext = createContext<ResumeContextType>({
  resumeForm: null,
  suggestions: undefined,
  setSuggestions: () => {},
});

interface ResumeProviderProps {
  children: ReactNode;
  resumeForm: UseFormReturn<ResumeDataSchemaTypeExtended>;
  suggestions: DeepPartial<ResumeSuggestionsSchemaType> | undefined;
  setSuggestions: (data: DeepPartial<ResumeSuggestionsSchemaType>) => void;
}

export function ResumeProvider({
  children,
  resumeForm,
  suggestions,
  setSuggestions,
}: ResumeProviderProps) {
  return (
    <ResumeContext.Provider value={{ resumeForm, suggestions, setSuggestions }}>
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
