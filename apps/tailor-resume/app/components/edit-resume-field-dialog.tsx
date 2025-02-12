import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form
} from "@makefy/ui";
import { UseFormReturn } from "react-hook-form";
import { EditingField, ResumeFormData } from "./resume-form";
import { ResumeFormField, getFieldType } from "./resume-form-field";
import { ResumeImprovements } from "./resume-suggestions";
interface EditResumeFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingField: EditingField | null;
  form: UseFormReturn<ResumeFormData>;
  initialData?: Partial<ResumeFormData>;
  suggestions?: ResumeImprovements;
}

const enum FIELDTYPE {
  TEXT = "text",
  TEXTAREA = "textarea",
  SKILLS = "skills",
}

// Field type configurations
const FIELD_CONFIGS = {
  description: { type: FIELDTYPE.TEXTAREA },
  summary: { type: FIELDTYPE.TEXTAREA },
  skills: {
    type: FIELDTYPE.SKILLS,
    placeholder: "Enter skills separated by commas",
  },
} as const;

// Helper Components
// Utility functions

function getOriginalValue(
  fieldName: string,
  path: string | undefined,
  initialData: Partial<ResumeFormData> | undefined,
): string | string[] | undefined {
  if (!path) {
    return initialData?.[fieldName as keyof ResumeFormData] as string | string[] | undefined;
  }

  // Split path into section (e.g. 'experience') and index (e.g. '0')
  const [section, indexStr] = path.split(".");
  const index = parseInt(indexStr);

  // Type-safe access to nested resume data:
  // 1. Access the section (e.g. experience, education)
  // 2. Access array item at index
  // 3. Access the specific field
  const sectionData = initialData?.[section as keyof ResumeFormData];
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  form={form}
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
