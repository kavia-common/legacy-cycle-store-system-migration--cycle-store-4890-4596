"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SupportTicket } from "@/types";
import { apiClient } from "@/lib/api";

const FAQS = [
  { q: "How to reset my password?", a: "Use the Sign in page's 'Forgot password' flow or contact support." },
  { q: "Why can't I see Inventory?", a: "Your role may not include Inventory access; ask an Admin for permissions." },
  { q: "How to escalate a ticket?", a: "Include 'ESCALATE' in the subject or choose high priority when submitting." },
];

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submitTicket(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setSubmitting(true);
    const payload: SupportTicket = { subject, description };
    try {
      await apiClient.post("/api/support/ticket", payload);
      setMsg("Ticket submitted. Our support team will get back to you soon.");
      setSubject("");
      setDescription("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to submit ticket";
      setErr(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ProtectedRoute roles={["support", "admin", "staff", "trainer", "customer"]}>
      <main className="max-w-5xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Support</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded p-4 bg-white">
            <h2 className="text-lg font-medium mb-2">Submit a ticket</h2>
            <form onSubmit={submitTicket} className="space-y-3">
              {msg && <div role="status" className="rounded border border-green-300 bg-green-50 text-green-900 p-3">{msg}</div>}
              {err && <div role="alert" className="rounded border border-red-300 bg-red-50 text-red-800 p-3">{err}</div>}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                <input
                  id="subject"
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  className="mt-1 w-full border rounded px-3 py-2"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring disabled:opacity-60"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? "Submitting…" : "Submit ticket"}
              </button>
            </form>
          </div>

          <div className="border rounded p-4 bg-white">
            <h2 className="text-lg font-medium mb-2">FAQs</h2>
            <dl>
              {FAQS.map((f, i) => (
                <div key={i} className="mb-3">
                  <dt className="font-medium">{f.q}</dt>
                  <dd className="text-gray-700">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
