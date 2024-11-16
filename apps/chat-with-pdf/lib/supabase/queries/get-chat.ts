import { generateSuggestedQuestions } from "@/app/actions/generate-suggested-questions";
import { createSupabaseServer } from "@makify/supabase/server";
import type { SupabaseClient } from "@makify/supabase/types";
import { unstable_cache } from "next/cache";

async function retrieveChat(supabase: SupabaseClient, id: string) {
  const { data: chatData, error: chatError } = await supabase
    .from("Chat")
    .select("*")
    .eq("id", id)
    .single();

  if (chatError) {
    throw chatError;
  }

  return chatData;
}

async function generateAndUpdateSuggestedQuestions(
  supabase: SupabaseClient,
  id: string,
) {
  const result = await generateSuggestedQuestions(id);

  if (!result?.questions) {
    return null;
  }

  const { error: updateError } = await supabase
    .from("Chat")
    .update({ suggestedQuestions: result.questions })
    .eq("id", id)
    .select();

  if (updateError) {
    throw updateError;
  }

  return result.questions;
}

export async function getChat(id: string) {
  const supabase = createSupabaseServer();
  const { data, error: errorOnFetchingSession } = await supabase.auth.getUser();

  if (errorOnFetchingSession) {
    throw errorOnFetchingSession;
  }

  const chat = await unstable_cache(
    (supabase: SupabaseClient) => retrieveChat(supabase, id),
    [data.user.id || "", id],
    {
      revalidate: 60 * 60,
      tags: ["chat", data.user.id || "", id],
    },
  )(supabase);

  console.log({ chat, id });
  if (!chat?.suggestedQuestions) {
    const suggestedQuestions = await generateAndUpdateSuggestedQuestions(
      supabase,
      id,
    );
    return { ...chat, suggestedQuestions };
  }

  return chat;
}
