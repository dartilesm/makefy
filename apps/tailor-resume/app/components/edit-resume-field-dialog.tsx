import { EditingField } from "@/app/components/resume-data/resume-data";
import {
  getFieldType,
  ResumeFormField,
} from "@/app/components/resume-form-field";
import { ResumeDataSchemaType } from "@/schemas/resume-data.schema";
import { ResumeSuggestionsSchemaType } from "@/schemas/resume-suggestions.schema";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
} from "@makefy/ui";
import { DeepPartial } from "ai";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

interface EditResumeFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingField: EditingField | null;
  form: UseFormReturn<ResumeDataSchemaType>;
  suggestions?: DeepPartial<ResumeSuggestionsSchemaType>;
}

// Main Component
export function EditResumeFieldDialog({
  open,
  onOpenChange,
  editingField,
  form: parentForm,
  suggestions,
}: EditResumeFieldDialogProps) {
  // Create a temporary form for the dialog
  const dialogForm = useForm<ResumeDataSchemaType>({
    defaultValues: parentForm.getValues(),
  });

  const handleCancel = () => {
    if (!editingField) return;
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingField) return;

    // On submit, copy values from dialog form to parent form
    Object.entries(editingField.fields).forEach(([fieldName]) => {
      const path = editingField.path
        ? `${editingField.path}.${fieldName}`
        : fieldName;

      const newValue = dialogForm.getValues(path as any);
      parentForm.setValue(path as any, newValue);
    });

    onOpenChange(false);
  };

  // Initialize dialog form values when dialog opens
  useEffect(() => {
    if (open && editingField) {
      Object.entries(editingField.fields).forEach(([fieldName]) => {
        const path = editingField.path
          ? `${editingField.path}.${fieldName}`
          : fieldName;

        const currentValue = parentForm.getValues(path as any);
        dialogForm.setValue(path as any, currentValue);
      });
    }
  }, [open, editingField]);

  if (!editingField) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editingField.title}</DialogTitle>
        </DialogHeader>
        <Form {...dialogForm}>
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
