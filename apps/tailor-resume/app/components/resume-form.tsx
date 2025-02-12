"use client";

import {
  Button,
  Form,
  Skeleton
} from "@makefy/ui";
import {
  Edit2Icon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditResumeFieldDialog } from "./edit-resume-field-dialog";
import { ResumeImprovements } from "./resume-suggestions";

export interface ResumeFormData {
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
  suggestions?: ResumeImprovements;
}

// First, let's define the types for our editing field
export interface EditingField {
  title: string;
  fields: {
    [key: string]: string | undefined;
  };
  path?: string;
}

export function ResumeForm({ initialData, suggestions }: ResumeFormProps) {
  const [editingField, setEditingField] = useState<EditingField | null>(null);
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
        onClick={() =>
          setEditingField({
            title: `Experience at ${experience.company} as ${experience.title}`,
            fields: {
              title: experience.title,
              company: experience.company,
              period: experience.period,
              description: experience.description,
            },
            path: `experience.${index}`,
          })
        }
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
        onClick={() =>
          setEditingField({
            title: `Education`,
            fields: {
              degree: education.degree,
              school: education.school,
              year: education.year,
            },
            path: `education.${index}`,
          })
        }
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

  // Update click handlers to use the new structure
  const handleEdit = (
    title: string,
    fields: { [key: string]: string | undefined },
  ) => {
    setEditingField({ title, fields });
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
                  onClick={() =>
                    handleEdit("Personal Info", {
                      fullName: form.watch("fullName"),
                    })
                  }
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
                  onClick={() =>
                    handleEdit("Summary", { summary: form.watch("summary") })
                  }
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
                    onClick={() =>
                      handleEdit("Skills", {
                        skills: form.watch("skills") as unknown as string,
                      })
                    }
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
      </Form>

      <EditResumeFieldDialog
        open={!!editingField}
        onOpenChange={(open) => !open && setEditingField(null)}
        editingField={editingField}
        form={form}
        initialData={initialData}
        suggestions={suggestions}
      />
    </>
  );
}
