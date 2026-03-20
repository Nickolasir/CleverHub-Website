"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/portal/StatusBadge";
import type { Affiliate, AffiliateStatus } from "@/types/affiliate";

const statusFilters: { label: string; value: AffiliateStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Suspended", value: "suspended" },
];

export default function AffiliatesAdminPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AffiliateStatus | "all">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadAffiliates = useCallback(async () => {
    const params = filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/admin/affiliates${params}`);
    const data = await res.json();
    setAffiliates(data.affiliates ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    loadAffiliates();
  }, [loadAffiliates]);

  async function updateStatus(id: string, status: AffiliateStatus) {
    setActionLoading(id);
    await fetch("/api/admin/affiliates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await loadAffiliates();
    setActionLoading(null);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
          Affiliates
        </h1>
        <span className="text-sm text-muted">{affiliates.length} total</span>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {statusFilters.map((sf) => (
          <button
            key={sf.value}
            onClick={() => setFilter(sf.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              filter === sf.value
                ? "bg-foreground text-white"
                : "bg-card text-muted ring-1 ring-card-border hover:text-foreground"
            }`}
          >
            {sf.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : affiliates.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-8 text-center">
          <p className="text-sm text-muted">No affiliates found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-card-border bg-section-alt">
                  <th className="px-5 py-3 text-xs font-medium text-muted">Name</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Company</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Profession</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Code</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((aff) => (
                  <tr
                    key={aff.id}
                    className="border-b border-card-border last:border-0 hover:bg-section-alt/50"
                  >
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground">{aff.name}</p>
                      <p className="text-xs text-muted">{aff.email}</p>
                    </td>
                    <td className="px-5 py-3 text-muted">{aff.company || "—"}</td>
                    <td className="px-5 py-3 text-muted capitalize">
                      {aff.profession.replace(/_/g, " ")}
                    </td>
                    <td className="px-5 py-3">
                      <code className="rounded bg-section-alt px-2 py-0.5 text-xs">
                        {aff.referral_code}
                      </code>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={aff.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {aff.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(aff.id, "approved")}
                              disabled={actionLoading === aff.id}
                              className="rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(aff.id, "rejected")}
                              disabled={actionLoading === aff.id}
                              className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {aff.status === "approved" && (
                          <button
                            onClick={() => updateStatus(aff.id, "suspended")}
                            disabled={actionLoading === aff.id}
                            className="rounded-md bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 hover:bg-orange-100 disabled:opacity-50"
                          >
                            Suspend
                          </button>
                        )}
                        <Link
                          href={`/admin/crm/affiliates/${aff.id}`}
                          className="text-xs font-medium text-accent hover:text-accent-light"
                        >
                          Detail &rarr;
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
