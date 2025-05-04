import { Header } from "@/components/header/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { createSupabaseServer } from "@makefy/supabase/server";
import type { User } from "@makefy/supabase/types";
import { MakefySidebarWrapper } from "@makefy/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chats",
};

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <MakefySidebarWrapper
      sidebar={<AppSidebar userInfo={user as User} />}
      header={<Header />}
      direction="col"
    >
      {children}
    </MakefySidebarWrapper>
  );
}
