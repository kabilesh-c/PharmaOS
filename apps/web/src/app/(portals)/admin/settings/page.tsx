"use client";

import { useState } from "react";
import { Settings, Bell, Shield, Database, Zap, Globe, Save, RotateCcw, Brain, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import OrganizationManagement from "@/components/portals/admin/settings/OrganizationManagement";

export default function AdminSettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">System Settings</h1>
          <p className="text-neutral-600 mt-1">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-neutral-600 bg-white border border-neutral-200 rounded-button text-sm font-medium hover:bg-neutral-50 transition-colors">
            <RotateCcw size={16} />
            Reset Defaults
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-button text-sm font-medium hover:bg-primary-blue-dark transition-colors">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-3">
          <div className="bg-white rounded-card shadow-card p-4 space-y-2">
            {[
              { id: "general", icon: Settings, label: "General" },
              { id: "organization", icon: Building2, label: "Organization" },
              { id: "notifications", icon: Bell, label: "Notifications" },
              { id: "security", icon: Shield, label: "Security" },
              { id: "ai", icon: Brain, label: "AI Configuration" },
              { id: "data", icon: Database, label: "Data Management" },
              { id: "integrations", icon: Globe, label: "Integrations" },
            ].map((item, i) => (
              <button 
                key={i}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-button text-left transition-colors ${
                  activeTab === item.id ? "bg-primary-blue/10 text-primary-blue font-medium" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-span-9 space-y-6">
          {activeTab === "organization" ? (
            <OrganizationManagement />
          ) : (
            <>
          {/* General Settings */}
          <div className={`bg-white rounded-card shadow-card p-6 ${activeTab !== "general" ? "hidden" : ""}`}>
            <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
              <Settings size={20} className="text-primary-blue" />
              General Settings
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Organization Name</label>
                <input 
                  type="text" 
                  defaultValue="PharmaCorp Pvt Ltd"
                  className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">System Mode</label>
                  <select className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20">
                    <option>Retail</option>
                    <option>Hospital</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
                  <select className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20">
                    <option>Asia/Kolkata (IST)</option>
                    <option>America/New_York (EST)</option>
                    <option>Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Currency</label>
                <select className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20">
                  <option>₹ INR - Indian Rupee</option>
                  <option>$ USD - US Dollar</option>
                  <option>€ EUR - Euro</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Configuration */}
          <div className={`bg-white rounded-card shadow-card p-6 ${activeTab !== "ai" ? "hidden" : ""}`}>
            <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
              <Brain size={20} className="text-primary-blue" />
              AI Configuration
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-button">
                <div>
                  <div className="font-medium text-neutral-900">Auto-Execute AI Suggestions</div>
                  <div className="text-sm text-neutral-500">Allow AI to automatically execute low-risk actions</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-button">
                <div>
                  <div className="font-medium text-neutral-900">Require Manager Approval</div>
                  <div className="text-sm text-neutral-500">All AI actions above threshold require approval</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">AI Confidence Threshold</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    defaultValue="85"
                    className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
                  />
                  <span className="text-sm font-medium text-neutral-900 w-12">85%</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Actions with confidence below threshold require manual approval</p>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-card shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
              <Shield size={20} className="text-primary-blue" />
              Security Settings
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">API Key</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input 
                      type={showApiKey ? "text" : "password"}
                      defaultValue="sk-pharmacy-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      readOnly
                      className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-button text-sm font-mono"
                    />
                  </div>
                  <button 
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="w-10 h-10 rounded-button bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"
                  >
                    {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button className="px-4 py-2 text-sm text-primary-blue border border-primary-blue rounded-button hover:bg-primary-blue/10 transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-button">
                <div>
                  <div className="font-medium text-neutral-900">Two-Factor Authentication</div>
                  <div className="text-sm text-neutral-500">Require 2FA for all admin accounts</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Session Timeout (minutes)</label>
                <input 
                  type="number" 
                  defaultValue="30"
                  className="w-32 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue"
                />
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
