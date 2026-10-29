import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/actions/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentAdmin();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <AdminSidebar username={session.username} />
      <main className="flex-1 overflow-y-auto p-10">{children}</main>
    </div>
  );
}
