"use client";

import React from "react";
import { Role } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

/**
 * Protects children content based on auth and roles.
 */
export function ProtectedRoute({ roles, children }: { roles?: Role[]; children: React.ReactNode }) {
  const { status, user } = useAuth();

  if (status === "authenticating") {
    return (
      <div className="p-6" role="status" aria-live="polite">
        <p className="text-gray-600">Checking your session…</p>
      </div>
    );
  }

  if (status !== "authenticated" || !user) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">Please sign in</h1>
        <p className="mb-4">You must be authenticated to access this content.</p>
        <Link className="text-blue-600 underline" href="/login" aria-label="Go to login">
          Go to login
        </Link>
      </div>
    );
  }

  if (roles && roles.length > 0) {
    const allowed = user.roles.some((r) => roles.includes(r));
    if (!allowed) {
      return (
        <div className="p-6" role="alert" aria-live="assertive">
          <h2 className="text-xl font-semibold">Access denied</h2>
          <p className="text-gray-700">Your account lacks required permissions for this area.</p>
        </div>
      );
    }
  }

  return <>{children}</>;
}
