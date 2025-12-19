"use client";

import AdminSidebar from "@/components/portals/admin/AdminSidebar";
import AdminTopBar from "@/components/portals/admin/AdminTopBar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]} loadingColor="border-primary-blue">
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        <AdminSidebar />
        <AdminTopBar />
        <main className="flex-1 ml-24 pt-16 h-screen overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
