import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <section className="max-w-lg w-full rounded border border-gray-200 bg-white p-6 shadow" role="alert" aria-live="assertive">
        <h1 className="text-xl font-semibold">404 – Page Not Found</h1>
        <p className="text-gray-700 mt-2">The page you’re looking for doesn’t exist.</p>
      </section>
    </main>
  );
}
