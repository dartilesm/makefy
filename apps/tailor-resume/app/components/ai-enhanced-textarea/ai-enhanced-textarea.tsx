"use client";

import {
  improvedFieldSchema,
  ImprovedFieldSchemaType,
} from "@/schemas/improved-file.schema";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Textarea } from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import { DeepPartial } from "ai";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { AITextareaLoading } from "./ai-textarea-loading";
import { FormatStyleButtons } from "./format-style-buttons";
import { SuggestionsAccordion } from "./suggestions-accordion";
import { TEXT_STYLE } from "@/constants/text-style";
import { ResumeDataSchemaTypeExtended } from "../resume-data/resume-data";

interface AIEnhancedTextareaProps {
  field: ControllerRenderProps<any, any>;
  fieldPath: string;
  suggestions?: DeepPartial<ResumeSuggestionsSchemaType>;
}

export function AIEnhancedTextarea({
  field,
  fieldPath,
  suggestions,
}: AIEnhancedTextareaProps) {
  const form = useFormContext<ResumeDataSchemaTypeExtended>();
  const currentAIImprovement =
    form.getValues("aiImprovements")?.[fieldPath] || "";

  const [loadingStates, setLoadingStates] = useState<
    Record<TEXT_STYLE, boolean>
  >({
    [TEXT_STYLE.REWRITE]: false,
    [TEXT_STYLE.SHORTEN]: false,
    [TEXT_STYLE.FORMAL]: false,
    [TEXT_STYLE.CASUAL]: false,
  });

  const {
    object: improvedField,
    submit: improveField,
    isLoading,
  } = useObject<ImprovedFieldSchemaType>({
    api: "/api/improve-resume-field",
    schema: improvedFieldSchema,
  });

  useEffect(() => {
    handleImprove();
  }, []);

  useEffect(() => {
    if (improvedField?.value) {
      field.onChange(improvedField.value);
      updateAiImprovements();
    }
  }, [improvedField?.value, field]);

  async function handleImprove(style?: TEXT_STYLE) {
    if (!suggestions || isLoading) return;

    setLoadingStates((prev) => ({ ...prev, [style || "rewrite"]: true }));

    try {
      await improveField({
        fieldContent: field.value,
        suggestions,
        style,
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [style || "rewrite"]: false }));
    }
  }

  function updateAiImprovements() {
    const currentAiImprovements = form.getValues("aiImprovements");
    const updatedAiImprovements = {
      ...currentAiImprovements,
      [fieldPath]: improvedField?.suggestionsApplied || "",
    };

    form.setValue("aiImprovements", updatedAiImprovements);
  }

  const currentLoadingState = Object.keys(loadingStates).find(
    (key) => loadingStates[key as TEXT_STYLE],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          className={cn([
            "absolute h-0 w-0 overflow-hidden p-1 transition-[height] duration-300 ease-in-out",
            {
              "bg-background border-input absolute h-full w-full overflow-hidden rounded-md border p-1":
                !improvedField?.value,
            },
          ])}
        >
          <AITextareaLoading show={!improvedField?.value} />
        </div>

        <Textarea
          {...field}
          className="max-h-64 min-h-64 resize-none transition-[height] duration-300 ease-in-out [field-sizing:content]"
        />
      </div>

      {(improvedField?.suggestionsApplied || currentAIImprovement) && (
        <SuggestionsAccordion
          content={improvedField?.suggestionsApplied || currentAIImprovement}
        />
      )}

      <FormatStyleButtons
        onImprove={handleImprove}
        loadingStates={loadingStates}
        currentLoadingState={currentLoadingState}
        isLoading={isLoading}
      />
    </div>
  );
}
