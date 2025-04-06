"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@makefy/ui";
import { MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EnhancedTextarea } from "../ai-enhanced-textarea/ai-textarea";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  EmailContentType,
  emailContentSchema,
} from "@/app/api/generate-email/route";
import { useEffect, useState } from "react";

const emailFormSchema = z.object({
  recipientEmail: z.string().email("Please enter a valid email address"),
  jobTitle: z.string().min(1, "Please enter a job title"),
  companyName: z.string().min(1, "Please enter a company name"),
  subject: z.string().min(1, "Please enter a subject"),
  body: z.string().min(1, "Please enter a message"),
});

type EmailFormData = z.infer<typeof emailFormSchema>;

export function EmailResumeDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      recipientEmail: "",
      jobTitle: "",
      companyName: "",
      subject: "",
      body: "",
    },
    mode: "onBlur",
  });

  const { submit: generateEmailTemplate, isLoading } =
    useObject<EmailContentType>({
      api: "/api/generate-email",
      schema: emailContentSchema,
      onFinish: ({ object }) => {
        if (!object) return;
        form.setValue("subject", object.subject);
        form.setValue("body", object.body);
      },
    });

  useEffect(() => {
    generateEmailTemplate({});
  }, []);

  const canSendEmail = form.formState.isValid;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-2"
          variant="ghost"
          variantColor="secondary"
          size="sm"
        >
          <MailIcon className="h-4 w-4" />
          Mail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Resume via Email</DialogTitle>
          <DialogDescription>
            Generate a professional email to send your resume to potential
            employers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
            <FormField
              control={form.control}
              name="recipientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Email</FormLabel>
                  <FormControl>
                    <Input placeholder="hiring@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Job Application - {jobTitle}"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <EnhancedTextarea
                      field={field}
                      isLoading={isLoading}
                      isInvalid={form.formState.errors.body !== undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={!canSendEmail}
                className="w-full sm:w-auto"
              >
                Generate Email
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
