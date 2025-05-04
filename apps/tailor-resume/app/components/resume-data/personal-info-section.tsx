"use client";

import { EditingField } from "@/app/components/resume-data/resume-data";
import { useResume } from "@/app/contexts/resume-context";
import { Button } from "@makefy/ui";
import {
  Edit2Icon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

interface PersonalInfoSectionProps {
  onEdit: (field: EditingField) => void;
}

export function PersonalInfoSection({ onEdit }: PersonalInfoSectionProps) {
  const { resumeForm } = useResume();
  if (!resumeForm) return null;

  const { watch } = resumeForm;
  const personalInfo = watch("personalInfo");

  return (
    <div className="space-y-2">
      <div
        className="hover:bg-muted/50 group relative cursor-pointer rounded-lg py-2"
        onClick={() =>
          onEdit({
            title: "Personal Information",
            fields: {
              fullName: personalInfo.fullName,
              email: personalInfo.email,
              phone: personalInfo.phone,
              location: personalInfo.location,
              website: personalInfo.website,
            },
            path: "personalInfo",
          })
        }
      >
        <h1 className="text-2xl font-bold">{personalInfo.fullName}</h1>
        <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {personalInfo.email && (
            <span className="inline-flex items-center gap-1">
              <MailIcon className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="inline-flex items-center gap-1">
              <PhoneIcon className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="inline-flex items-center gap-1">
              <MapPinIcon className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="inline-flex items-center gap-1">
              <LinkIcon className="h-3 w-3" />
              {personalInfo.website}
            </span>
          )}
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
  );
}
