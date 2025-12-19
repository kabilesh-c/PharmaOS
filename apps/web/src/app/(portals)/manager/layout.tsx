"use client";

import ManagerSidebar from "@/components/portals/manager/ManagerSidebar";
import ManagerTopBar from "@/components/portals/manager/ManagerTopBar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["MANAGER"]} loadingColor="border-primary-yellow">
      <div className="flex h-screen overflow-hidden bg-cream-100">
        <ManagerSidebar />
        <ManagerTopBar />
        <main className="flex-1 ml-24 pt-16 h-screen overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
