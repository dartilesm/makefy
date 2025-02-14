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
import { forwardRef, useEffect, useState } from "react";

const ThemeIconsMap = {
  system: LaptopMinimalIcon,
  light: SunIcon,
  dark: MoonIcon,
};

type MakefySidebarBottomMenuThemeItemProps = React.ComponentProps<"button"> & {
  theme: keyof typeof ThemeIconsMap;
  onClick?: () => void;
  className?: string;
};

export const MakefySidebarBottomMenuThemeItem = forwardRef<
  HTMLButtonElement,
  MakefySidebarBottomMenuThemeItemProps
>(function MakefySidebarBottomMenuThemeItem(
  { className, onClick = () => null, theme = "system", ...props },
  ref,
) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        {/* Using isClient to prevent hydration error */}
        {isClient ? (
          <>
            <CurrentThemeIcon className="h-4 w-4" />
            Theme
          </>
        ) : <LaptopMinimalIcon className="h-4 w-4" />}
      </span>
      <SidebarMenuAction asChild className="relative top-0">
        <span>
          <Settings2Icon className="h-4 w-4" />
        </span>
      </SidebarMenuAction>
    </SidebarMenuButton>
  );
});
