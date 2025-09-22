"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "./AuthProvider";

export default function NavBar() {
  const { user, logout, hasRole } = useAuth();

  return (
    <nav
      className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur"
      aria-label="Main"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold text-gray-900 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
            Cycle Store
          </Link>
          {user && (
            <ul className="flex items-center gap-3 text-sm">
              <li>
                <Link href="/dashboard" className="link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="link">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/orders" className="link">
                  Orders
                </Link>
              </li>
              {hasRole(["support", "admin"]) && (
                <li>
                  <Link href="/support" className="link">
                    Support
                  </Link>
                </li>
              )}
              <li>
                <Link href="/training" className="link">
                  Training
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!user ? (
            <Link
              href="/login"
              className="btn"
              aria-label="Sign in to your account"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="text-sm text-gray-700" aria-live="polite">
                {user.name} {user.roles?.length ? `(${user.roles.join(", ")})` : ""}
              </span>
              <button
                onClick={() => logout()}
                className="btn-secondary"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
