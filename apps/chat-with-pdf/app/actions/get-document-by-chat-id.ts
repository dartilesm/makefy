"use server";

import { unstable_cache } from "next/cache";
import { createSupabaseServer } from "@makefy/supabase/server";
import type { SupabaseClient } from "@makefy/supabase/types";

async function retrieveDocumentByChatId(
  supabase: SupabaseClient,
  chatId: string,
) {
  const { data: document, error: errorOnFetchingDocument } = await supabase
    .from("Document")
    .select("*")
    .eq("chatId", chatId)
    .single();

  if (errorOnFetchingDocument) {
    throw errorOnFetchingDocument;
  }

  return document;
}

export async function getDocumentByChatId(chatId: string) {
  const supabase = await createSupabaseServer();
  const { data, error: errorOnFetchingSession } = await supabase.auth.getUser();

  if (errorOnFetchingSession) {
    throw errorOnFetchingSession;
  }

  const document = unstable_cache(
    (supabase: SupabaseClient) => retrieveDocumentByChatId(supabase, chatId),
    [data.user.id || "", chatId],
    {
      revalidate: 60 * 60,
      tags: ["document", data?.user?.id || "", chatId],
    },
  )(supabase);

  return document;
}
