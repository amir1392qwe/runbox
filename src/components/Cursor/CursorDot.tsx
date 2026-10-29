"use client";

import { forwardRef } from "react";

import { CURSOR } from "./constants";

const CursorDot = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 rounded-full bg-white"
      style={{
        width: CURSOR.DOT_SIZE,
        height: CURSOR.DOT_SIZE,
        zIndex: CURSOR.Z_DOT,
      }}
    />
  );
});

CursorDot.displayName = "CursorDot";

export default CursorDot;