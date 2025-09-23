import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <section className="border rounded p-6 bg-white" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold mb-2">404 – Page Not Found</h1>
        <p className="text-gray-700 mb-4">The page you’re looking for doesn’t exist.</p>
        <Link href="/dashboard" className="text-blue-600 underline">Go back to dashboard</Link>
      </section>
    </main>
  );
}
