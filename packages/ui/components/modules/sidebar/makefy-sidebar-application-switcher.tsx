import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@makefy/ui/components/sidebar";

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
        <SidebarMenuButton size="lg" asChild>
          <Link href={href}>
            <div className="bg-foreground text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
              {icon}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{name}</span>
              <span className="truncate text-xs">by Makefy ✨</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
