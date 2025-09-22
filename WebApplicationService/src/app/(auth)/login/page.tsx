"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const ok = await login(username, password);
    setSubmitting(false);
    if (ok) router.push("/dashboard");
    else setError("Invalid credentials.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <a href="#content" className="skip">Skip to content</a>
      <section id="content" className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
          <p className="text-sm text-gray-600">Use your organizational account</p>
        </header>
        <form onSubmit={onSubmit} aria-describedby={error ? "form-error" : undefined}>
          <label className="label" htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            className="input"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading || submitting}
            required
          />
          <label className="label mt-3" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || submitting}
            required
          />

          {error && (
            <div id="form-error" role="alert" aria-live="assertive" className="mt-3 rounded border border-red-200 bg-red-50 p-3 text-red-800">
              {error}
            </div>
          )}

          <button className="btn w-full mt-4" disabled={loading || submitting} aria-busy={loading || submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
