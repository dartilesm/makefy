"use server";

import { createSupabaseServer } from "@makify/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type LoginProps = {
  email: string;
  password: string;
};

export async function login(loginData: LoginProps) {
  const supabase = createSupabaseServer();

  const { error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
