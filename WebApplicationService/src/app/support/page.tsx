"use client";

import React, { useState } from "react";
import { Protected } from "@/components/Protected";
import { ApiClient } from "@/lib/api-client";

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      setSubmitting(true);
      await ApiClient.createSupportTicket({ subject, description });
      setMessage("Support ticket submitted.");
      setSubject("");
      setDescription("");
    } catch (e) {
      setError((e as Error).message || "Failed to submit ticket.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Protected>
      <main className="page">
        <h1 className="h1">Support</h1>
        <p className="muted">Submit a ticket to support.</p>

        <form onSubmit={submit} className="max-w-xl mt-4">
          <label htmlFor="subject" className="label">Subject</label>
          <input id="subject" className="input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <label htmlFor="description" className="label mt-3">Description</label>
          <textarea id="description" className="input min-h-[120px]" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <button className="btn mt-4" disabled={submitting} aria-busy={submitting}>
            {submitting ? "Submitting…" : "Submit Ticket"}
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
