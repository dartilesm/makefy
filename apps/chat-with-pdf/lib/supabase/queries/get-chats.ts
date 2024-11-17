import type { SupabaseClient } from "@makefy/supabase/types";
import { unstable_cache } from "next/cache";
import { createSupabaseServer } from "@makefy/supabase/server";

async function retrieveChats(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("Chat").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function getChats() {
  const supabase = createSupabaseServer();
  const { data, error: errorOnFetchingSession } = await supabase.auth.getUser();

  if (errorOnFetchingSession) {
    throw errorOnFetchingSession;
  }

  const chats = unstable_cache(retrieveChats, [data.user.id || ""], {
    revalidate: 60 * 60,
    tags: ["chats", data.user.id || ""],
  })(supabase);

  return chats;
}
