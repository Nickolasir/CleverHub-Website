"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CrmStats {
  totalLeads: number;
  leadsByStatus: Record<string, number>;
  conversionRate: number;
  activeAffiliates: number;
  pendingAffiliates: number;
  totalAffiliates: number;
  pendingPayouts: number;
  paidPayouts: number;
  totalReferrals: number;
}

interface Activity {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}

function formatAction(a: Activity): string {
  const actions: Record<string, string> = {
    lead_created: "New lead added",
    affiliate_created: "New affiliate added",
    status_changed: `Status changed to "${(a.details?.status as string) || "unknown"}"`,
    note_added: "Note added",
    payout_processed: "Payout processed",
  };
  return actions[a.action] || a.action.replace(/_/g, " ");
}

function entityLink(a: Activity): string {
  if (a.entity_type === "lead") return `/admin/crm/leads/${a.entity_id}`;
  if (a.entity_type === "affiliate") return `/admin/crm/affiliates/${a.entity_id}`;
  return "#";
}

export default function CrmDashboardPage() {
  const [stats, setStats] = useState<CrmStats | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [newConsultations, setNewConsultations] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/crm/stats").then((r) => r.json()),
      fetch("/api/admin/consultations?status=new").then((r) => r.json()),
    ]).then(([statsData, inboxData]) => {
      setStats(statsData.stats);
      setActivity(statsData.recentActivity ?? []);
      setNewConsultations(inboxData.newCount ?? 0);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-sm text-muted">Loading dashboard...</p>;
  }

  if (!stats) {
    return <p className="text-sm text-red-500">Failed to load stats</p>;
  }

  const statCards = [
    {
      label: "Total Leads",
      value: stats.totalLeads,
      subtitle: `${stats.leadsByStatus["new"] || 0} new`,
      href: "/admin/crm/leads",
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      subtitle: `${stats.leadsByStatus["converted"] || 0} converted`,
    },
    {
      label: "Active Affiliates",
      value: stats.activeAffiliates,
      subtitle: `${stats.pendingAffiliates} pending review`,
      href: "/admin/crm/affiliates",
    },
    {
      label: "Pending Payouts",
      value: `$${stats.pendingPayouts.toLocaleString()}`,
      subtitle: `$${stats.paidPayouts.toLocaleString()} paid out`,
    },
    {
      label: "Total Referrals",
      value: stats.totalReferrals,
      subtitle: `${stats.totalAffiliates} affiliates`,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
        CRM Dashboard
      </h1>

      {/* Inbox Alert */}
      {newConsultations > 0 && (
        <Link
          href="/admin/crm/inbox"
          className="mb-6 flex items-center gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-4 transition-all hover:bg-accent/10"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              {newConsultations} new consultation{newConsultations !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-muted">Click to review in your inbox</p>
          </div>
          <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      )}

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => {
          const inner = (
            <div className="rounded-2xl border border-card-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:shadow-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                {card.label}
              </p>
              <p className="mt-2 font-[var(--font-outfit)] text-3xl font-bold text-foreground">
                {card.value}
              </p>
              {card.subtitle && (
                <p className="mt-1 text-xs text-muted">{card.subtitle}</p>
              )}
            </div>
          );
          return card.href ? (
            <Link key={card.label} href={card.href}>{inner}</Link>
          ) : (
            <div key={card.label}>{inner}</div>
          );
        })}
      </div>

      {/* Pipeline Overview */}
      <div className="mb-8 rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">
          Lead Pipeline
        </h2>
        <div className="flex gap-2">
          {["new", "contacted", "qualified", "converted", "closed"].map((status) => {
            const count = stats.leadsByStatus[status] || 0;
            const total = stats.totalLeads || 1;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={status} className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {status}
                  </span>
                  <span className="text-xs font-medium text-foreground">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-section-alt">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h2 className="mb-4 font-[var(--font-outfit)] text-base font-semibold text-foreground">
          Recent Activity
        </h2>
        {activity.length === 0 ? (
          <p className="text-sm text-muted">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {activity.map((a) => (
              <Link
                key={a.id}
                href={entityLink(a)}
                className="flex items-start gap-3 rounded-lg p-2 transition-all hover:bg-section-alt/50"
              >
                <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium capitalize">{a.entity_type}</span>
                    {" — "}
                    {formatAction(a)}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(a.created_at).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
