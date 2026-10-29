"use client";

import { forwardRef } from "react";

import { CURSOR } from "./constants";

const CursorRing = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 rounded-full border border-white/40 backdrop-blur-sm transition-[border-color] duration-300"
      style={{
        width: CURSOR.RING_SIZE,
        height: CURSOR.RING_SIZE,
        zIndex: CURSOR.Z_RING,
      
      }}
    />
  );
});

CursorRing.displayName = "CursorRing";

export default CursorRing;