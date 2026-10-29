"use client";

import { ReactNode } from "react";

import AnimationProvider from "./AnimationProvider";
import Cursor from "@/components/Cursor";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AnimationProvider>
      <Cursor />
      {children}
    </AnimationProvider>
  );
}