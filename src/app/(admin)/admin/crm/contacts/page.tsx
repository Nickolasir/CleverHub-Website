"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/portal/StatusBadge";
import type { Lead } from "@/types/crm";
import type { Affiliate } from "@/types/affiliate";

type ContactType = "all" | "lead" | "affiliate";

interface UnifiedContact {
  id: string;
  name: string;
  email: string;
  company: string;
  type: "lead" | "affiliate";
  status: string;
  created_at: string;
  detailHref: string;
}

export default function ContactsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ContactType>("all");

  const loadData = useCallback(async () => {
    const [leadsRes, affRes] = await Promise.all([
      fetch("/api/admin/leads"),
      fetch("/api/admin/affiliates"),
    ]);
    const [leadsData, affData] = await Promise.all([leadsRes.json(), affRes.json()]);
    setLeads(leadsData.leads ?? []);
    setAffiliates(affData.affiliates ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contacts: UnifiedContact[] = useMemo(() => {
    const all: UnifiedContact[] = [];

    for (const l of leads) {
      all.push({
        id: l.id,
        name: l.name || "",
        email: l.email,
        company: l.company || "",
        type: "lead",
        status: l.status,
        created_at: l.created_at,
        detailHref: `/admin/crm/leads/${l.id}`,
      });
    }

    for (const a of affiliates) {
      all.push({
        id: a.id,
        name: a.name,
        email: a.email,
        company: a.company || "",
        type: "affiliate",
        status: a.status,
        created_at: a.created_at,
        detailHref: `/admin/crm/affiliates/${a.id}`,
      });
    }

    // Sort by created_at desc
    all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Apply filters
    return all.filter((c) => {
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [leads, affiliates, search, typeFilter]);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
        Contacts
      </h1>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-card-border bg-white py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "lead", "affiliate"] as ContactType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                typeFilter === t
                  ? "bg-foreground text-white"
                  : "bg-card text-muted ring-1 ring-card-border hover:text-foreground"
              }`}
            >
              {t === "all" ? "All" : t === "lead" ? "Leads" : "Affiliates"}
            </button>
          ))}
        </div>

        <span className="text-sm text-muted">{contacts.length} contacts</span>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : contacts.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-8 text-center">
          <p className="text-sm text-muted">
            {search ? "No contacts match your search" : "No contacts yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-card-border bg-section-alt">
                  <th className="px-5 py-3 text-xs font-medium text-muted">Name</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Email</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Company</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Type</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Date</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={`${c.type}-${c.id}`}
                    className="border-b border-card-border last:border-0 hover:bg-section-alt/50"
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {c.name || "—"}
                    </td>
                    <td className="px-5 py-3 text-muted">{c.email}</td>
                    <td className="px-5 py-3 text-muted">{c.company || "—"}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          c.type === "lead"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-purple-50 text-purple-700"
                        }`}
                      >
                        {c.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={c.detailHref}
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
