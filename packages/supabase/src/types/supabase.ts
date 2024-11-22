import { createServerClient } from "@supabase/ssr";
import type { Database } from "@makefy/supabase/types/database";
import { createClient } from "@supabase/supabase-js";

export type * from "@supabase/supabase-js";
export type SupabaseClient<T extends Database = Database> = ReturnType<
  typeof createServerClient<T>
>;

export type SupabaseAdminClient<T extends Database = Database> = ReturnType<
  typeof createClient<T>
>;
