"use server";

import { getOAuthRedirectUrl } from "@/utils/oauth-redirect-url";
import { createSupabaseServer } from "@makefy/supabase/client/server";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";
import type { SignInWithOAuthCredentials } from "@makefy/supabase/types/supabase";
export async function signInWithOAuth(
  provider: SignInWithOAuthCredentials["provider"],
  searchParams: ReadonlyURLSearchParams,
) {
  const supabase = await createSupabaseServer();
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
