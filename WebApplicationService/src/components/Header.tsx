"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-slate-900 hover:text-blue-700 focus:text-blue-700">
          Cycle Store
          <span className="sr-only">Home</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4">
            <li><Link className="nav-link" href="/dashboard">Dashboard</Link></li>
            <li><Link className="nav-link" href="/products">Products</Link></li>
            <li><Link className="nav-link" href="/support">Support</Link></li>
            <li><Link className="nav-link" href="/docs">Docs</Link></li>
            <li><Link className="nav-link" href="/training">Training</Link></li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/profile" className="nav-link">{user.name}</Link>
              <button onClick={logout} className="btn btn-secondary" aria-label="Sign out">
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
