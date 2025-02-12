import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input,
    Textarea,
    Button,
    FormMessage,
    Alert,
    AlertTitle,
    AlertDescription,
} from "@makefy/ui";
import { UseFormReturn } from "react-hook-form";
import { Loader2Icon, WandIcon } from "lucide-react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { improvedFieldSchema } from "@/schemas/improved-file.schema";
import { ResumeFormData } from "./resume-form";
import { ResumeImprovements } from "./resume-suggestions";
import { useEffect } from "react";

export const enum FIELDTYPE {
    TEXT = "text",
    TEXTAREA = "textarea",
    SKILLS = "skills",
}

export const FIELD_CONFIGS = {
    description: { type: FIELDTYPE.TEXTAREA },
    summary: { type: FIELDTYPE.TEXTAREA },
    skills: {
        type: FIELDTYPE.SKILLS,
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
    const { object: improvedField, submit: improveField, isLoading } = useObject({
        api: "/api/improve-resume-field",
        schema: improvedFieldSchema,
    });

    const handleImprove = async () => {
        if (!suggestions) return;

        await improveField({
            fieldContent: field.value,
            fieldName,
            suggestions,
        });
    };

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

    useEffect(() => {
        if (improvedField?.value) {
            handleChange(improvedField.value);
        }
    }, [improvedField?.value]);

    if (type === FIELDTYPE.SKILLS) {
        return (
            <div className="relative">
                <Textarea
                    {...field}
                    className="max-h-96 min-h-8 [field-sizing:content]"
                    value={Array.isArray(field.value) ? field.value.join(", ") : field.value}
                    onChange={(e) =>
                        handleChange(e.target.value)
                    }
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
            <div className="relative">
                {improvedField?.suggestionsApplied && (
                    <Alert>
                        <AlertTitle>Improvements Applied</AlertTitle>
                        <AlertDescription>{improvedField?.suggestionsApplied}</AlertDescription>
                    </Alert>
                )}
                <Textarea
                    {...field}
                    value={improvedField?.value || field.value}
                    className="max-h-96 min-h-8 pr-10 [field-sizing:content]"
                />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 opacity-70 hover:opacity-100"
                    onClick={handleImprove}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : (
                        <WandIcon className="h-4 w-4" />
                    )}
                </Button>
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