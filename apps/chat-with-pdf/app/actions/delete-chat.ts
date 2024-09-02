"use server";

import { supabase } from "@/lib/supabase";
import { Tables } from "database.types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

async function deleteChat(chat: Tables<"Chat">) {
  supabase.from("Chat").delete().eq("id", chat.id).select("id");
}

async function deleteDocumentFile(chat: Tables<"Chat">) {
  if (chat.documentUrl?.includes(process.env.SUPABASE_URL as string)) {
    return supabase.storage.from("documents").remove([`${chat.id}.pdf`]);
  }
  return null;
}

export async function deleteChatAndDependencies(
  chat: Tables<"Chat">,
  shouldRedirect = true,
) {
  await Promise.all([deleteChat(chat), deleteDocumentFile(chat)]);

  revalidateTag("chats");
  revalidatePath("/chat");

  if (!shouldRedirect) return;

  const { data: firstChat } = await supabase.from("Chat").select("id").single();

  if (firstChat?.id) return redirect(`/chat/${firstChat.id}`);
  redirect("/chat");
}
