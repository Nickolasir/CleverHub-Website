"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { KanbanBoard, type KanbanColumn } from "@/components/admin/KanbanBoard";
import { SlideOverPanel } from "@/components/admin/SlideOverPanel";
import { AddLeadForm } from "@/components/admin/AddLeadForm";
import type { Lead, LeadStatus } from "@/types/crm";

type ViewMode = "kanban" | "table";

const statusFilters: { label: string; value: LeadStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Converted", value: "converted" },
  { label: "Closed", value: "closed" },
];

const kanbanColumns: KanbanColumn[] = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "qualified", label: "Qualified" },
  { id: "converted", label: "Converted" },
  { id: "closed", label: "Closed" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [view, setView] = useState<ViewMode>("kanban");
  const [addOpen, setAddOpen] = useState(false);

  const loadLeads = useCallback(async () => {
    // In kanban mode, always load all leads; in table mode, respect filter
    const params = view === "table" && filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/admin/leads${params}`);
    const data = await res.json();
    setLeads(data.leads ?? []);
    setLoading(false);
  }, [filter, view]);

  useEffect(() => {
    setLoading(true);
    loadLeads();
  }, [loadLeads]);

  async function handleKanbanMove(itemId: string, newStatus: string) {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === itemId ? { ...l, status: newStatus as LeadStatus } : l))
    );

    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemId, status: newStatus }),
    });
  }

  return (
    <div className="mx-auto max-w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
            Leads
          </h1>
          <span className="text-sm text-muted">
            {leads.length} {leads.length === 1 ? "lead" : "leads"}
          </span>
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

          {/* Add Lead */}
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-light"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Lead
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
          items={leads}
          getId={(l) => l.id}
          getStatus={(l) => l.status}
          onMove={handleKanbanMove}
          renderCard={(lead) => (
            <Link href={`/admin/crm/leads/${lead.id}`} className="block">
              <p className="text-sm font-medium text-foreground">
                {lead.name || lead.email}
              </p>
              {lead.name && (
                <p className="mt-0.5 text-xs text-muted">{lead.email}</p>
              )}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-muted">
                  {lead.source_type?.replace(/_/g, " ")}
                </span>
                {lead.referral_code && (
                  <span className="rounded bg-accent/8 px-1 py-0.5 text-[9px] font-medium text-accent">
                    ref
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[10px] text-muted">
                {new Date(lead.created_at).toLocaleDateString()}
              </p>
            </Link>
          )}
        />
      ) : leads.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-8 text-center">
          <p className="text-sm text-muted">No leads found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-card-border bg-section-alt">
                  <th className="px-5 py-3 text-xs font-medium text-muted">Name</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Email</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Source</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Date</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted"></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-card-border last:border-0 hover:bg-section-alt/50"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {lead.name || "—"}
                    </td>
                    <td className="px-5 py-3 text-muted">{lead.email}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs text-muted">
                        {lead.source_type?.replace(/_/g, " ") ?? lead.source}
                      </span>
                      {lead.referral_code && (
                        <span className="ml-2 rounded bg-accent/8 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                          ref:{lead.referral_code}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/crm/leads/${lead.id}`}
                        className="text-xs font-medium text-accent hover:text-accent-light"
                      >
                        View &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Lead Panel */}
      <SlideOverPanel open={addOpen} onClose={() => setAddOpen(false)} title="Add New Lead">
        <AddLeadForm
          onSuccess={() => {
            setAddOpen(false);
            loadLeads();
          }}
          onCancel={() => setAddOpen(false)}
        />
      </SlideOverPanel>
    </div>
  );
}
