"use client";

import React, { useState } from "react";
import Protected from "@/components/Protected";
import { useAuth } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";

export default function SupportPage() {
  const { token } = useAuth();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true); setError(null); setStatus(null);
    try {
      await apiFetch("/api/support/ticket", {
        method: "POST",
        token,
        body: { id: "", subject, description, status: "open" },
      });
      setStatus("Ticket submitted successfully.");
      setSubject(""); setDescription("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to submit ticket";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Protected>
      <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">Support</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">Open a ticket</h2>
            {status && <div role="status" className="mb-3 p-3 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">{status}</div>}
            {error && <div role="alert" className="mb-3 p-3 rounded-md bg-red-50 text-red-700 border border-red-200">{error}</div>}
            <form onSubmit={onSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input id="subject" className="w-full rounded-md border border-slate-300 px-3 py-2" value={subject} onChange={(e)=>setSubject(e.target.value)} required />
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea id="description" className="w-full rounded-md border border-slate-300 px-3 py-2" rows={5} value={description} onChange={(e)=>setDescription(e.target.value)} required />
              </div>
              <button className="btn btn-primary" disabled={submitting} aria-busy={submitting}>
                {submitting ? "Submitting…" : "Submit Ticket"}
              </button>
            </form>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">FAQs</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>How to reset my password? Contact admin if SSO is enabled.</li>
              <li>Inventory not updating? Check your network and refresh token.</li>
              <li>Need help? Submit a ticket with steps to reproduce the issue.</li>
            </ul>
          </div>
        </div>
      </div>
    </Protected>
  );
}
