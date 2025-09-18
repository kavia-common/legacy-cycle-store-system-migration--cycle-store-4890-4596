"use client";

import Protected from "@/components/Protected";
import { useAuth } from "@/lib/auth-context";
import { RoleLabels } from "@/lib/rbac";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <Protected>
      <div className="container py-10">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
        <div className="card p-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-slate-600">Name</dt>
              <dd className="font-medium">{user?.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-600">Email</dt>
              <dd className="font-medium">{user?.email}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm text-slate-600">Roles</dt>
              <dd className="font-medium">
                {user?.roles?.length
                  ? user.roles.map((r) => (
                      <span key={r} className="inline-block mr-2 mb-2 px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800">
                        {RoleLabels[r as keyof typeof RoleLabels] ?? r}
                      </span>
                    ))
                  : "No roles assigned"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Protected>
  );
}
