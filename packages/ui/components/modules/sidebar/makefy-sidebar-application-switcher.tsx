import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@makefy/ui";
import { ChevronDownIcon, LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import { MakefyAppSelector } from "./makefy-app-selector";

type MakefySidebarAppSwitcherProps = {
  icon: React.ReactNode;
  name: string;
  href: string;
};

export function MakefySidebarAppSwitcher({
  icon,
  name,
  href,
}: MakefySidebarAppSwitcherProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-foreground text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                  {icon}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">by Makefy ✨</span>
                </div>
              </div>
              <span>
                <ChevronDownIcon className="text-muted-foreground size-5" />
              </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0">
            <MakefyAppSelector />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
