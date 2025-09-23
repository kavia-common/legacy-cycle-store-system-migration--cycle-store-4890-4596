"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, status } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await login({ username, password });
      router.replace("/dashboard");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Login failed";
      setErr(message);
    }
  }

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4" aria-describedby={err ? "login-error" : undefined}>
        {err && (
          <div id="login-error" role="alert" className="rounded border border-red-300 bg-red-50 text-red-800 p-3">
            {err}
          </div>
        )}
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            className="mt-1 w-full border rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="mt-1 flex">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              required
              className="w-full border rounded-l px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
            />
            <button
              type="button"
              className="border border-l-0 rounded-r px-3 py-2 text-sm"
              onClick={() => setShowPw((v) => !v)}
              aria-pressed={showPw}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={status === "authenticating"}
          className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring disabled:opacity-60"
          aria-busy={status === "authenticating"}
        >
          {status === "authenticating" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
