export const dynamic = "force-dynamic";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-auto bg-section-alt p-8">{children}</main>
    </div>
  );
}
