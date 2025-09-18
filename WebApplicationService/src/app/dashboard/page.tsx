"use client";

import Link from "next/link";
import Protected from "@/components/Protected";
import { useAuth } from "@/lib/auth-context";
import { anyRole } from "@/lib/rbac";

export default function Dashboard() {
  const { user } = useAuth();
  const roles = user?.roles ?? [];

  return (
    <Protected>
      <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">My Profile</h2>
            <p className="text-slate-700 mb-4">View and manage your profile and roles.</p>
            <Link className="btn btn-secondary" href="/profile">Open</Link>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">Documentation</h2>
            <p className="text-slate-700 mb-4">Access manuals, quick-start guides, and FAQs.</p>
            <Link className="btn btn-secondary" href="/docs">Open</Link>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">Training</h2>
            <p className="text-slate-700 mb-4">Learn via curated training materials and videos.</p>
            <Link className="btn btn-secondary" href="/training">Open</Link>
          </div>

          {anyRole(roles, ["staff", "admin"]) && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-2">Inventory</h2>
              <p className="text-slate-700 mb-4">Browse and manage inventory items.</p>
              <Link className="btn btn-secondary" href="/products">Open</Link>
            </div>
          )}

          {anyRole(roles, ["support", "admin"]) && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-2">Support Tickets</h2>
              <p className="text-slate-700 mb-4">Submit or review support tickets.</p>
              <Link className="btn btn-secondary" href="/support">Open</Link>
            </div>
          )}

          {anyRole(roles, ["admin"]) && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-2">Admin – Users</h2>
              <p className="text-slate-700 mb-4">Review users via API Gateway (admin-only).</p>
              <a className="btn btn-secondary" href="/docs#api-gateway-users">Learn more</a>
            </div>
          )}
        </div>
      </div>
    </Protected>
  );
}
