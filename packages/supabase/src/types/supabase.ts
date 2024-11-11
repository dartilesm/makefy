import { createServerClient } from "@supabase/ssr";
import type { Database } from "@makify/supabase/types/database";
import { createClient } from ".";

export type * from "@supabase/supabase-js";
export type SupabaseClient<T extends Database = Database> =
  | ReturnType<typeof createServerClient<T>>
  | ReturnType<typeof createClient<T>>;
