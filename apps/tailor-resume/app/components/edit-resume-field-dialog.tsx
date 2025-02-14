import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
} from "@makefy/ui";
import { UseFormReturn } from "react-hook-form";
import { EditingField } from "@/app/components/resume-data/resume-data";
import {
  ResumeFormField,
  getFieldType,
} from "@/app/components/resume-form-field";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
interface EditResumeFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingField: EditingField | null;
  form: UseFormReturn<ResumeDataSchemaType>;
  initialData?: Partial<ResumeDataSchemaType>;
  suggestions?: ResumeSuggestionsSchemaType;
}

const enum FIELDTYPE {
  TEXT = "text",
  TEXTAREA = "textarea",
  SKILLS = "skills",
}

function getOriginalValue(
  fieldName: string,
  path: string | undefined,
  initialData: Partial<ResumeDataSchemaType> | undefined,
): string | string[] | undefined {
  if (!path) {
    return initialData?.[fieldName as keyof ResumeDataSchemaType] as
      | string
      | string[]
      | undefined;
  }

  // Split path into section (e.g. 'experience') and index (e.g. '0')
  const [section, indexStr] = path.split(".");
  const index = parseInt(indexStr || "0");

  // Type-safe access to nested resume data:
  // 1. Access the section (e.g. experience, education)
  // 2. Access array item at index
  // 3. Access the specific field
  const sectionData = initialData?.[section as keyof ResumeDataSchemaType];
  const arrayItem = Array.isArray(sectionData) ? sectionData[index] : undefined;
  const fieldValue = arrayItem?.[fieldName as keyof typeof arrayItem];

  return fieldValue as string | string[] | undefined;
}

// Main Component
export function EditResumeFieldDialog({
  open,
  onOpenChange,
  editingField,
  form,
  initialData,
  suggestions,
}: EditResumeFieldDialogProps) {
  const handleCancel = () => {
    if (!editingField) return;

    // Reset fields to their original values
    Object.entries(editingField.fields).forEach(([fieldName]) => {
      const path = editingField.path
        ? `${editingField.path}.${fieldName}`
        : fieldName;

      const originalValue = getOriginalValue(
        fieldName,
        editingField.path,
        initialData,
      );

      if (originalValue !== undefined) {
        form.setValue(path as any, originalValue);
      }
    });
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
  };

  if (!editingField) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingField.title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            autoComplete="off"
          >
            {Object.entries(editingField.fields).map(([fieldName]) => {
              const fullPath = editingField.path
                ? `${editingField.path}.${fieldName}`
                : fieldName;

              return (
                <ResumeFormField
                  key={fieldName}
                  fieldName={fieldName}
                  fieldPath={fullPath}
                  type={getFieldType(fieldName)}
                  suggestions={suggestions}
                />
              );
            })}

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
