"use client";

import { useState } from "react";
import { Package, Calendar, AlertTriangle, Plus, Download, Upload, TrendingUp, Truck } from "lucide-react";
import StockListTable from "@/components/inventory/StockListTable";
import ExpiryManagement from "@/components/inventory/ExpiryManagement";
import StockAlertsTable from "@/components/inventory/StockAlertsTable";
import ReorderSuggestions from "@/components/inventory/ReorderSuggestions";
import SupplierManagement from "@/components/portals/manager/inventory/SupplierManagement";
import { useAuthStore } from "@/stores/authStore";

type TabType = "stock-list" | "expiry" | "alerts" | "reorder" | "suppliers";

const tabs: { id: TabType; label: string; icon: any; isAI?: boolean }[] = [
  { id: "stock-list", label: "Stock List", icon: Package },
  { id: "expiry", label: "Expiry Management", icon: Calendar },
  { id: "alerts", label: "Stock Alerts", icon: AlertTriangle },
  { id: "reorder", label: "Reorder Suggestions", icon: TrendingUp, isAI: true },
  { id: "suppliers", label: "Suppliers", icon: Truck },
];

export default function ManagerInventoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("stock-list");
  const { user } = useAuthStore();

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Inventory Management</h1>
          <p className="text-neutral-500 mt-1">Manage stock, expiry, alerts, and suppliers</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-button text-neutral-700 hover:bg-neutral-50 transition-colors text-sm font-medium">
            <Upload size={16} />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-button text-neutral-700 hover:bg-neutral-50 transition-colors text-sm font-medium">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-yellow text-neutral-900 rounded-button font-medium hover:bg-primary-yellow-dark transition-colors text-sm">
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
            }`}
          >
            <tab.icon size={16} className={tab.isAI ? "text-primary-blue" : ""} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-card shadow-card p-6 min-h-[500px]">
        {activeTab === "stock-list" && <StockListTable />}
        {activeTab === "expiry" && <ExpiryManagement />}
        {activeTab === "alerts" && <StockAlertsTable />}
        {activeTab === "reorder" && <ReorderSuggestions />}
        {activeTab === "suppliers" && <SupplierManagement />}
      </div>
    </div>
  );
}
