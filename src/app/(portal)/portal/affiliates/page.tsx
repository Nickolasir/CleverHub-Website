"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardCard } from "@/components/portal/DashboardCard";
import { StatusBadge } from "@/components/portal/StatusBadge";
import type { Affiliate, Referral, AffiliateStats } from "@/types/affiliate";

export default function AffiliatePortalPage() {
  const { user, supabase, loading: authLoading } = useAuth();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
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
      // Get affiliate record for this user
      const { data: aff, error } = await supabase
        .schema("web")
        .from("affiliates")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error || !aff) {
        setLoading(false);
        return;
      }

      setAffiliate(aff);

      // Get referrals
      const { data: refs } = await supabase
        .schema("web")
        .from("referrals")
        .select("*")
        .eq("affiliate_id", aff.id)
        .order("created_at", { ascending: false });

    const referralList = refs ?? [];
    setReferrals(referralList);

    // Compute stats
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

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

  // Not an affiliate — show signup prompt
  if (!affiliate) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-2 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
          Affiliate Program
        </h1>
        <p className="mb-6 text-sm text-muted">
          Earn $500 for every client you refer to CleverHub.
        </p>
        <a
          href="/affiliate"
          className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-light"
        >
          Apply to Become an Affiliate
        </a>
      </div>
    );
  }

  // Pending approval
  if (affiliate.status === "pending") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-2 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
          Application Under Review
        </h1>
        <p className="text-sm text-muted">
          Your affiliate application is being reviewed. We&apos;ll notify you at{" "}
          <span className="font-medium text-foreground">{affiliate.email}</span>{" "}
          within 1-2 business days.
        </p>
      </div>
    );
  }

  // Rejected or suspended
  if (affiliate.status === "rejected" || affiliate.status === "suspended") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-2 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
          Affiliate Account {affiliate.status === "rejected" ? "Not Approved" : "Suspended"}
        </h1>
        <p className="text-sm text-muted">
          Please contact us through our consultation form for more information.
        </p>
      </div>
    );
  }

  // Approved — full dashboard
  const referralUrl = `https://cleverhub.space?ref=${affiliate.referral_code}`;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
        Affiliate Dashboard
      </h1>
      <p className="mb-8 text-sm text-muted">
        Share your link, track referrals, and earn $500 per conversion.
      </p>

      {/* Referral Link */}
      <div className="mb-6 rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h3 className="mb-3 font-[var(--font-outfit)] text-sm font-semibold text-foreground">
          Your Referral Link
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 overflow-hidden rounded-lg border border-card-border bg-section-alt px-4 py-2.5">
            <p className="truncate text-sm text-foreground">{referralUrl}</p>
          </div>
          <button
            onClick={copyLink}
            className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-xs font-medium text-white transition-all hover:bg-accent-light"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Share buttons */}
        <div className="mt-4 flex gap-3">
          <a
            href={`mailto:?subject=Check out CleverHub&body=I think you'd love CleverHub — AI-powered smart home automation. Check it out: ${encodeURIComponent(referralUrl)}`}
            className="text-xs font-medium text-accent hover:text-accent-light"
          >
            Share via Email
          </a>
          <span className="text-card-border">|</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out CleverHub — AI-powered smart home automation ${referralUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-accent hover:text-accent-light"
          >
            Share on X
          </a>
          <span className="text-card-border">|</span>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-accent hover:text-accent-light"
          >
            Share on LinkedIn
          </a>
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

      {/* Referrals Table */}
      <DashboardCard title="Referral History">
        {referrals.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted">
            No referrals yet. Share your link to get started!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-card-border text-xs text-muted">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Commission</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((ref) => (
                  <tr key={ref.id} className="border-b border-card-border last:border-0">
                    <td className="py-3 font-medium text-foreground">
                      {ref.referred_name || ref.referred_email}
                    </td>
                    <td className="py-3 text-muted">
                      {new Date(ref.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={ref.status} />
                    </td>
                    <td className="py-3 text-right text-foreground">
                      ${Number(ref.commission).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>
    </div>
  );
}
