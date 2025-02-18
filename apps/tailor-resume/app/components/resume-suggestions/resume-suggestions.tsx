import { Card, CardHeader, CardTitle, CardContent } from "@makefy/ui";
import { SuggestionSection } from "./suggestion-section";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { DeepPartial } from "ai";

interface ResumeSuggestionsProps {
  suggestions?: DeepPartial<ResumeSuggestionsSchemaType>;
}

export function ResumeSuggestions({ suggestions }: ResumeSuggestionsProps) {
  if (!suggestions) {
    return null;
  }

  const sections = [
    {
      title: "Required Skills & Experience",
      content: suggestions.keyJobQualifications,
      icon: "✨",
    },
    {
      title: "Enhancement Opportunities",
      content: suggestions.areasToExpand,
      icon: "🎯",
    },
    {
      title: "Examples to get you started",
      content: suggestions.exampleText,
      icon: "💡",
    },
  ];

  const availableSections = sections.filter((section) => section.content);

  if (!availableSections.length) {
    return null;
  }

  return (
    <Card className="border border-gray-200 bg-white/50 transition-all duration-300 dark:border-gray-800 dark:bg-gray-900/50">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Resume Optimization Guide
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enhance your resume with these tailored suggestions
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {availableSections.map((section, index) => (
            <SuggestionSection
              title={section.title}
              content={section.content}
              icon={section.icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
