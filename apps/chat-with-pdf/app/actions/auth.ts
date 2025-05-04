"use server";

import { createSupabaseServer } from "@makefy/supabase/client/server";

export const verifyOtp = async (data: {
  email: string;
  otp: string;
  type: string;
}) => {
  const supabase = await createSupabaseServer();

  const res = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.otp,
    type: "email",
  });
  return JSON.stringify(res);
};
