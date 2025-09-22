"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center p-6">
          <section
            role="alert"
            aria-live="assertive"
            className="max-w-lg w-full rounded border border-red-200 bg-red-50 p-6 shadow"
          >
            <h1 className="text-xl font-semibold text-red-800 mb-2">Something went wrong</h1>
            <p className="text-red-700 mb-4">
              {error?.message || "An unexpected error occurred."}
            </p>
            <button className="btn" onClick={() => reset()}>
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
