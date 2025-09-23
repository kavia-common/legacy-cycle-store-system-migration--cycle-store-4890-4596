"use client";

import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TrainingMaterial } from "@/types";
import { apiClient } from "@/lib/api";

export default function TrainingPage() {
  const [materials, setMaterials] = useState<TrainingMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiClient.get("/api/training/materials");
        if (mounted) setMaterials(data as TrainingMaterial[]);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load materials";
        setErr(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <ProtectedRoute roles={["trainer", "admin", "staff", "support", "customer"]}>
      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Training & Documentation</h1>
        {loading && <p role="status">Loading materials…</p>}
        {err && <div role="alert" className="rounded border border-red-300 bg-red-50 text-red-800 p-3">{err}</div>}
        {!loading && !err && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((m) => (
              <li key={m.id} className="border rounded p-4 bg-white">
                <h2 className="text-lg font-medium">{m.title}</h2>
                <a
                  className="text-blue-600 underline text-sm mt-2 inline-block"
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${m.title}`}
                >
                  Open
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </ProtectedRoute>
  );
}
