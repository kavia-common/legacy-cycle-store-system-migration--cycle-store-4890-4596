"use client";

import React, { useEffect, useState } from "react";
import { Protected } from "@/components/Protected";
import { ApiClient } from "@/lib/api-client";

type Material = { id: string; title: string; url: string };

export default function TrainingPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await ApiClient.listTrainingMaterials();
        if (Array.isArray(data)) setMaterials(data as Material[]);
        else setMaterials([]);
      } catch (e) {
        setError((e as Error).message || "Failed to load training materials.");
        // Provide a simple fallback example
        setMaterials([
          { id: "getting-started", title: "Getting Started Guide (Sample)", url: "https://nextjs.org/learn" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <Protected>
      <main className="page">
        <h1 className="h1">Training</h1>
        {loading && <p role="status" aria-live="polite">Loading training materials…</p>}
        {error && (
          <div className="alert mt-3" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
        {!loading && (
          <ul className="list mt-4">
            {materials.map((m) => (
              <li key={m.id}>
                <a className="link" href={m.url} target="_blank" rel="noreferrer">
                  {m.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </Protected>
  );
}
