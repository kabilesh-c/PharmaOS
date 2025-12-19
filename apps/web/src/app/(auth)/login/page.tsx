"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "PHARMACIST":
          router.push("/pharmacist/dashboard");
          break;
        case "MANAGER":
          router.push("/manager/dashboard");
          break;
        default:
          router.push("/dashboard");
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();
      
      // Use auth store to persist login
      login(data.user, data.token);
      
      // Redirect based on role
      switch (data.user.role) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "PHARMACIST":
          router.push("/pharmacist/dashboard");
          break;
        case "MANAGER":
          router.push("/manager/dashboard");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100">
      <div className="w-full max-w-md p-8 bg-white rounded-card shadow-card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-yellow rounded-full flex items-center justify-center text-2xl font-bold text-neutral-800">
            Rx
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-status-danger/10 border border-status-danger rounded-button text-status-danger text-sm">
              {error}
            </div>
          )}

          {/* Test Credentials Info */}
          <div className="p-3 bg-status-info/10 border border-status-info/30 rounded-xl text-xs text-neutral-600">
            <p className="font-medium text-status-info mb-1">Test Credentials:</p>
            <p>Admin: admin@pharmacy.com / admin123</p>
            <p>Manager: manager@pharmacy.com / manager123</p>
            <p>Pharmacist: pharmacist@pharmacy.com / pharmacist123</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary-yellow"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-button focus:outline-none focus:ring-2 focus:ring-primary-yellow"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary-yellow hover:bg-primary-yellow-dark text-neutral-900 font-semibold rounded-button transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-center text-neutral-600 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary-yellow-dark font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
