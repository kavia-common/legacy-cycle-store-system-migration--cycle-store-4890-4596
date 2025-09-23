"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Order, OrderItem } from "@/types";
import { apiClient } from "@/lib/api";

export default function SalesPage() {
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState<OrderItem[]>([{ productId: "", quantity: 1 }]);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const updateItem = (idx: number, field: keyof OrderItem, value: string | number) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it)));
  };

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setSubmitting(true);
    const payload: Order = { items, total: undefined };
    try {
      await apiClient.post("/api/orders", { customerId, items: payload.items });
      setMsg("Order created successfully.");
      setCustomerId("");
      setItems([{ productId: "", quantity: 1 }]);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to create order";
      setErr(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ProtectedRoute roles={["admin", "staff"]}>
      <main className="max-w-2xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Sales</h1>
        <form onSubmit={createOrder} className="space-y-4">
          {msg && <div role="status" className="rounded border border-green-300 bg-green-50 text-green-900 p-3">{msg}</div>}
          {err && <div role="alert" className="rounded border border-red-300 bg-red-50 text-red-800 p-3">{err}</div>}
          <div>
            <label htmlFor="customerId" className="block text-sm font-medium">Customer ID</label>
            <input
              id="customerId"
              required
              className="mt-1 w-full border rounded px-3 py-2"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Items</legend>
            {items.map((it, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  aria-label={`Product ID ${idx + 1}`}
                  placeholder="Product ID"
                  className="flex-1 border rounded px-3 py-2"
                  value={it.productId}
                  onChange={(e) => updateItem(idx, "productId", e.target.value)}
                  required
                />
                <input
                  aria-label={`Quantity ${idx + 1}`}
                  type="number"
                  min={1}
                  className="w-28 border rounded px-3 py-2"
                  value={it.quantity}
                  onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                  required
                />
                <button
                  type="button"
                  className="px-3 py-2 border rounded hover:bg-gray-50"
                  onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                  aria-label={`Remove item ${idx + 1}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 underline text-sm"
              onClick={() => setItems((prev) => [...prev, { productId: "", quantity: 1 }])}
            >
              Add item
            </button>
          </fieldset>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring disabled:opacity-60"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? "Submitting…" : "Create Order"}
          </button>
        </form>
      </main>
    </ProtectedRoute>
  );
}
