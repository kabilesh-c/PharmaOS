"use client";

import { useState } from "react";
import { Users, Search, Plus, Edit, Trash2, Shield, UserCheck, User, Mail, Calendar, MoreVertical, CheckCircle, XCircle } from "lucide-react";
import PermissionPreviewMatrix from "@/components/portals/admin/users/PermissionPreviewMatrix";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "PHARMACIST";
  store: string;
  status: "active" | "inactive";
  lastLogin: string;
  joinedAt: string;
}

export default function AdminUsersPage() {
  const [users] = useState<UserData[]>([
    { id: "1", name: "Sarah Johnson", email: "sarah@pharmacy.com", role: "ADMIN", store: "All Stores", status: "active", lastLogin: "Just now", joinedAt: "Jan 2023" },
    { id: "2", name: "John Smith", email: "john@pharmacy.com", role: "MANAGER", store: "Main Branch", status: "active", lastLogin: "2 hours ago", joinedAt: "Mar 2023" },
    { id: "3", name: "Emily Davis", email: "emily@pharmacy.com", role: "MANAGER", store: "City Center", status: "active", lastLogin: "1 day ago", joinedAt: "May 2023" },
    { id: "4", name: "Michael Brown", email: "michael@pharmacy.com", role: "PHARMACIST", store: "Main Branch", status: "active", lastLogin: "3 hours ago", joinedAt: "Jul 2023" },
    { id: "5", name: "Lisa Wilson", email: "lisa@pharmacy.com", role: "PHARMACIST", store: "Mall Outlet", status: "inactive", lastLogin: "5 days ago", joinedAt: "Sep 2023" },
    { id: "6", name: "David Lee", email: "david@pharmacy.com", role: "PHARMACIST", store: "Hospital Wing", status: "active", lastLogin: "30 min ago", joinedAt: "Oct 2023" },
  ]);

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "ADMIN": return { bg: "bg-primary-blue/10", text: "text-primary-blue", icon: Shield };
      case "MANAGER": return { bg: "bg-status-warning/10", text: "text-status-warning", icon: UserCheck };
      case "PHARMACIST": return { bg: "bg-status-success/10", text: "text-status-success", icon: User };
      default: return { bg: "bg-neutral-100", text: "text-neutral-600", icon: User };
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">User Management</h1>
          <p className="text-neutral-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-button text-sm font-medium hover:bg-primary-blue-dark transition-colors">
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "48", color: "bg-primary-blue" },
          { label: "Admins", value: "3", color: "bg-purple-500" },
          { label: "Managers", value: "8", color: "bg-status-warning" },
          { label: "Pharmacists", value: "37", color: "bg-status-success" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-card shadow-card p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
              <Users size={20} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-card shadow-card p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue"
            />
          </div>
          <select className="px-4 py-2 bg-white border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Pharmacist</option>
          </select>
          <select className="px-4 py-2 bg-white border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20">
            <option>All Stores</option>
            <option>Main Branch</option>
            <option>City Center</option>
            <option>Mall Outlet</option>
            <option>Hospital Wing</option>
          </select>
          <select className="px-4 py-2 bg-white border border-neutral-200 rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          {/* User List Table */}
          <div className="bg-white rounded-card shadow-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600 text-sm">User</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600 text-sm">Role</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600 text-sm">Store</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-neutral-600 text-sm">Last Login</th>
                  <th className="text-right py-4 px-6 font-medium text-neutral-600 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {users.map((user) => {
                  const roleStyle = getRoleStyle(user.role);
                  return (
                    <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-neutral-900">{user.name}</div>
                            <div className="text-xs text-neutral-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${roleStyle.bg} ${roleStyle.text}`}>
                          <roleStyle.icon size={12} />
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-neutral-600">{user.store}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active" 
                            ? "bg-status-success/10 text-status-success" 
                            : "bg-neutral-100 text-neutral-500"
                        }`}>
                          {user.status === "active" ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-neutral-500">{user.lastLogin}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-1 hover:bg-neutral-100 rounded text-neutral-400 hover:text-neutral-600">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="col-span-4">
          <PermissionPreviewMatrix />
        </div>
      </div>
    </div>
  );
}
