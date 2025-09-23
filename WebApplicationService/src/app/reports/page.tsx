"use client";

import React from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ReportsPage() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Reports</h1>
        <p className="text-gray-700 mb-6">
          Operational insights and compliance dashboards. Connect to your Monitoring & Logging backend to populate widgets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Widget title="System Uptime" value="99.98%" />
          <Widget title="API Error Rate (24h)" value="0.31%" />
          <Widget title="Avg Response Time" value="182 ms" />
        </div>
      </main>
    </ProtectedRoute>
  );
}

function Widget({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="text-sm text-gray-600">{title}</h2>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
