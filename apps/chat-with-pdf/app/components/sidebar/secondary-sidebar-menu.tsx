import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  MakefySidebarBottomMenu,
} from "@makefy/ui";
import { cn } from "@makefy/ui/lib/utils";
import { LaptopMinimalIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { FeedbackDialog } from "../header/feedback-dialog";

const ThemeIconsMap = {
  system: LaptopMinimalIcon,
  light: SunIcon,
  dark: MoonIcon,
};

const themeIconList = Object.keys(
  ThemeIconsMap,
) as (keyof typeof ThemeIconsMap)[];

export function SecondarySidebarMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <MakefySidebarBottomMenu>
      <FeedbackDialog triggerEl={<MakefySidebarBottomMenu.FeedbackItem />} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MakefySidebarBottomMenu.ThemeItem
            theme={theme as "system" | "light" | "dark"}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="end">
          {themeIconList.map((themeName) => {
            const ThemeIcon =
              ThemeIconsMap[themeName as keyof typeof ThemeIconsMap];
            return (
              <DropdownMenuItem
                key={themeName}
                className={cn("cursor-pointer", {
                  "bg-accent": theme === themeName,
                })}
                onClick={() => setTheme(themeName)}
              >
                <ThemeIcon className="h-4 w-4" />
                {themeName}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </MakefySidebarBottomMenu>
  );
}
