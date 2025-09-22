"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const { user, loading } = useAuth();
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <section className="text-center">
        <h1 className="text-black text-4xl font-light">Cycle Store Web</h1>
        <p className="text-gray-600 mt-2">
          {loading ? "Loading session…" : user ? "Welcome back!" : "Please sign in to continue."}
        </p>
        <div className="mt-6">
          {user ? (
            <Link href="/dashboard" className="btn">Go to Dashboard</Link>
          ) : (
            <Link href="/login" className="btn">Sign in</Link>
          )}
        </div>
      </section>
    </main>
  );
}
