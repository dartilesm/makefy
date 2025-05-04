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

const themeIconList = Object.keys(ThemeIconsMap);

export function SecondarySidebarMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <MakefySidebarBottomMenu>
      <FeedbackDialog triggerEl={<MakefySidebarBottomMenu.FeedbackItem />} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MakefySidebarBottomMenu.ThemeItem theme={theme} />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="end">
          {themeIconList.map((themeIcon) => {
            const ThemeIcon =
              ThemeIconsMap[themeIcon as keyof typeof ThemeIconsMap];
            return (
              <DropdownMenuItem
                key={themeIcon}
                className={cn("cursor-pointer", {
                  "bg-accent": theme === themeIcon,
                })}
                onClick={() => setTheme(themeIcon)}
              >
                <ThemeIcon className="h-4 w-4" />
                {themeIcon}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </MakefySidebarBottomMenu>
  );
}
