"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import { useAuth } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";

interface Material {
  id: string;
  title: string;
  url: string;
}

export default function TrainingPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!token) { setLoading(false); return; }
      try {
        const data = await apiFetch<Material[]>("/api/training/materials", { token });
        setItems(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to load training materials";
        setErr(msg);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  return (
    <Protected>
      <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">Training Materials</h1>
        {loading && <p role="status">Loading…</p>}
        {err && <div role="alert" className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{err}</div>}
        <ul className="space-y-3">
          {items.map((m) => (
            <li key={m.id} className="card p-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{m.title}</h2>
                <p className="text-sm text-slate-600">{m.url}</p>
              </div>
              <a className="btn btn-secondary" href={m.url} target="_blank" rel="noreferrer">Open</a>
            </li>
          ))}
          {!loading && items.length === 0 && <li className="text-slate-600">No materials available.</li>}
        </ul>
      </div>
    </Protected>
  );
}
