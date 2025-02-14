import { Card, CardHeader, CardTitle, CardContent } from "@makefy/ui";
import { SuggestionSection } from "./suggestion-section";

export interface ResumeImprovements {
  keyJobQualifications: string[];
  skillsToHighlight: string[];
  areasToExpand: string[];
  keywordsToInclude: string[];
  achievementsToQuantify: string[];
  exampleText: string[];
}

interface ResumeSuggestionsProps {
  suggestions?: ResumeImprovements;
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
      title: "Skills to Highlight",
      items: suggestions.skillsToHighlight,
    },
    {
      title: "Areas to Expand",
      items: suggestions.areasToExpand,
    },
    {
      title: "Keywords to Include",
      items: suggestions.keywordsToInclude,
    },
    {
      title: "Example Improvements",
      items: suggestions.exampleText,
    },
  ];

  const availableSections = sections.filter(
    (section) => section.items?.length > 0,
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
              items={section.items}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
