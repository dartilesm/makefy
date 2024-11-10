"use server";

import { getOAuthRedirectUrl } from "@/lib/oauth-redirect-url";
import { createSupabaseServer } from "@makify/supabase/server";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";
import type { SignInWithOAuthCredentials } from "@makify/supabase/types";
export async function signInWithOAuth(
  provider: SignInWithOAuthCredentials["provider"],
  searchParams: ReadonlyURLSearchParams,
) {
  const supabase = createSupabaseServer();
  const redirectTo = getOAuthRedirectUrl(searchParams);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error) {
    throw error;
  }

  if (data.url) {
    redirect(data.url);
  }
}
