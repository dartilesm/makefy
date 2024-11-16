"use client";

import { TextRotate } from "@/components/shared/text-rotate";
import { WaitListForm } from "@/components/wait-list-form";
import LogoHorizontal from "@/public/logo-horizontal.svg";
import { useEffect, useState } from "react";

const dynamicTexts = ["optimize it", "simplify it", "accelerate it"];

export default function Hero() {
  const [currentDynamicText, setCurrentDynamicText] = useState<string>(
    dynamicTexts[0]!,
  );

  useEffect(handleTextChange, []);

  function handleTextChange() {
    const timeout = setTimeout(() => {
      // Change the text incrementally
      setCurrentDynamicText((_currentDynamicText) => {
        const currentIndex = dynamicTexts.indexOf(_currentDynamicText);
        const nextIndex =
          currentIndex + 1 >= dynamicTexts.length ? 0 : currentIndex + 1;
        return dynamicTexts[nextIndex]!;
      });
      handleTextChange();
    }, 5000);

    return () => clearTimeout(timeout);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="z-10 flex w-full max-w-3xl flex-col justify-center px-5 xl:px-0">
        <div className="animate-in fade-in slide-in-from-bottom-10 flex aspect-square h-10 items-center justify-center rounded-md transition-colors duration-1000">
          <LogoHorizontal className="fill-accent-foreground h-full w-auto" />
        </div>
        <h1 className="animate-in fade-in slide-in-from-bottom-10 mt-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-4xl font-bold tracking-tighter text-transparent drop-shadow-sm duration-1000 [text-wrap:balance] md:text-6xl md:leading-[5rem]">
          Let AI{" "}
          <div className="relative inline-block">
            <div className="relative">
              <TextRotate className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent [text-shadow:_0_1px_10px_rgb(59_130_246_/_30%)]">
                {currentDynamicText}
              </TextRotate>
            </div>
          </div>
        </h1>
        <p
          className="animate-in fade-in slide-in-from-bottom-10 delay-250 mt-6 text-center text-gray-500 duration-1000 [text-wrap:balance] md:text-xl"
          style={{ animationFillMode: "forwards" }}
        >
          Makefy is a collection of tools with AI to make your life easier than
          ever. Join the waitlist to get early access.
        </p>
        <div className="animate-in fade-in slide-in-from-bottom-10 fill-mode-forwards mx-auto mt-6 flex items-center justify-center space-x-5 delay-300 duration-1000">
          <WaitListForm />
        </div>
      </div>
    </div>
  );
}
