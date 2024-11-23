"use server";

import { createSupabaseServer } from "@makefy/supabase/server";
import { Tables } from "@makefy/supabase/types";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteChat(
  chatId: Tables<"Chat">["id"],
  shouldRedirect = true,
) {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("Chat")
    .delete()
    .eq("id", chatId)
    .select("id");

  if (error) return { error };

  revalidateTag("documents");
  revalidatePath("/chat");

  if (!shouldRedirect) return { error: null };

  const { data: firstDocument } = await supabase
    .from("Document")
    .select("chatId")
    .single();

  if (firstDocument?.chatId) redirect(`/chat/${firstDocument.chatId}`);

  redirect("/chat");
}
