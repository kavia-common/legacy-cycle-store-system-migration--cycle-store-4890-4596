"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

// PUBLIC_INTERFACE
export default function Protected({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container py-10" role="status" aria-live="polite">
        <div className="card p-6">
          <p className="text-slate-700">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-10">
        <div className="card p-6">
          <h1 className="text-xl font-semibold mb-2">Sign in required</h1>
          <p className="mb-4">Please sign in to access this page.</p>
          <Link className="btn btn-primary" href="/login">Go to Login</Link>
        </div>
      </div>
    );
  }

  if (roles && !user.roles.some(r => roles.includes(r))) {
    return (
      <div className="container py-10" role="alert" aria-live="assertive">
        <div className="card p-6">
          <h1 className="text-xl font-semibold mb-2">Access denied</h1>
          <p className="mb-4">You do not have permission to view this page.</p>
          <Link className="btn btn-secondary" href="/">Back to home</Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
