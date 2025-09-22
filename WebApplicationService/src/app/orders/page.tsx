"use client";

import React, { useState } from "react";
import { Protected } from "@/components/Protected";
import { ApiClient } from "@/lib/api-client";

export default function OrdersPage() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      setSubmitting(true);
      const res = await ApiClient.createOrder({
        items: [{ productId, quantity }],
      });
      setMessage(`Order placed successfully. ID: ${res?.id ?? "N/A"}`);
    } catch (e) {
      setError((e as Error).message || "Failed to place order.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Protected>
      <main className="page">
        <h1 className="h1">Orders</h1>
        <form onSubmit={submitOrder} className="max-w-md mt-4">
          <label htmlFor="productId" className="label">Product ID</label>
          <input
            id="productId"
            className="input"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
          <label htmlFor="quantity" className="label mt-3">Quantity</label>
          <input
            id="quantity"
            className="input"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          <button className="btn mt-4" disabled={submitting} aria-busy={submitting}>
            {submitting ? "Submitting…" : "Place Order"}
          </button>
        </form>
        {message && (
          <div className="alert-success mt-4" role="status" aria-live="polite">
            {message}
          </div>
        )}
        {error && (
          <div className="alert mt-4" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
      </main>
    </Protected>
  );
}
