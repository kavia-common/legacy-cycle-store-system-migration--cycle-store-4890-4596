"use client";

import React, { useEffect, useState } from "react";
import { Protected } from "@/components/Protected";
import { ApiClient } from "@/lib/api-client";

type Item = {
  id?: string | number;
  name?: string;
  price?: number;
  quantity?: number;
  [k: string]: unknown;
};

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await ApiClient.listInventory();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setError((e as Error).message || "Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <Protected>
      <main className="page">
        <h1 className="h1">Inventory</h1>
        {loading && <p role="status" aria-live="polite">Loading inventory…</p>}
        {error && (
          <div role="alert" aria-live="assertive" className="alert">
            {error}
          </div>
        )}
        {!loading && !error && (
          <div className="overflow-auto rounded border border-gray-200 mt-4">
            <table className="min-w-full text-sm">
              <caption className="sr-only">Inventory items</caption>
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="th">ID</th>
                  <th className="th">Name</th>
                  <th className="th">Price</th>
                  <th className="th">Qty</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={String(it.id ?? idx)} className="odd:bg-white even:bg-gray-50">
                    <td className="td">{String(it.id ?? idx)}</td>
                    <td className="td">{it.name ?? "-"}</td>
                    <td className="td">{typeof it.price === "number" ? `$${it.price.toFixed(2)}` : "-"}</td>
                    <td className="td">{typeof it.quantity === "number" ? it.quantity : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Protected>
  );
}
