import { createServerClient } from "@supabase/ssr";
import type { Database } from "@makify/supabase/types/database";

export type * from "@supabase/supabase-js";
export type SupabaseClient<T extends Database = Database> = ReturnType<
  typeof createServerClient<T>
>;
