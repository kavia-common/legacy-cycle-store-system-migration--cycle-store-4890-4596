"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="container py-10">
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold mb-2">Welcome to Cycle Store</h1>
          <p className="text-slate-700 mb-4">
            A modern, accessible interface for staff, administrators, support, trainers, and customers.
          </p>
          <div className="flex gap-3">
            <Link className="btn btn-primary" href="/dashboard">Open Dashboard</Link>
            {!user && <Link className="btn btn-secondary" href="/login">Sign in</Link>}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Get started</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li><Link className="nav-link" href="/products">Browse Products/Inventory</Link></li>
            <li><Link className="nav-link" href="/support">Open a Support Ticket</Link></li>
            <li><Link className="nav-link" href="/docs">Read Documentation & Manuals</Link></li>
            <li><Link className="nav-link" href="/training">Training Materials</Link></li>
            <li><Link className="nav-link" href="/profile">Profile & Roles</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
