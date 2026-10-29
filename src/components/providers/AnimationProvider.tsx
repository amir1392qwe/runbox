"use client";

import { ReactNode } from "react";

import GSAPProvider from "./GSAPProvider";
import SmoothScroll from "./SmoothScroll";

interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({
  children,
}: AnimationProviderProps) {
  return (
    <GSAPProvider>
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </GSAPProvider>
  );
}