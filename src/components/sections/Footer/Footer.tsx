"use client";

import Container from "@/components/ui/Container";
import FooterContent from "./FooterContent";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030303]">
      <Container>
        <FooterContent />
      </Container>
    </footer>
  );
}