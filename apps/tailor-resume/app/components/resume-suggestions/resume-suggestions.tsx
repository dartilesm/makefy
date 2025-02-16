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
    },
    {
      title: "Enhancement Opportunities",
      content: suggestions.areasToExpand,
    },
    {
      title: "Examples to get you started",
      content: suggestions.exampleText,
    },
  ];

  const availableSections = sections.filter((section) => section.content);

  if (!availableSections.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Resume Optimization Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {availableSections.map((section, index) => (
            <SuggestionSection
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
