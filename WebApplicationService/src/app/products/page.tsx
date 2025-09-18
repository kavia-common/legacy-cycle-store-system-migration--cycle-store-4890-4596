"use client";

import { useEffect, useState } from "react";
import Protected from "@/components/Protected";
import { useAuth } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function ProductsPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!token) return;
      setLoading(true);
      setErr(null);
      try {
        const data = await apiFetch<Product[]>("/api/products", { token });
        setItems(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Failed to load products";
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
        <h1 className="text-2xl font-semibold mb-6">Products & Inventory</h1>
        {loading && <p role="status" aria-live="polite">Loading…</p>}
        {err && <div role="alert" className="mb-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{err}</div>}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li key={p.id} className="card p-4">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-slate-600 text-sm mb-2">{p.description}</p>
              <p className="font-medium">${p.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
    </Protected>
  );
}
