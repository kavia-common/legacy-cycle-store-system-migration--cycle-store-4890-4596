import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-10">
      <section className="card p-6" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold mb-2">404 – Page Not Found</h1>
        <p className="text-slate-700 mb-4">The page you’re looking for doesn’t exist.</p>
        <Link className="btn btn-primary" href="/">Go home</Link>
      </section>
    </div>
  );
}
