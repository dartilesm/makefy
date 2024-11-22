"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
  redis: kv,
  // rate limit to 10 requests per 24 hours
  limiter: Ratelimit.slidingWindow(10, "24h"),
});

export async function resendCreateContact(email: string) {
  const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return {
      data: null,
      error: {
        message:
          "You already registered too many emails. Please try again later.",
      },
    };
  }

  const res = await resend.contacts.create({
    email,
    audienceId: process.env.RESEND_GENERAL_AUDIENCE_ID!,
  });
  return res;
}
