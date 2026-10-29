"use client";

import CursorDot from "./CursorDot";

import useCursorGSAP from "./useCursorGSAP";

export default function Cursor() {
  const refs = useCursorGSAP();

  return <CursorDot ref={(el) => {
        refs.current.dot = el;
      }} />;
}