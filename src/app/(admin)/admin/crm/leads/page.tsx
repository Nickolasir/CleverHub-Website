"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/portal/StatusBadge";
import type { Lead, LeadStatus } from "@/types/crm";

const statusFilters: { label: string; value: LeadStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Converted", value: "converted" },
  { label: "Closed", value: "closed" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");

  const loadLeads = useCallback(async () => {
    const params = filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/admin/leads${params}`);
    const data = await res.json();
    setLeads(data.leads ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    loadLeads();
  }, [loadLeads]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
          Leads
        </h1>
        <span className="text-sm text-muted">
          {leads.length} {leads.length === 1 ? "lead" : "leads"}
        </span>
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

      {/* Table */}
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
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
    </div>
  );
}
