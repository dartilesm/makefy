"use server";

import { createSupabaseServer } from "@makify/supabase/server";
import { Tables } from "@makify/supabase/types";
import { revalidatePath } from "next/cache";

type UpdateChatMessagesParams = {
  documentId: string;
  messages?: Tables<"Chat">["messages"];
  documentMetadata?: Tables<"Chat">["documentMetadata"];
};

export async function updateChatMessages({
  documentId,
  messages,
  documentMetadata,
}: UpdateChatMessagesParams) {
  const supabase = createSupabaseServer();

  await supabase
    .from("Chat")
    .update({
      messages,
      documentMetadata,
    })
    .eq("id", documentId);

  revalidatePath(`/chat/${documentId}`, "page");
}
