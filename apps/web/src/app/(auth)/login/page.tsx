"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Check, Info, ArrowRight, Building2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, logout, isAuthenticated, user, setMode, mode } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Clear any existing session when visiting login page
  useEffect(() => {
    logout();
  }, [logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Mock Login Logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API

      // Determine user based on email (Mock)
      let role = "PHARMACIST";
      let mode: "RETAIL" | "HOSPITAL" = "RETAIL";
      
      if (email.includes("admin")) role = "ADMIN";
      else if (email.includes("manager")) role = "MANAGER";
      else if (email.includes("pharmacist") || email.includes("staff")) role = "PHARMACIST";

      if (email.includes("hospital")) mode = "HOSPITAL";

      const user = {
        id: "user-123",
        name: "Demo User",
        email: email,
        role: role as any,
      };
      
      // Use auth store to persist login
      login(user, "mock-token");
      setMode(mode);
      
      // Redirect based on role and mode
      if (mode === "HOSPITAL") {
        switch (role) {
          case "ADMIN":
            router.push("/admin");
            break;
          case "MANAGER":
            router.push("/manager");
            break;
          case "PHARMACIST":
            router.push("/hospital/staff");
            break;
          default:
            router.push("/hospital/staff");
        }
      } else {
        switch (role) {
          case "ADMIN":
            router.push("/admin");
            break;
          case "MANAGER":
            router.push("/manager");
            break;
          case "PHARMACIST":
            router.push("/pharmacist/dashboard");
            break;
          default:
            router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side - Brand & Features */}
        <div className="w-full md:w-1/2 bg-[#1A1F37] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-yellow/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity w-fit">
              <div className="w-10 h-10 bg-primary-yellow rounded-xl flex items-center justify-center text-[#1A1F37]">
                <Building2 size={24} />
              </div>
              <span className="text-xl font-bold">PharmaOS</span>
            </Link>

            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Intelligent Pharmacy Management System
            </h1>
            <p className="text-gray-400 text-lg mb-12">
              Streamline your pharmacy operations with AI-powered insights and real-time analytics.
            </p>

            <div className="space-y-4">
              {[
                "Real-time inventory tracking",
                "AI-powered demand forecasting",
                "Expiry prediction & alerts"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-primary-success">
                    <Check size={14} className="text-primary-yellow" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-12 bg-white flex flex-col justify-center relative">
          <Link 
            href="/" 
            className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 flex items-center gap-2 text-sm font-medium transition-colors"
          >
             <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Welcome back!</h2>
            <p className="text-neutral-500">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
                <Info size={18} className="shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-yellow focus:ring-2 focus:ring-primary-yellow/20 outline-none transition-all bg-neutral-50"
                placeholder="admin@pharmacy.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-yellow focus:ring-2 focus:ring-primary-yellow/20 outline-none transition-all bg-neutral-50"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-primary-yellow focus:ring-primary-yellow" />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary-yellow text-neutral-900 font-bold rounded-xl hover:bg-primary-yellow-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-yellow/20"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </button>

            <div className="text-center text-sm text-neutral-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary-yellow-dark font-bold hover:underline">
                Get Started
              </Link>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-5 bg-neutral-50 rounded-xl border border-neutral-100">
            <div className="flex items-center gap-2 text-neutral-500 mb-3">
              <Info size={16} />
              <span className="text-sm font-medium">Demo Credentials</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600 font-mono">
              <div>
                <p className="font-bold text-neutral-400 mb-1 text-xs uppercase">Retail Mode</p>
                <p>admin@pharmacy.com</p>
                <p>manager@pharmacy.com</p>
                <p>pharmacist@pharmacy.com</p>
              </div>
              <div>
                <p className="font-bold text-neutral-400 mb-1 text-xs uppercase">Hospital Mode</p>
                <p>admin@hospital.com</p>
                <p>manager@hospital.com</p>
                <p>staff@hospital.com</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-neutral-200 text-xs text-neutral-400">
                Passwords: <span className="font-bold text-neutral-600">admin123</span>, <span className="font-bold text-neutral-600">manager123</span>, <span className="font-bold text-neutral-600">pharmacist123</span> (Retail), <span className="font-bold text-neutral-600">staff123</span> (Hospital)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
