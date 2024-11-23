import type { SupabaseClient } from "@makefy/supabase/types";
import { unstable_cache } from "next/cache";
import { createSupabaseServer } from "@makefy/supabase/server";

async function retrieveDocuments(supabase: SupabaseClient) {
  const { data: documents, error: errorOnFetchingDocuments } = await supabase
    .from("Document")
    .select("*");

  if (errorOnFetchingDocuments) {
    throw errorOnFetchingDocuments;
  }

  return documents;
}

export async function getDocuments() {
  const supabase = await createSupabaseServer();
  const { data, error: errorOnFetchingSession } = await supabase.auth.getUser();

  if (errorOnFetchingSession) {
    throw errorOnFetchingSession;
  }

  const documents = unstable_cache(retrieveDocuments, [data.user.id || ""], {
    revalidate: 60 * 60,
    tags: ["documents", data?.user?.id || ""],
  })(supabase);

  return documents;
}
