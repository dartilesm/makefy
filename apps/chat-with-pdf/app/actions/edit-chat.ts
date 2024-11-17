"use server";

import { createSupabaseServer } from "@makefy/supabase/server";
import { Tables } from "@makefy/supabase/types";
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
