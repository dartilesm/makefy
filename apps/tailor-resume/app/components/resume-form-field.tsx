import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Textarea,
  Button,
  MagicButton,
  FormMessage,
  Alert,
  AlertTitle,
  AlertDescription,
  Skeleton,
} from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  improvedFieldSchema,
  ImprovedFieldSchemaType,
} from "@/schemas/improved-file.schema";
import { ResumeFormData } from "@/app/components/resume-data/resume-data";
import { ResumeImprovements } from "@/app/components/resume-suggestions/resume-suggestions";
import { useEffect, useState } from "react";

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

interface FormFieldProps {
  fieldName: string;
  fieldPath: string;
  type: FIELDTYPE;
  form: UseFormReturn<ResumeFormData>;
  suggestions?: ResumeImprovements;
}

const enum TEXT_STYLE {
  REWRITE = "rewrite",
  SHORTEN = "shorten",
  FORMAL = "formal",
  CASUAL = "casual",
}

function FieldInput({
  type,
  field,
  fieldName,
  suggestions,
}: {
  type: FIELDTYPE;
  field: any;
  fieldName: string;
  suggestions?: ResumeImprovements;
}) {
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
    // handleImprove();
  }, []);

  useEffect(() => {
    if (improvedField?.value) {
      handleChange(improvedField.value);
    }
  }, [improvedField?.value]);

  async function handleImprove(style?: TextStyle) {
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
    if (type === FIELDTYPE.SKILLS) {
      field.onChange(
        value
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      );
    }
  }

  const currentLoadingState = Object.keys(loadingStates).find(
    (key) => loadingStates[key as TextStyle],
  );

  if (type === FIELDTYPE.SKILLS) {
    return (
      <div className="relative">
        <Textarea
          {...field}
          className="max-h-96 min-h-8 transition-[height] duration-300 ease-in-out [field-sizing:content]"
          value={
            Array.isArray(field.value) ? field.value.join(", ") : field.value
          }
          onChange={(e) => handleChange(e.target.value)}
          placeholder={FIELD_CONFIGS.skills.placeholder}
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <Loader2Icon className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
    );
  }

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
            value={improvedField?.value || field.value}
            className="max-h-64 min-h-64 resize-none transition-[height] duration-300 ease-in-out [field-sizing:content]"
          />
        </div>
        <span>{improvedField?.suggestionsApplied}</span>
        <div className="flex flex-wrap gap-2">
          <MagicButton
            size="sm"
            onClick={() => handleImprove(TEXT_STYLE.REWRITE)}
            className="flex gap-2"
            theme="yellow"
            animate={loadingStates[TEXT_STYLE.REWRITE]}
            disabled={currentLoadingState !== TEXT_STYLE.REWRITE && isLoading}
            type="button"
          >
            <SparklesIcon className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
            <span>
              {loadingStates[TEXT_STYLE.REWRITE]
                ? "Rewriting..."
                : "Rewrite it"}
            </span>
          </MagicButton>
          <MagicButton
            size="sm"
            onClick={() => handleImprove(TEXT_STYLE.SHORTEN)}
            className="flex gap-2"
            theme="yellow"
            animate={loadingStates[TEXT_STYLE.SHORTEN]}
            disabled={currentLoadingState !== TEXT_STYLE.SHORTEN && isLoading}
            type="button"
          >
            <SparklesIcon className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
            <span>
              {loadingStates[TEXT_STYLE.SHORTEN]
                ? "Shortening..."
                : "Shorten it"}
            </span>
          </MagicButton>
          <MagicButton
            size="sm"
            onClick={() => handleImprove("formal")}
            className="flex gap-2"
            theme="yellow"
            animate={loadingStates[TEXT_STYLE.FORMAL]}
            disabled={currentLoadingState !== TEXT_STYLE.FORMAL && isLoading}
            type="button"
          >
            <SparklesIcon className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
            <span>
              {loadingStates[TEXT_STYLE.FORMAL]
                ? "Making it formal..."
                : "Make it formal"}
            </span>
          </MagicButton>
          <MagicButton
            size="sm"
            onClick={() => handleImprove(TEXT_STYLE.CASUAL)}
            className="flex gap-2"
            theme="yellow"
            animate={loadingStates[TEXT_STYLE.CASUAL]}
            disabled={currentLoadingState !== TEXT_STYLE.CASUAL && isLoading}
            type="button"
          >
            <SparklesIcon className="h-4 w-4 fill-yellow-600 stroke-yellow-600" />
            <span>
              {loadingStates[TEXT_STYLE.CASUAL]
                ? "Making it casual..."
                : "Make it casual"}
            </span>
          </MagicButton>
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
  form,
  suggestions,
}: FormFieldProps) {
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
