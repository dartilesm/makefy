import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { unstable_cache } from "next/cache";
import { createSupabaseServer } from "@makify/supabase";
/* import { supabase } from "@makify/supabase"; */

async function retrieveChats(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("Chat").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function getChats() {
  const supabase = createSupabaseServer();
  /* const supabase = createClient(); */
  /* const supabase = */
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
