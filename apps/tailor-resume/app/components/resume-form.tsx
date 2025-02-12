"use client";

import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Textarea,
  Card,
  CardContent,
  Skeleton,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@makefy/ui";
import { useForm } from "react-hook-form";
import {
  Edit2Icon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  LinkIcon,
} from "lucide-react";

interface ResumeFormData {
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  website?: string;
  summary: string;
  experience: {
    title: string;
    company: string;
    description: string;
    period?: string;
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  skills: string[];
}

interface ResumeFormProps {
  initialData?: Partial<ResumeFormData>;
}

export function ResumeForm({ initialData }: ResumeFormProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const form = useForm<ResumeFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
      experience: [],
      education: [],
      skills: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as keyof ResumeFormData, value);
        }
      });
    }
  }, [initialData, form]);

  const isLoading = !initialData;

  const ContactInfo = () => {
    const location = form.watch("location");
    const email = form.watch("email");
    const phone = form.watch("phone");
    const website = form.watch("website");

    if (!location && !email && !phone && !website) return null;

    return (
      <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
        {location && (
          <div className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4" />
            <span>{location}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-1">
            <MailIcon className="h-4 w-4" />
            <span>{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-1">
            <PhoneIcon className="h-4 w-4" />
            <span>{phone}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-1">
            <LinkIcon className="h-4 w-4" />
            <span>{website}</span>
          </div>
        )}
      </div>
    );
  };

  const ExperienceSection = ({
    experience,
    index,
  }: {
    experience: ResumeFormData["experience"][0];
    index: number;
  }) => {
    if (!experience.title && !experience.company && !experience.description)
      return null;

    return (
      <div
        className="hover:bg-muted/50 group relative space-y-1 rounded-lg py-2"
        onClick={() => setEditingField(`experience.${index}`)}
      >
        <div className="flex items-baseline justify-between">
          <div className="font-medium">{experience.title}</div>
          <div className="text-muted-foreground text-sm">
            {experience.company}
            {experience.period && ` • ${experience.period}`}
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          {experience.description}
        </p>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
        >
          <Edit2Icon className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const EducationSection = ({
    education,
    index,
  }: {
    education: ResumeFormData["education"][0];
    index: number;
  }) => {
    if (!education.degree && !education.school && !education.year) return null;

    return (
      <div
        className="hover:bg-muted/50 group relative rounded-lg py-2"
        onClick={() => setEditingField(`education.${index}`)}
      >
        <div className="flex items-baseline justify-between">
          <div className="font-medium">{education.degree}</div>
          <div className="text-muted-foreground text-sm">
            {education.school} • {education.year}
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
        >
          <Edit2Icon className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <>
      <Form {...form}>
        <div className="space-y-8">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <>
              <div className="group relative space-y-2">
                <div
                  className="hover:bg-muted/50 cursor-pointer rounded-lg"
                  onClick={() => setEditingField("fullName")}
                >
                  <h1 className="text-2xl font-bold">
                    {form.watch("fullName")}
                  </h1>
                </div>
                <ContactInfo />
              </div>

              {form.watch("summary") && (
                <div
                  className="hover:bg-muted/50 group relative cursor-pointer rounded-lg"
                  onClick={() => setEditingField("summary")}
                >
                  <p className="text-muted-foreground">
                    {form.watch("summary")}
                  </p>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                  >
                    <Edit2Icon className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {form.watch("experience")?.length > 0 && (
                <div>
                  <h2 className="mb-2 text-lg font-semibold">Experience</h2>
                  <div className="space-y-4">
                    {form.watch("experience").map((exp, i) => (
                      <ExperienceSection key={i} experience={exp} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {form.watch("education")?.length > 0 && (
                <div>
                  <h2 className="mb-2 text-lg font-semibold">Education</h2>
                  <div className="space-y-4">
                    {form.watch("education").map((edu, i) => (
                      <EducationSection key={i} education={edu} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {form.watch("skills")?.length > 0 && (
                <div>
                  <h2 className="mb-2 text-lg font-semibold">Skills</h2>
                  <div
                    className="hover:bg-muted/50 group relative cursor-pointer rounded-lg"
                    onClick={() => setEditingField("skills")}
                  >
                    <div className="flex flex-wrap gap-2">
                      {form.watch("skills").map((skill, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 rounded-full px-3 py-1 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                    >
                      <Edit2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <Dialog
          open={!!editingField}
          onOpenChange={() => setEditingField(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editingField}</DialogTitle>
            </DialogHeader>
            {editingField && (
              <FormField
                control={form.control}
                name={editingField as any}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {editingField === "summary" ? (
                        <Textarea {...field} className="min-h-[8rem]" />
                      ) : editingField === "skills" ? (
                        <Textarea
                          {...field}
                          value={field.value?.join(", ") || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                .split(",")
                                .map((skill) => skill.trim())
                                .filter(Boolean),
                            )
                          }
                          placeholder="Enter skills separated by commas"
                        />
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </DialogContent>
        </Dialog>
      </Form>
    </>
  );
}
