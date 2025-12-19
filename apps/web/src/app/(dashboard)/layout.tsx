"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, ShoppingCart, Package, BarChart3, Settings, Zap } from "lucide-react";
import Sidebar, { NavItem } from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { useAuthStore, UserRole } from "@/stores/authStore";

// Define page access by role
const PAGE_ACCESS: Record<string, UserRole[]> = {
  "/dashboard": ["ADMIN", "MANAGER", "PHARMACIST"],
  "/pos": ["ADMIN", "MANAGER", "PHARMACIST"],
  "/inventory": ["ADMIN", "MANAGER", "PHARMACIST"],
  "/analytics": ["ADMIN", "MANAGER"],
  "/automation": ["ADMIN", "MANAGER"],
  "/settings": ["ADMIN", "MANAGER"],
};

const navItems: NavItem[] = [
  { icon: Home, href: "/dashboard", label: "Dashboard" },
  { icon: ShoppingCart, href: "/pos", label: "POS" },
  { icon: Package, href: "/inventory", label: "Inventory" },
  { icon: BarChart3, href: "/analytics", label: "Analytics" },
  { icon: Zap, href: "/automation", label: "Automation" },
  { icon: Settings, href: "/settings", label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Check page access
    const allowedRoles = PAGE_ACCESS[pathname];
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to dashboard if not authorized for this page
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, pathname, router]);

  // Show nothing while checking auth
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Check access for current page
  const allowedRoles = PAGE_ACCESS[pathname];
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Filter nav items based on role
  const visibleNavItems = navItems.filter(item => {
    // Simple logic: if role is pharmacist, hide analytics/automation/settings if they are not allowed
    // But here we can just pass all and let the sidebar handle it? No, Sidebar doesn't filter anymore.
    // So we filter here.
    if (user.role === "PHARMACIST") {
      return ["/dashboard", "/pos", "/inventory"].includes(item.href);
    }
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-cream-100">
      <Sidebar navItems={visibleNavItems} role={user.role} />
      <TopBar />
      <main className="flex-1 ml-24 pt-16 h-screen overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );

}
