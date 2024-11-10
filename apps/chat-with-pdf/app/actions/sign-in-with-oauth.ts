"use server";

import { getOAuthRedirectUrl } from "@/lib/oauth-redirect-url";
import { createSupabaseServer } from "@makify/supabase/server";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";

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
