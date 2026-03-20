export const dynamic = "force-dynamic";

import { PortalSidebar } from "@/components/portal/PortalSidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <PortalSidebar />
      <main className="flex-1 bg-section-alt p-8">{children}</main>
    </div>
  );
}
