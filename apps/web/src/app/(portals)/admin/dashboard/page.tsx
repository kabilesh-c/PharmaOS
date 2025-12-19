"use client";

import SystemHealthCard from "@/components/portals/admin/dashboard/SystemHealthCardV2";
import FinancialIntelligenceCard from "@/components/portals/admin/dashboard/FinancialIntelligenceCard";
import CrossStoreOverviewCard from "@/components/portals/admin/dashboard/CrossStoreOverviewCard";
import ApprovalQueueCard from "@/components/portals/admin/dashboard/ApprovalQueueCard";
import AdminMetricCards from "@/components/portals/admin/dashboard/AdminMetricCards";
import AISystemStatusCard from "@/components/portals/admin/dashboard/AISystemStatusCard";
import SystemAnnouncementsCard from "@/components/portals/admin/dashboard/SystemAnnouncementsCard";

export default function AdminDashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
          All Systems Operational
        </div>
      </div>

      <SystemAnnouncementsCard />

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
        {/* Row 1: System Health + AI System Status */}
        <div className="col-span-1 md:col-span-3 lg:col-span-5">
          <SystemHealthCard />
        </div>
        <div className="col-span-1 md:col-span-3 lg:col-span-7">
          <AISystemStatusCard />
        </div>

        {/* Row 2: Financial Intelligence + Cross-Store Overview */}
        <div className="col-span-1 md:col-span-3 lg:col-span-6">
          <FinancialIntelligenceCard />
        </div>
        <div className="col-span-1 md:col-span-3 lg:col-span-6">
          <CrossStoreOverviewCard />
        </div>

        {/* Row 3: Approval Queue (Full Width) */}
        <div className="col-span-1 md:col-span-6 lg:col-span-12">
          <ApprovalQueueCard />
        </div>

        {/* Row 4: Admin Metrics */}
        <div className="col-span-1 md:col-span-6 lg:col-span-12">
          <AdminMetricCards />
        </div>
      </div>
    </div>
  );
}
