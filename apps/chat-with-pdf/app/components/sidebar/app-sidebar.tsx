"use client";

import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SparklesIcon,
  SquareTerminal,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@makify/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@makify/ui/components/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@makify/ui/components/sidebar";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import RecentConversationsSidebarGroup from "./recent-conversation-sidebar-group";
import { SecondarySidebarMenu } from "./secondary-sidebar-menu";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { NewDocumentDialog } from "@/components/header/document-title/new-document-dialog/new-document-dialog";
import { useState } from "react";

export function AppSidebar({ userInfo }: { userInfo: User }) {
  const router = useRouter();
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);

  function handleNewChatDialogToggle() {
    setIsNewChatDialogOpen(!isNewChatDialogOpen);
  }

  function getAvatarFallback() {
    if (!userInfo) return "";
    const userFullName =
      userInfo.user_metadata?.full_name || userInfo.user_metadata?.name;
    const userEmail = userInfo.email;
    const userFallback = (userFullName || userEmail)?.toUpperCase();

    return userFallback
      ?.split(" ")
      .map((name: string) => name[0])
      .join("");
  }

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
  }

  return (
    <>
      <Sidebar className="z-20" collapsible="icon">
        <SidebarHeader className="transition-all duration-300 group-data-[collapsible=icon]:py-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="bg-foreground text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                    <Logo className="fill-accent h-auto w-5" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Chat with PDF
                    </span>
                    <span className="truncate text-xs">by Makify ✨</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="New conversation"
                  variant="outline"
                  onClick={() => handleNewChatDialogToggle(true)}
                >
                  <Plus />
                  <span>New conversation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <RecentConversationsSidebarGroup />
          <SecondarySidebarMenu />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={userInfo?.user_metadata?.avatar_url}
                        alt={userInfo?.user_metadata?.full_name}
                      />
                      <AvatarFallback className="rounded-lg">
                        {getAvatarFallback()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {userInfo?.user_metadata?.full_name ||
                          userInfo?.user_metadata?.name ||
                          "Unknown User"}
                      </span>
                      <span className="truncate text-xs">
                        {userInfo?.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="right"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={userInfo?.user_metadata?.avatar_url}
                          alt={userInfo?.user_metadata?.full_name}
                        />
                        <AvatarFallback className="rounded-lg">
                          {getAvatarFallback()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {userInfo?.user_metadata?.full_name ||
                            userInfo?.user_metadata?.name ||
                            "Unknown User"}
                        </span>
                        <span className="truncate text-xs">
                          {userInfo?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem disabled>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem disabled>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <NewDocumentDialog
        isOpen={isNewChatDialogOpen}
        onOpenChange={handleNewChatDialogToggle}
      />
    </>
  );
}
