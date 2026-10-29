"use client";

import { ReactNode } from "react";

export default function GSAPProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}