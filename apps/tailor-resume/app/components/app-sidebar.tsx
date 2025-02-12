"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sidebar,
  MakefySidebarAppSwitcher,
  MakefySidebarBottomMenu,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@makefy/ui";
import { useTheme } from "next-themes";
import { cn } from "@makefy/ui/lib/utils";
import { LaptopMinimalIcon, MoonIcon, SunIcon } from "lucide-react";
import Logo from "@/public/logo.svg";

const ThemeIconsMap = {
  system: LaptopMinimalIcon,
  light: SunIcon,
  dark: MoonIcon,
};

const themeIconList = Object.keys(ThemeIconsMap);
export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  return (
    <Sidebar className="z-20" collapsible="icon">
      <SidebarHeader className="transition-all duration-300 group-data-[collapsible=icon]:py-3">
        <MakefySidebarAppSwitcher
          icon={<Logo className="fill-accent h-auto w-5" />}
          name="Text Tools"
          href="/"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            {/* <SidebarMenuItem>
              <SidebarMenuButton>
                <Plus />
                <span>New conversation</span>
              </SidebarMenuButton>
            </SidebarMenuItem> */}
          </SidebarMenu>
        </SidebarGroup>
        <MakefySidebarBottomMenu>
          <MakefySidebarBottomMenu.FeedbackItem />
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
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
