import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@makefy/supabase/types/database";
import type { SupabaseClient } from "@makefy/supabase/types/supabase";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export async function createSupabaseServer(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  if (!cookieStore) {
    throw new Error("Missing cookie store");
  }

  // TODO: add types for example: SupabaseClient<Database>.
  // NOTE: it was removed since it was causing issues with the types.
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting error
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Handle cookie removal error
          }
        },
      },
    },
  );
}
