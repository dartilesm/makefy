"use server";

import { createSupabaseServer } from "@makefy/supabase/server";
export async function submitFeedback({
  type,
  message,
}: {
  type: string;
  message: string;
}) {
  if (!type || !message) {
    throw new Error("Type and message are required");
  }

  const supabase = createSupabaseServer();

  const { data, error } = await supabase.from("Feedback").insert({
    type,
    message,
  });

  console.log(data, error);
}
