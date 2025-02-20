import { AIEnhancedTextarea } from "@/components/ai-enhanced-textarea/ai-enhanced-textarea";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@makefy/ui";
import { DeepPartial } from "ai";
import { useFormContext } from "react-hook-form";
import { ResumeDataSchemaTypeExtended } from "./resume-enhancer";

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
  // This field is used in the dialog form, so we need to use the form context
  const dialogForm = useFormContext<ResumeDataSchemaTypeExtended>();

  return (
    <FormField
      key={fieldName}
      control={dialogForm.control}
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
                fieldPath={fieldPath}
                suggestions={suggestions}
              />
            ) : (
              <Input {...field} value={field.value || ""} />
            )}
          </FormControl>
          <FormMessage />
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
