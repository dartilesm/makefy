"use client";

import { useResume } from "@/app/contexts/resume-context";
import { experimental_useObject as useObject } from "@ai-sdk/react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@makefy/ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EnhancedTextarea } from "../ai-enhanced-textarea/ai-textarea";
import {
  EmailContentSchemaType,
  emailContentSchema,
} from "@/schemas/email-content-schema";

const EMAIL_FORM_TABS = {
  DETAILS: "Details",
  TEMPLATE: "Template",
};

const emailFormSchema = z.object({
  recipientEmail: z.string().email("Please enter a valid email address"),
  jobTitle: z.string().min(1, "Please enter a job title"),
  companyName: z.string().min(1, "Please enter a company name"),
  subject: z.string().min(1, "Please enter a subject"),
  body: z.string().min(1, "Please enter a message"),
});

type EmailFormData = z.infer<typeof emailFormSchema>;

export function EmailResumeDialog({ trigger }: { trigger: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const { jobInfo } = useResume();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      recipientEmail: "",
      jobTitle: jobInfo?.jobTitle || "",
      companyName: "",
      subject: "",
      body: "",
    },
    mode: "onBlur",
  });

  const { submit: generateEmailTemplate, isLoading } =
    useObject<EmailContentSchemaType>({
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
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {isOpen && (
        <DialogContent className="flex  flex-col sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Send Resume via Email</DialogTitle>
            <DialogDescription>
              Generate a professional email to send your resume to potential
              employers.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {})}
              className="flex flex-1 flex-col justify-between gap-2"
            >
              <Tabs defaultValue={EMAIL_FORM_TABS.DETAILS}>
                <TabsList className="mb-4 w-full">
                  {Object.values(EMAIL_FORM_TABS).map((tab) => (
                    <TabsTrigger key={tab} value={tab} className="w-full">
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent
                  value={EMAIL_FORM_TABS.DETAILS}
                  className="min-h-[450px] overflow-auto"
                >
                  <FormField
                    control={form.control}
                    name="recipientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Email *</FormLabel>
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
                        <FormLabel>Job Title *</FormLabel>
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
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent
                  value={EMAIL_FORM_TABS.TEMPLATE}
                  className="min-h-[450px] overflow-auto"
                >
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
                            {...field}
                            isLoading={isLoading}
                            aria-invalid={
                              form.formState.errors.body !== undefined
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

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
      )}
    </Dialog>
  );
}
