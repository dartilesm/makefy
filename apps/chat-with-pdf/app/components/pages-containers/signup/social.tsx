"use client";

import React from "react";
import { IoLogoGithub } from "react-icons/io5";
import { Button, useToast } from "@makify/ui";
import { createSupabaseClient } from "@makify/supabase/client";

export function Social({ redirectTo }: { redirectTo: string }) {
  const { toast } = useToast();

  const loginWithProvider = async (provider: "github" | "google") => {
    const supbase = createSupabaseClient();
    const { error, data } = await supbase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo:
          window.location.origin + `/auth/callback?next=` + redirectTo,
      },
    });
    console.log({ data });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        className="flex h-8 w-full items-center gap-5"
        variant="outline"
        onClick={() => loginWithProvider("github")}
      >
        <IoLogoGithub />
        Github
      </Button>
      {/* <Button
        className="flex h-8 w-full items-center gap-2"
        variant="outline"
        onClick={() => loginWithProvider("google")}
      >
        <FcGoogle />
        Google
      </Button> */}
    </div>
  );
}
