"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-2">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
        <p className="text-gray-700 mb-6">Choose a workspace to get started.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card href="/inventory" title="Inventory" description="Manage products and stock levels." />
          <Card href="/sales" title="Sales" description="Process orders and view transactions." />
          <Card href="/support" title="Support" description="Helpdesk, tickets, FAQs, and escalation." />
          <Card href="/training" title="Training" description="Guides, tutorials, and role-based materials." />
          <Card href="/reports" title="Reports" description="Operational analytics and performance." />
        </div>
      </main>
    </ProtectedRoute>
  );
}

function Card({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="block border rounded-lg p-4 hover:shadow-sm focus:outline-none focus:ring bg-white"
      aria-label={`${title} - ${description}`}
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </Link>
  );
}
