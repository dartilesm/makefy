import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import { FormControl, FormField, FormItem, FormLabel, Input } from "@makefy/ui";
import { useFormContext } from "react-hook-form";
import { DeepPartial } from "ai";
import { AIEnhancedTextarea } from "@/components/ai-enhanced-textarea/ai-enhanced-textarea";

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

interface ResumeFormFieldProps {
  fieldName: string;
  fieldPath: string;
  type: FIELDTYPE;
  suggestions?: DeepPartial<ResumeSuggestionsSchemaType>;
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
            {type === FIELDTYPE.TEXTAREA ? (
              <AIEnhancedTextarea
                field={field}
                fieldName={fieldName}
                suggestions={suggestions}
              />
            ) : (
              <Input {...field} value={field.value || ""} />
            )}
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
