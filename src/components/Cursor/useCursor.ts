"use client";

import { useEffect, useState } from "react";

import { CursorState } from "./types";

const INITIAL_STATE: CursorState = {
  x: 0,
  y: 0,

  ringX: 0,
  ringY: 0,

  hovered: false,
  visible: false,

  label: "",
};

export function useCursor() {
  const [cursor, setCursor] =
    useState<CursorState>(INITIAL_STATE);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursor((prev: CursorState) => ({
        ...prev,

        x: e.clientX,
        y: e.clientY,

        visible: true,
      }));
    };

    const leave = () => {
      setCursor((prev: CursorState) => ({
        ...prev,
        visible: false,
      }));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );

      window.removeEventListener(
        "mouseleave",
        leave
      );
    };
  }, []);

  return {
    cursor,
    setCursor,
  };
}