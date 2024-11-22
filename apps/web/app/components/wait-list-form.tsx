import { Button, Form, FormField, Input, useToast } from "@makefy/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@makefy/ui/lib/utils";
import { resendCreateContact } from "actions/resend-create-contact";

const waitListFormSchema = z.object({
  email: z.string().email(),
});

type WaitListFormProps = {
  className?: string;
};

export function WaitListForm({ className }: WaitListFormProps) {
  const waitListForm = useForm<z.infer<typeof waitListFormSchema>>({
    resolver: zodResolver(waitListFormSchema),
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof waitListFormSchema>) {
    const { data: resendData, error } = await resendCreateContact(data.email);
    toast({
      title: error
        ? "Ups something went wrong"
        : "We added you to the waitlist",
      description: error ? error?.message : "We'll be in touch soon",
    });

    if (resendData) {
      waitListForm.reset({ email: "" });
    }
  }

  return (
    <Form {...waitListForm}>
      <form
        className={cn("flex items-center gap-2", className)}
        onSubmit={waitListForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={waitListForm.control}
          name="email"
          render={({ field }) => (
            <Input
              type="email"
              placeholder="Email"
              className="border-neutral-800 bg-neutral-900/50"
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          className="relative transition-opacity hover:opacity-90"
          variant="outline"
          disabled={
            waitListForm.formState.isSubmitting ||
            !waitListForm.formState.isValid
          }
        >
          Subscribe{" "}
          {waitListForm.formState.isSubmitting && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          )}
          {!waitListForm.formState.isSubmitting && (
            <ArrowRight className="ml-2 h-4 w-4" />
          )}
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
        </Button>
      </form>
    </Form>
  );
}
