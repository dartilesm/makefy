import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@makify/supabase/types";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}

if (!process.env.SUPABASE_ADMIN) {
  throw new Error("Missing env.SUPABASE_ADMIN");
}

export function createSupabaseAdmin(): SupabaseClient {
  // TODO: add types for example: SupabaseClient<Database>.
  // NOTE: it was removed since it was causing issues with the types.
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ADMIN!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
