import Menu from "@/components/layout/Menu";
import Footer from "@/components/sections/Footer/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
}
