"use client";

import Image from "next/image";
import { SignUpForm } from "./signup-form";
import { Social } from "./social";
import Logo from "@/public/logo.svg";

export function SignUpContainer() {
  const queryString =
    typeof window !== "undefined" ? window?.location.search : "";
  const urlParams = new URLSearchParams(queryString);

  // Get the value of the 'next' parameter
  const next = urlParams.get("next");
  const verify = urlParams.get("verify");

  return (
    <div className="w-full rounded-md border shadow  sm:w-[26rem] sm:p-5 dark:border-zinc-800">
      <div className="space-y-5 p-5">
        <div className="space-y-3 text-center">
          <div className="bg-background mx-auto flex size-16 items-center justify-center overflow-hidden rounded-full p-2">
            <Logo />
          </div>
          <h1 className="font-bold">Create Account</h1>
          <p className="text-sm">
            Welcome! Please fill in the details to get started.
          </p>
        </div>
        <Social redirectTo={next || "/"} />
        <div className="flex items-center gap-5">
          <div className="h-[0.5px] w-full flex-1 bg-zinc-400 dark:bg-zinc-800"></div>
          <div className="text-sm">or</div>
          <div className="h-[0.5px] w-full flex-1 bg-zinc-400 dark:bg-zinc-800"></div>
        </div>
      </div>
      <SignUpForm redirectTo={next || "/"} />
    </div>
  );
}
