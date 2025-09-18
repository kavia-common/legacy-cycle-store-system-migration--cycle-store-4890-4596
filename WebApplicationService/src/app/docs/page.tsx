"use client";

export default function DocsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Documentation & Manuals</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="card p-6">
          <h2 id="quick-start" className="text-lg font-semibold mb-2">Quick Start</h2>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700">
            <li>Sign in with your organization account.</li>
            <li>Open Dashboard to see your role-based tiles.</li>
            <li>Use Products for inventory browsing and pricing.</li>
            <li>Open Support to submit issues and track responses.</li>
          </ol>
        </article>
        <article className="card p-6">
          <h2 id="api-gateway-users" className="text-lg font-semibold mb-2">Admin: Users (via API Gateway)</h2>
          <p className="text-slate-700">
            Administrators can manage users using the API Gateway endpoint <code className="px-1 py-0.5 rounded bg-slate-100">GET /users</code> (JWT required).
          </p>
        </article>
        <article className="card p-6">
          <h2 className="text-lg font-semibold mb-2">Accessibility</h2>
          <p className="text-slate-700">This UI follows WCAG 2.1 guidelines: semantic structure, keyboard navigation, visible focus, and contrast.</p>
        </article>
        <article className="card p-6">
          <h2 className="text-lg font-semibold mb-2">Security</h2>
          <p className="text-slate-700">All API calls use HTTPS with JWT. Avoid sharing tokens; sign out on shared devices.</p>
        </article>
      </div>
    </div>
  );
}
