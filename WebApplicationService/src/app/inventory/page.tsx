"use client";

import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { apiClient } from "@/lib/api";
import { InventoryItem } from "@/types";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiClient.get("/api/inventory");
        if (mounted) setItems(data as InventoryItem[]);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load inventory";
        setErr(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ProtectedRoute roles={["admin", "staff"]}>
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold">Inventory</h1>
          <p className="text-gray-700">View current stock and pricing.</p>
        </header>

        {loading && <p role="status">Loading inventory…</p>}
        {err && (
          <div role="alert" className="rounded border border-red-300 bg-red-50 text-red-800 p-3 mb-4">
            {err}
          </div>
        )}

        {!loading && !err && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left" role="table">
              <thead className="bg-gray-50">
                <tr>
                  <Th>Product</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={`${i.id}-${i.name}`} className="border-b last:border-0">
                    <Td>{i.name}</Td>
                    <Td>{i.quantity}</Td>
                    <Td>${Number(i.price).toFixed(2)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th scope="col" className="px-3 py-2 text-sm font-medium text-gray-700">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2 text-sm text-gray-800">{children}</td>;
}
