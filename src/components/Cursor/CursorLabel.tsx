"use client";

import { forwardRef } from "react";

const CursorLabel = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-0"
    />
  );
});

CursorLabel.displayName = "CursorLabel";

export default CursorLabel;