import {
  improvedFieldSchema,
  ImprovedFieldSchemaType,
} from "@/schemas/improved-file.schema";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  MagicButton,
  MarkdownViewer,
  Skeleton,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import { SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { DeepPartial } from "ai";

export const enum FIELDTYPE {
  TEXT = "text",
  TEXTAREA = "textarea",
}

export const FIELD_CONFIGS = {
  description: { type: FIELDTYPE.TEXTAREA },
  summary: { type: FIELDTYPE.TEXTAREA },
  skills: {
    type: FIELDTYPE.TEXTAREA,
    placeholder: "Enter skills separated by commas",
  },
} as const;

interface FieldBaseProps {
  fieldName: string;
  fieldPath: string;
  field: ControllerRenderProps<ResumeDataSchemaType, any>;
  type: FIELDTYPE;
  suggestions?: DeepPartial<ResumeSuggestionsSchemaType>;
}

type FieldInputProps = Omit<FieldBaseProps, "fieldPath">;
type ResumeFormFieldProps = Omit<FieldBaseProps, "field">;

const enum TEXT_STYLE {
  REWRITE = "rewrite",
  SHORTEN = "shorten",
  FORMAL = "formal",
  CASUAL = "casual",
}

const AI_FORMAT_STYLES = [
  {
    label: "Rewrite it",
    loadingLabel: "Rewriting...",
    style: TEXT_STYLE.REWRITE,
  },
  {
    label: "Shorten it",
    loadingLabel: "Shortening...",
    style: TEXT_STYLE.SHORTEN,
  },
  {
    label: "Make it formal",
    loadingLabel: "Making it formal...",
    style: TEXT_STYLE.FORMAL,
  },
  {
    label: "Make it casual",
    loadingLabel: "Making it casual...",
    style: TEXT_STYLE.CASUAL,
  },
];

function FieldInput({ type, field, fieldName, suggestions }: FieldInputProps) {
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
      handleChange(improvedField.value);
    }
  }, [improvedField?.value]);

  async function handleImprove(style?: TEXT_STYLE) {
    if (!suggestions || isLoading) return;

    setLoadingStates((prev) => ({ ...prev, [style || "rewrite"]: true }));

    try {
      await improveField({
        fieldContent: field.value,
        fieldName,
        suggestions,
        style,
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [style || "rewrite"]: false }));
    }
  }

  function handleChange(value: string) {
    if (type === FIELDTYPE.TEXTAREA) {
      field.onChange(value);
    }
  }

  const currentLoadingState = Object.keys(loadingStates).find(
    (key) => loadingStates[key as TEXT_STYLE],
  );

  if (type === FIELDTYPE.TEXTAREA) {
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
            <div
              className={cn([
                "group h-full w-full transition-all delay-700 duration-300 ease-in-out",
                "pointer-events-none opacity-0",
                {
                  "opacity-100 delay-0": !improvedField?.value,
                },
              ])}
              data-loading={!improvedField?.value}
            >
              <div className="flex h-full w-full flex-col gap-2 p-2">
                <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-[500ms] [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-2.75rem)]" />
                <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-[400ms] [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-1.5rem)]" />
                <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-300 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-1rem)]" />
                <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-200 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-2.75rem)]" />
                <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-200 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-2.75rem)]" />
                <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-100 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-1rem)]" />
                <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-300 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-3rem)]" />
                <Skeleton className="h-5 w-0 shrink-0 transition-[width] delay-100 [transition-duration:500ms] group-data-[loading=true]:w-[calc(100%-1.25rem)]" />
              </div>
            </div>
          </div>

          <Textarea
            {...field}
            className="max-h-64 min-h-64 resize-none transition-[height] duration-300 ease-in-out [field-sizing:content]"
          />
        </div>
        {improvedField?.suggestionsApplied && !isLoading && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="suggestions"
              className="rounded-md border-none bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/50 dark:to-pink-950/50"
            >
              <AccordionTrigger className="flex gap-2 px-4 py-2 text-sm font-medium text-violet-700 hover:no-underline dark:text-violet-300">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 shrink-0 fill-violet-500 dark:fill-violet-400" />
                  <span>AI improvements</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2">
                <MarkdownViewer
                  content={improvedField.suggestionsApplied}
                  className="text-sm dark:text-gray-300"
                  componentsClassName={{
                    ul: "space-y-2",
                    p: "mb-2",
                    li: "leading-relaxed",
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <div className="flex flex-wrap gap-2">
          {AI_FORMAT_STYLES.map(({ label, loadingLabel, style }) => {
            return (
              <MagicButton
                size="sm"
                onClick={() => handleImprove(style)}
                className="flex gap-2"
                theme="yellow"
                animate={loadingStates[style]}
                disabled={currentLoadingState !== style && isLoading}
                type="button"
              >
                <SparklesIcon className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
                <span>{loadingStates[style] ? loadingLabel : label}</span>
              </MagicButton>
            );
          })}
        </div>
      </div>
    );
  }

  return <Input {...field} value={field.value || ""} />;
}

export function ResumeFormField({
  fieldName,
  fieldPath,
  type,
  suggestions,
}: ResumeFormFieldProps) {
  const form = useFormContext<ResumeDataSchemaType>();

  return (
    <FormField
      key={fieldName}
      control={form.control}
      name={fieldPath as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </FormLabel>

          <FormControl>
            <FieldInput
              type={type}
              field={field}
              fieldName={fieldName}
              suggestions={suggestions}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function getFieldType(fieldName: string): FIELDTYPE {
  return (
    FIELD_CONFIGS[fieldName as keyof typeof FIELD_CONFIGS]?.type ||
    FIELDTYPE.TEXT
  );
}
