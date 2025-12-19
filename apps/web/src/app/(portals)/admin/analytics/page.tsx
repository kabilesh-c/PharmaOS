"use client";

import { BarChart3, TrendingUp, DollarSign, Package, Users, Brain, Calendar, Download } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Analytics Overview</h1>
          <p className="text-neutral-600 mt-1">Cross-store performance and AI insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-button text-sm font-medium hover:bg-primary-blue-dark transition-colors">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "₹12.5L", change: "+15%", icon: DollarSign, color: "bg-primary-blue" },
          { label: "Orders Processed", value: "2,847", change: "+8%", icon: Package, color: "bg-status-success" },
          { label: "Active Customers", value: "1,234", change: "+12%", icon: Users, color: "bg-purple-500" },
          { label: "AI Actions", value: "486", change: "+24%", icon: Brain, color: "bg-status-warning" },
        ].map((metric, i) => (
          <div key={i} className="bg-white rounded-card shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full ${metric.color} flex items-center justify-center`}>
                <metric.icon size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-status-success flex items-center gap-1">
                <TrendingUp size={14} />
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-neutral-900">{metric.value}</div>
            <div className="text-sm text-neutral-600">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-card shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Revenue Trend</h3>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-xs font-bold">
              <BarChart3 size={12} />
              All Stores
            </span>
          </div>
          <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-button">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-neutral-500">Revenue chart visualization</p>
            </div>
          </div>
        </div>

        {/* Store Performance */}
        <div className="bg-white rounded-card shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Store Performance</h3>
            <span className="text-xs text-neutral-500">Compared to last month</span>
          </div>
          <div className="space-y-4">
            {[
              { name: "Main Branch", revenue: 450000, target: 500000 },
              { name: "City Center", revenue: 320000, target: 350000 },
              { name: "Mall Outlet", revenue: 280000, target: 300000 },
              { name: "Hospital Wing", revenue: 180000, target: 200000 },
            ].map((store, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-neutral-900">{store.name}</span>
                  <span className="text-sm text-neutral-600">₹{(store.revenue/1000).toFixed(0)}K / ₹{(store.target/1000).toFixed(0)}K</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-blue rounded-full transition-all"
                    style={{ width: `${(store.revenue / store.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-br from-primary-blue to-primary-blue-dark rounded-card shadow-card p-6 text-white">
        <div className="flex items-center gap-3 mb-6">
          <Brain size={24} />
          <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Demand Forecast", insight: "15% increase in cold medicine expected next week due to weather patterns" },
            { title: "Inventory Alert", insight: "3 stores showing similar stockout patterns - consider centralized ordering" },
            { title: "Optimization Opportunity", insight: "Consolidating suppliers could save ₹45,000/month" },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-button p-4">
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-white/80">{item.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
