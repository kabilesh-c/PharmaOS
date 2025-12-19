"use client";

import { useState } from "react";
import { 
  Brain, Settings, Power, Clock, AlertTriangle, Check, 
  Play, Pause, ChevronRight, Plus, Sparkles, Zap, 
  MessageSquare, Package, Bell, Activity, List
} from "lucide-react";
import WorkflowVisualizer from "@/components/portals/manager/automation/WorkflowVisualizer";
import AutomationExecutionLog from "@/components/portals/manager/automation/AutomationExecutionLog";

interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "error";
  actionsToday: number;
  lastRun: string;
  icon: typeof Brain;
}

const agents: Agent[] = [
  { id: "1", name: "Inventory Guard", description: "Monitors stock levels and suggests reorders", status: "active", actionsToday: 12, lastRun: "2 min ago", icon: Package },
  { id: "2", name: "Expiry Watcher", description: "Tracks expiring items and flags for action", status: "active", actionsToday: 8, lastRun: "5 min ago", icon: Clock },
  { id: "3", name: "Price Optimizer", description: "Suggests optimal pricing based on demand", status: "paused", actionsToday: 0, lastRun: "2 hours ago", icon: Zap },
  { id: "4", name: "Supplier Bot", description: "Auto-contacts suppliers for quotes", status: "error", actionsToday: 3, lastRun: "15 min ago", icon: MessageSquare },
];

export default function ManagerAutomationPage() {
  const [activeTab, setActiveTab] = useState<"agents" | "workflows" | "logs">("agents");

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Automation Center</h1>
          <p className="text-neutral-500 mt-1">Manage AI agents and automated workflows</p>
        </div>
        <button className="px-4 py-2 bg-primary-yellow text-neutral-900 rounded-lg font-semibold hover:bg-primary-yellow-dark transition-colors flex items-center gap-2">
          <Plus size={18} /> New Workflow
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-neutral-200">
        <button 
          onClick={() => setActiveTab("agents")}
          className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
            activeTab === "agents" ? "text-primary-yellow-dark" : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          AI Agents
          {activeTab === "agents" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-yellow-dark" />}
        </button>
        <button 
          onClick={() => setActiveTab("workflows")}
          className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
            activeTab === "workflows" ? "text-primary-yellow-dark" : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Active Workflows
          {activeTab === "workflows" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-yellow-dark" />}
        </button>
        <button 
          onClick={() => setActiveTab("logs")}
          className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
            activeTab === "logs" ? "text-primary-yellow-dark" : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Execution Logs
          {activeTab === "logs" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-yellow-dark" />}
        </button>
      </div>

      {activeTab === "agents" ? (
        <div className="grid grid-cols-2 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-yellow/10 rounded-xl flex items-center justify-center text-primary-yellow-dark">
                    <agent.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">{agent.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${
                        agent.status === "active" ? "bg-green-500 animate-pulse" : 
                        agent.status === "paused" ? "bg-yellow-500" : "bg-red-500"
                      }`} />
                      <span className="text-xs text-neutral-500 capitalize">{agent.status}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-600">
                  <Settings size={18} />
                </button>
              </div>
              
              <p className="text-sm text-neutral-600 mb-6">{agent.description}</p>
              
              <div className="flex items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-100">
                <span className="flex items-center gap-1">
                  <Activity size={14} /> {agent.actionsToday} actions today
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> Last run: {agent.lastRun}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === "workflows" ? (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <WorkflowVisualizer />
          </div>
          <div className="col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <h3 className="font-bold text-neutral-900 mb-3">Templates</h3>
              <div className="space-y-2">
                {["Low Stock Alert", "Expiry Notification", "Daily Sales Report", "Auto-Reorder"].map((template, i) => (
                  <button key={i} className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 text-sm text-neutral-600 flex items-center justify-between group">
                    {template}
                    <Plus size={16} className="opacity-0 group-hover:opacity-100 text-primary-yellow-dark" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AutomationExecutionLog />
      )}
    </div>
  );
}
