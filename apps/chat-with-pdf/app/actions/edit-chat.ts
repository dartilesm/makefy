"use server";

import { createSupabaseServer } from "@makify/supabase/server";
import { Tables } from "database.types";
import { revalidatePath, revalidateTag } from "next/cache";

export async function editChat(document: Tables<"Document">, title: string) {
  const supabase = createSupabaseServer();

  const { error } = await supabase
    .from("Document")
    .update({ name: title })
    .eq("id", document.id);

  if (error) throw error;

  revalidatePath(`/chat/${document.chatId}`);
  revalidatePath("/chat");
  revalidateTag("documents");
}
