"use client";

import InventoryHealthCard from "@/components/portals/manager/dashboard/InventoryHealthCard";
import AIRecommendationsCard from "@/components/portals/manager/dashboard/AIRecommendationsCard";
import PendingApprovalsCard from "@/components/portals/manager/dashboard/PendingApprovalsCardV2";
import StaffTaskWidget from "@/components/portals/manager/dashboard/StaffTaskWidget";
import ManagerMetricCards from "@/components/portals/manager/dashboard/ManagerMetricCards";

export default function ManagerDashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900">Manager Dashboard</h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary-yellow/20 text-primary-yellow-dark rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
          Main Branch
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Row 1: Inventory Health + AI Recommendations */}
        <div className="col-span-5">
          <InventoryHealthCard />
        </div>
        <div className="col-span-7">
          <AIRecommendationsCard />
        </div>

        {/* Row 2: Pending Approvals + Staff Tasks */}
        <div className="col-span-7">
          <PendingApprovalsCard />
        </div>
        <div className="col-span-5">
          <StaffTaskWidget />
        </div>

        {/* Row 3: Metrics */}
        <div className="col-span-12">
          <ManagerMetricCards />
        </div>
      </div>
    </div>
  );
}
