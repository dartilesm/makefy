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
      title: "Key Job Qualifications",
      items: suggestions.keyJobQualifications,
    },
    {
      title: "Areas to Expand",
      items: suggestions.areasToExpand,
    },
    {
      title: "Example Improvements",
      items: suggestions.exampleText,
    },
    {
      title: "Example Improvements",
      items: suggestions.exampleText,
    },
  ];

  const availableSections = sections.filter(
    (section) => section.items && section.items.length > 0,
  );

  if (!availableSections.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Improvement Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {availableSections.map((section, index) => (
            <SuggestionSection
              key={index}
              title={section.title}
              items={section?.items || []}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
