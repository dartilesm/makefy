"use client";

import {
  SidebarMenuAction,
  SidebarMenuButton,
} from "@makefy/ui/components/sidebar";
import { cn } from "@makefy/ui/lib/utils";
import {
  LaptopMinimalIcon,
  MoonIcon,
  Settings2Icon,
  SunIcon,
} from "lucide-react";
import { forwardRef } from "react";

const ThemeIconsMap = {
  system: LaptopMinimalIcon,
  light: SunIcon,
  dark: MoonIcon,
};

type MakefySidebarBottomMenuThemeItemProps = React.ComponentProps<"button"> & {
  theme: string | undefined;
  onClick?: () => void;
  className?: string;
};

export const MakefySidebarBottomMenuThemeItem = forwardRef<
  HTMLButtonElement,
  MakefySidebarBottomMenuThemeItemProps
>(function MakefySidebarBottomMenuThemeItem(
  { className, onClick = () => null, theme, ...props },
  ref,
) {
  const CurrentThemeIcon = ThemeIconsMap[theme as keyof typeof ThemeIconsMap];

  return (
    <SidebarMenuButton
      {...props}
      tooltip="Theme"
      onClick={onClick}
      ref={ref}
      className={cn("flex items-center justify-between gap-2", className)}
    >
      <span className="flex items-center justify-start gap-2">
        <CurrentThemeIcon className="h-4 w-4" />
        Theme
      </span>
      <SidebarMenuAction asChild className="relative top-0">
        <span>
          <Settings2Icon className="h-4 w-4" />
        </span>
      </SidebarMenuAction>
    </SidebarMenuButton>
  );
});
