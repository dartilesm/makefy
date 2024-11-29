"use client";

import { Button } from "@makefy/ui/components/button";
import Link from "next/link";
import { MessageSquareIcon, PenLineIcon } from "lucide-react";

type AppTileProps = {
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
};

const apps: AppTileProps[] = [
  {
    name: "Chat with PDF",
    description: "Chat with your PDF documents using AI",
    icon: MessageSquareIcon,
    href: process.env.NEXT_PUBLIC_MAKEFY_CHAT_WITH_PDF_URL!,
  },
  {
    name: "Text Tools",
    description: "Powerful text manipulation tools",
    icon: PenLineIcon,
    href: process.env.NEXT_PUBLIC_MAKEFY_TEXT_TOOLS_URL!,
  },
];

export function MakefyAppSelector() {
  function getSidebarWidth() {
    if (typeof window === "undefined") return "0rem";
    const makefySidebarWrapper = document.querySelector(
      "#makefy-sidebar-wrapper",
    );
    if (!makefySidebarWrapper) return "0rem";

    const bodyComputedStyle = getComputedStyle(makefySidebarWrapper);
    const sidebarWidth = bodyComputedStyle.getPropertyValue("--sidebar-width");
    console.log(sidebarWidth);
    return sidebarWidth;
  }

  console.log(getSidebarWidth());

  return (
    <div
      className="flex w-full max-w-[350px] flex-col gap-3 p-2"
      style={{ width: `calc(${getSidebarWidth()} - 1rem)` }}
    >
      {apps.map((app) => (
        <Button
          key={app.name}
          asChild
          variant="ghost"
          className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-auto p-2"
        >
          <Link href={app.href}>
            <div className="flex w-full items-center justify-between gap-2">
              <div className="bg-foreground text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <app.icon className="stroke-accent size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{app.name}</span>
              </div>
            </div>
          </Link>
        </Button>
      ))}
    </div>
  );
}
