"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { KanbanBoard, type KanbanColumn } from "@/components/admin/KanbanBoard";
import { SlideOverPanel } from "@/components/admin/SlideOverPanel";
import { AddAffiliateForm } from "@/components/admin/AddAffiliateForm";
import type { Affiliate, AffiliateStatus } from "@/types/affiliate";

type ViewMode = "kanban" | "table";

const statusFilters: { label: string; value: AffiliateStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Suspended", value: "suspended" },
];

const kanbanColumns: KanbanColumn[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "suspended", label: "Suspended" },
  { id: "rejected", label: "Rejected" },
];

export default function AffiliatesAdminPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AffiliateStatus | "all">("all");
  const [view, setView] = useState<ViewMode>("kanban");
  const [addOpen, setAddOpen] = useState(false);

  const loadAffiliates = useCallback(async () => {
    const params = view === "table" && filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/admin/affiliates${params}`);
    const data = await res.json();
    setAffiliates(data.affiliates ?? []);
    setLoading(false);
  }, [filter, view]);

  useEffect(() => {
    setLoading(true);
    loadAffiliates();
  }, [loadAffiliates]);

  async function handleKanbanMove(itemId: string, newStatus: string) {
    // Optimistic update
    setAffiliates((prev) =>
      prev.map((a) =>
        a.id === itemId ? { ...a, status: newStatus as AffiliateStatus } : a
      )
    );

    await fetch("/api/admin/affiliates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemId, status: newStatus }),
    });
  }

  async function updateStatus(id: string, status: AffiliateStatus) {
    await fetch("/api/admin/affiliates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await loadAffiliates();
  }

  return (
    <div className="mx-auto max-w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
            Affiliates
          </h1>
          <span className="text-sm text-muted">{affiliates.length} total</span>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex rounded-lg bg-section-alt p-0.5">
            <button
              onClick={() => setView("kanban")}
              className={`rounded-md px-2.5 py-1.5 transition-all ${
                view === "kanban"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
              title="Kanban view"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </button>
            <button
              onClick={() => setView("table")}
              className={`rounded-md px-2.5 py-1.5 transition-all ${
                view === "table"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
              title="Table view"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
              </svg>
            </button>
          </div>

          {/* Add Affiliate */}
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Affiliate
          </button>
        </div>
      </div>

      {/* Table filters (only in table view) */}
      {view === "table" && (
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
      )}

      {/* Content */}
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : view === "kanban" ? (
        <KanbanBoard
          columns={kanbanColumns}
          items={affiliates}
          getId={(a) => a.id}
          getStatus={(a) => a.status}
          onMove={handleKanbanMove}
          renderCard={(aff) => (
            <Link href={`/admin/crm/affiliates/${aff.id}`} className="block">
              <p className="text-sm font-medium text-foreground">{aff.name}</p>
              <p className="mt-0.5 text-xs text-muted">{aff.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] capitalize text-muted">
                  {aff.profession.replace(/_/g, " ")}
                </span>
                {aff.company && (
                  <span className="text-[10px] text-muted">
                    &middot; {aff.company}
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <code className="rounded bg-section-alt px-1.5 py-0.5 text-[9px]">
                  {aff.referral_code}
                </code>
              </div>
            </Link>
          )}
        />
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
                              className="rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-100"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(aff.id, "rejected")}
                              className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {aff.status === "approved" && (
                          <button
                            onClick={() => updateStatus(aff.id, "suspended")}
                            className="rounded-md bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 hover:bg-orange-100"
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

      {/* Add Affiliate Panel */}
      <SlideOverPanel open={addOpen} onClose={() => setAddOpen(false)} title="Add New Affiliate">
        <AddAffiliateForm
          onSuccess={() => {
            setAddOpen(false);
            loadAffiliates();
          }}
          onCancel={() => setAddOpen(false)}
        />
      </SlideOverPanel>
    </div>
  );
}
