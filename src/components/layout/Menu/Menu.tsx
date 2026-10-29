"use client";

import { useState } from "react";

import Navbar from "../Navbar/Navbar";
import MenuOverlay from "./MenuOverlay";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar
        open={open}
        setOpen={setOpen}
      />

      <MenuOverlay
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}