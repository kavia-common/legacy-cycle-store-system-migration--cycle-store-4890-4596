"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/types";

type NavItem = { href: string; label: string; roles?: Role[] };

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventory", label: "Inventory", roles: ["admin", "staff"] },
  { href: "/sales", label: "Sales", roles: ["admin", "staff"] },
  { href: "/support", label: "Support", roles: ["support", "admin"] },
  { href: "/training", label: "Training", roles: ["trainer", "admin", "staff", "support", "customer"] },
  { href: "/reports", label: "Reports", roles: ["admin"] },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, status, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    if (!user?.roles) return NAV_ITEMS.filter((n) => !n.roles);
    return NAV_ITEMS.filter((n) => !n.roles || n.roles.some((r) => user.roles.includes(r)));
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 rounded focus:outline-none focus:ring"
                aria-label="Toggle navigation"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">Open main menu</span>
                ☰
              </button>
              <Link href="/dashboard" className="text-lg font-semibold" aria-label="Go to dashboard">
                Cycle Store
              </Link>
            </div>
            <div className="hidden md:flex gap-4">
              {items.map((n) => (
                <Link key={n.href} href={n.href} className="px-2 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring">
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {status === "authenticated" && user ? (
                <>
                  <span className="text-sm text-gray-700" aria-live="polite">
                    {user.name} · {user.roles.join(", ")}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm px-3 py-1 rounded border hover:bg-gray-50 focus:outline-none focus:ring"
                    aria-label="Sign out"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-sm px-3 py-1 rounded border hover:bg-gray-50 focus:outline-none focus:ring">
                  Sign in
                </Link>
              )}
            </div>
          </div>
          {open && (
            <div className="md:hidden pb-4" role="region" aria-label="Mobile navigation">
              <div className="flex flex-col gap-2">
                {items.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="px-3 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Cycle Store · Accessible · WCAG 2.1 AA
        </div>
      </footer>
    </div>
  );
}
