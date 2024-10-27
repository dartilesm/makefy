import { Button, Form, FormField, Input } from "@makify/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

const waitListFormSchema = z.object({
  email: z.string().email(),
});

export function WaitListForm() {
  const waitListForm = useForm<z.infer<typeof waitListFormSchema>>({
    resolver: zodResolver(waitListFormSchema),
  });
  return (
    <Form {...waitListForm}>
      <form className="flex items-center gap-2">
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
        >
          Subscribe <ArrowRight className="ml-2 h-4 w-4" />
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
        </Button>
      </form>
    </Form>
  );
}
