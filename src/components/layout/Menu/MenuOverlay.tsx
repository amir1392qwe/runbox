"use client";

import type { Dispatch, SetStateAction } from "react";

import MenuContent from "./MenuContent";

interface MenuOverlayProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MenuOverlay({
  open,
  setOpen,
}: MenuOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl transition-all duration-700 ${
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <MenuContent open={open} onNavigate={() => setOpen(false)} />
    </div>
  );
}