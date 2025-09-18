"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

// PUBLIC_INTERFACE
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(username, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-md card p-6">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        {error && (
          <div role="alert" className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-md border border-slate-300 px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <button className="btn btn-primary w-full" disabled={submitting} aria-busy={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
