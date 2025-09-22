"use client";

import React from "react";
import { useAuth } from "./AuthProvider";

// PUBLIC_INTERFACE
export function Protected({
  roles,
  children,
  fallback,
}: {
  roles?: string[] | string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  /**
   * PUBLIC_INTERFACE
   * Ensures the wrapped content is shown only if user is authenticated (and has one of the roles if specified).
   * - roles: single role or array of roles allowed
   * - fallback: node shown when not authorized
   */
  const { user, loading, hasRole } = useAuth();

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="p-6 text-gray-600">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      fallback || (
        <div className="p-6" role="alert" aria-live="assertive">
          <p>You must be logged in to view this page.</p>
        </div>
      )
    );
  }

  if (roles && !hasRole(roles)) {
    return (
      <div className="p-6" role="alert" aria-live="assertive">
        <p>Insufficient permissions to access this content.</p>
      </div>
    );
  }

  return <>{children}</>;
}
