"use server";

import { createSupabaseServer } from "@makefy/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type LoginProps = {
  email: string;
  password: string;
};

export async function login(loginData: LoginProps) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
