"use client";

import { useState } from "react";
import { FileText, Search, Filter, Download, User, Brain, Clock, CheckCircle, AlertTriangle, XCircle, Eye, Calendar } from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorType: "user" | "ai";
  action: string;
  entity: string;
  outcome: "success" | "failure" | "override";
  details: string;
}

export default function AdminAuditPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const logs: AuditLog[] = [
    { id: "1", timestamp: "2024-01-15 14:32:45", actor: "AI System", actorType: "ai", action: "Auto-Reorder Created", entity: "Paracetamol 500mg", outcome: "success", details: "Created PO for 500 units" },
    { id: "2", timestamp: "2024-01-15 14:28:12", actor: "John Manager", actorType: "user", action: "Approval Override", entity: "Price Discount", outcome: "override", details: "Overrode AI suggestion for 15% discount" },
    { id: "3", timestamp: "2024-01-15 14:15:33", actor: "AI System", actorType: "ai", action: "Expiry Alert", entity: "Amoxicillin 250mg", outcome: "success", details: "Sent WhatsApp notification to supplier" },
    { id: "4", timestamp: "2024-01-15 14:02:18", actor: "AI System", actorType: "ai", action: "Stock Transfer", entity: "Ibuprofen 400mg", outcome: "failure", details: "Failed to connect to Branch B inventory system" },
    { id: "5", timestamp: "2024-01-15 13:45:00", actor: "Sarah Admin", actorType: "user", action: "User Role Updated", entity: "User: Michael P", outcome: "success", details: "Changed role from Pharmacist to Manager" },
    { id: "6", timestamp: "2024-01-15 13:30:22", actor: "AI System", actorType: "ai", action: "Demand Forecast", entity: "Cold Medicines", outcome: "success", details: "Predicted 25% increase for next week" },
  ];

  const getOutcomeStyle = (outcome: string) => {
    switch (outcome) {
      case "success": return { bg: "bg-status-success/10", text: "text-status-success", icon: CheckCircle };
      case "failure": return { bg: "bg-status-danger/10", text: "text-status-danger", icon: XCircle };
      case "override": return { bg: "bg-status-warning/10", text: "text-status-warning", icon: AlertTriangle };
      default: return { bg: "bg-neutral-100", text: "text-neutral-600", icon: Clock };
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Audit Logs</h1>
          <p className="text-neutral-600 mt-1">Complete history of AI decisions and human overrides</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-button text-sm font-medium hover:bg-primary-blue-dark transition-colors">
          <Download size={16} />
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-card shadow-card p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search logs by action, entity, or actor..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 text-sm rounded-button transition-colors ${selectedFilter === "all" ? "bg-primary-blue text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedFilter("ai")}
              className={`px-3 py-1.5 text-sm rounded-button transition-colors flex items-center gap-1 ${selectedFilter === "ai" ? "bg-primary-blue text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              <Brain size={14} />
              AI Actions
            </button>
            <button 
              onClick={() => setSelectedFilter("user")}
              className={`px-3 py-1.5 text-sm rounded-button transition-colors flex items-center gap-1 ${selectedFilter === "user" ? "bg-primary-blue text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              <User size={14} />
              User Actions
            </button>
            <button 
              onClick={() => setSelectedFilter("override")}
              className={`px-3 py-1.5 text-sm rounded-button transition-colors flex items-center gap-1 ${selectedFilter === "override" ? "bg-status-warning text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              <AlertTriangle size={14} />
              Overrides
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-button transition-colors">
            <Calendar size={16} />
            Date Range
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Timestamp</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actor</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Action</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Entity</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Outcome</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Details</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {logs.map((log) => {
              const outcomeStyle = getOutcomeStyle(log.outcome);
              const OutcomeIcon = outcomeStyle.icon;
              return (
                <tr key={log.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock size={14} className="text-neutral-400" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${log.actorType === "ai" ? "bg-primary-blue/10" : "bg-neutral-100"}`}>
                        {log.actorType === "ai" ? <Brain size={14} className="text-primary-blue" /> : <User size={14} className="text-neutral-600" />}
                      </div>
                      <span className="text-sm font-medium text-neutral-900">{log.actor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{log.entity}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${outcomeStyle.bg} ${outcomeStyle.text}`}>
                      <OutcomeIcon size={12} />
                      {log.outcome.charAt(0).toUpperCase() + log.outcome.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs truncate">{log.details}</td>
                  <td className="px-6 py-4">
                    <button className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors">
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-500">Showing 1-6 of 1,284 logs</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-button hover:bg-neutral-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm text-white bg-primary-blue rounded-button">1</button>
          <button className="px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-button">2</button>
          <button className="px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-button">3</button>
          <span className="text-neutral-400">...</span>
          <button className="px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-button">128</button>
          <button className="px-3 py-1.5 text-sm text-neutral-600 bg-white border border-neutral-200 rounded-button hover:bg-neutral-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
