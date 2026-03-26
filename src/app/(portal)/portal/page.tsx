"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardCard } from "@/components/portal/DashboardCard";
import type { Affiliate, AffiliateStats } from "@/types/affiliate";

export default function PortalDashboard() {
  const { user, supabase, loading: authLoading } = useAuth();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [stats, setStats] = useState<AffiliateStats>({
    totalReferrals: 0,
    conversions: 0,
    pendingEarnings: 0,
    paidEarnings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const loadData = useCallback(async () => {
    if (!user || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data: aff } = await supabase
        .schema("web")
        .from("affiliates")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!aff) {
        setLoading(false);
        return;
      }

      setAffiliate(aff);

      const { data: refs } = await supabase
        .schema("web")
        .from("referrals")
        .select("*")
        .eq("affiliate_id", aff.id)
        .order("created_at", { ascending: false });

      const referralList = refs ?? [];

      const conversions = referralList.filter(
        (r) => r.status === "converted" || r.status === "paid_out"
      ).length;
      const pendingEarnings = referralList
        .filter((r) => r.status === "converted")
        .reduce((sum, r) => sum + Number(r.commission), 0);
      const paidEarnings = referralList
        .filter((r) => r.status === "paid_out")
        .reduce((sum, r) => sum + Number(r.commission), 0);

      setStats({
        totalReferrals: referralList.length,
        conversions,
        pendingEarnings,
        paidEarnings,
      });
    } catch {
      // Tables may not exist yet
    }
    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    if (!authLoading) loadData();
  }, [loadData, authLoading]);

  function copyLink() {
    if (!affiliate) return;
    navigator.clipboard.writeText(
      `https://cleverhub.space?ref=${affiliate.referral_code}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
        Welcome back
      </h1>
      <p className="mb-8 text-sm text-muted">{user?.email}</p>

      {loading ? (
        <div className="text-sm text-muted">Loading...</div>
      ) : !affiliate ? (
        /* Not yet an affiliate — prompt to apply */
        <div className="rounded-2xl border border-card-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <h2 className="mb-2 font-[var(--font-outfit)] text-lg font-semibold text-foreground">
            Join the Affiliate Program
          </h2>
          <p className="mb-6 text-sm text-muted">
            Earn $500 for every client you refer to CleverHub.
          </p>
          <a
            href="/affiliate"
            className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-light"
          >
            Apply Now
          </a>
        </div>
      ) : affiliate.status === "pending" ? (
        <div className="rounded-2xl border border-card-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <h2 className="mb-2 font-[var(--font-outfit)] text-lg font-semibold text-foreground">
            Application Under Review
          </h2>
          <p className="text-sm text-muted">
            We&apos;ll notify you at{" "}
            <span className="font-medium text-foreground">{affiliate.email}</span>{" "}
            within 1-2 business days.
          </p>
        </div>
      ) : affiliate.status !== "approved" ? (
        <div className="rounded-2xl border border-card-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <h2 className="mb-2 font-[var(--font-outfit)] text-lg font-semibold text-foreground">
            Account {affiliate.status === "rejected" ? "Not Approved" : "Suspended"}
          </h2>
          <p className="text-sm text-muted">
            Please contact us at nickolasir@msn.com for more information.
          </p>
        </div>
      ) : (
        /* Approved affiliate — overview dashboard */
        <>
          {/* Referral Link */}
          <div className="mb-6 rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-3 font-[var(--font-outfit)] text-sm font-semibold text-foreground">
              Your Referral Link
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 overflow-hidden rounded-lg border border-card-border bg-section-alt px-4 py-2.5">
                <p className="truncate text-sm text-foreground">
                  https://cleverhub.space?ref={affiliate.referral_code}
                </p>
              </div>
              <button
                onClick={copyLink}
                className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-accent-light"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Total Referrals", value: stats.totalReferrals },
              { label: "Conversions", value: stats.conversions },
              { label: "Pending", value: `$${stats.pendingEarnings.toLocaleString()}` },
              { label: "Paid", value: `$${stats.paidEarnings.toLocaleString()}` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-card-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <p className="text-xs text-muted">{s.label}</p>
                <p className="mt-1 font-[var(--font-outfit)] text-2xl font-semibold text-foreground">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <DashboardCard title="Quick Links">
            <div className="flex flex-col gap-2">
              <a href="/portal/affiliates" className="text-sm text-accent hover:text-accent-light">
                Referral History &rarr;
              </a>
              <a href="/portal/settings" className="text-sm text-accent hover:text-accent-light">
                Account Settings &rarr;
              </a>
            </div>
          </DashboardCard>
        </>
      )}
    </div>
  );
}
