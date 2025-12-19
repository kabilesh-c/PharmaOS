"use client";

import { useState } from "react";
import { Package, Calendar, AlertTriangle, Plus, Download, Upload, TrendingUp } from "lucide-react";
import StockListTable from "@/components/inventory/StockListTable";
import ExpiryManagement from "@/components/inventory/ExpiryManagement";
import StockAlertsTable from "@/components/inventory/StockAlertsTable";
import ReorderSuggestions from "@/components/inventory/ReorderSuggestions";
import { useAuthStore } from "@/stores/authStore";

type TabType = "stock-list" | "expiry" | "alerts" | "reorder";

const tabs: { id: TabType; label: string; icon: typeof Package; isAI?: boolean }[] = [
  { id: "stock-list", label: "Stock List", icon: Package },
  { id: "expiry", label: "Expiry Management", icon: Calendar },
  { id: "alerts", label: "Stock Alerts", icon: AlertTriangle },
  { id: "reorder", label: "Reorder Suggestions", icon: TrendingUp, isAI: true },
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("stock-list");
  const [globalSearch, setGlobalSearch] = useState("");
  const { user } = useAuthStore();

  const canAddStock = user?.role === "ADMIN" || user?.role === "MANAGER";

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Inventory Management</h1>
          <p className="text-neutral-500">Manage your medicine stock, track expiry dates, and handle alerts</p>
        </div>
        
        {canAddStock && (
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors">
              <Upload size={18} />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors">
              <Download size={18} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-yellow text-neutral-900 rounded-xl font-medium hover:bg-primary-yellow-dark transition-colors">
              <Plus size={18} />
              Add Medicine
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors relative
                ${isActive 
                  ? "text-neutral-900" 
                  : "text-neutral-500 hover:text-neutral-700"
                }
              `}
            >
              <Icon size={18} />
              {tab.label}
              {tab.isAI && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary-yellow text-neutral-900 rounded-full">
                  AI
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-yellow rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[calc(100vh-280px)]">
        {activeTab === "stock-list" && <StockListTable searchQuery={globalSearch} />}
        {activeTab === "expiry" && <ExpiryManagement />}
        {activeTab === "alerts" && <StockAlertsTable />}
        {activeTab === "reorder" && <ReorderSuggestions />}
      </div>
    </div>
  );
}
