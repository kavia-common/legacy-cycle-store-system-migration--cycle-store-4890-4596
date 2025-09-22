"use client";

import React from "react";
import { Protected } from "@/components/Protected";
import { useAuth } from "@/components/AuthProvider";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <Protected>
      <main className="page">
        <h1 className="h1">Dashboard</h1>
        <p className="muted">Welcome {user?.name}! Choose a workflow from the navigation.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <a href="/inventory" className="card-link">Inventory</a>
          <a href="/orders" className="card-link">Orders</a>
          <a href="/support" className="card-link">Support</a>
          <a href="/training" className="card-link">Training</a>
        </div>
      </main>
    </Protected>
  );
}
