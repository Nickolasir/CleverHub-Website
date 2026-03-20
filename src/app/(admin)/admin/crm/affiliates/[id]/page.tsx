"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { StatusBadge } from "@/components/portal/StatusBadge";
import type { Affiliate, Referral } from "@/types/affiliate";
import type { CrmNote, CrmActivity } from "@/types/crm";

export default function AffiliateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { supabase } = useAuth();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [notes, setNotes] = useState<CrmNote[]>([]);
  const [activities, setActivities] = useState<CrmActivity[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    const [affRes, refsRes, notesRes, actRes] = await Promise.all([
      supabase.schema("web").from("affiliates").select("*").eq("id", id).single(),
      supabase.schema("web").from("referrals").select("*").eq("affiliate_id", id).order("created_at", { ascending: false }),
      supabase.schema("web").from("crm_notes").select("*").eq("entity_type", "affiliate").eq("entity_id", id).order("created_at", { ascending: false }),
      supabase.schema("web").from("crm_activities").select("*").eq("entity_type", "affiliate").eq("entity_id", id).order("created_at", { ascending: false }),
    ]);

    setAffiliate(affRes.data);
    setReferrals(refsRes.data ?? []);
    setNotes(notesRes.data ?? []);
    setActivities(actRes.data ?? []);
    setLoading(false);
  }, [id, supabase]);

  useEffect(() => { loadData(); }, [loadData]);

  async function updateStatus(status: string) {
    setSaving(true);
    await fetch("/api/admin/affiliates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await loadData();
    setSaving(false);
  }

  async function processPayout(referralId: string) {
    setSaving(true);
    await fetch(`/api/admin/affiliates/${id}/payouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referral_id: referralId }),
    });
    await loadData();
    setSaving(false);
  }

  async function addNote() {
    if (!newNote.trim()) return;
    setSaving(true);
    // Use the leads notes API pattern but for affiliates
    await supabase.schema("web").from("crm_notes").insert({
      entity_type: "affiliate",
      entity_id: id,
      author_id: (await supabase.auth.getUser()).data.user?.id,
      content: newNote.trim(),
    });
    setNewNote("");
    await loadData();
    setSaving(false);
  }

  if (loading) return <p className="text-sm text-muted">Loading...</p>;
  if (!affiliate) return <p className="text-sm text-red-600">Affiliate not found</p>;

  const totalEarnings = referrals
    .filter((r) => r.status === "converted" || r.status === "paid_out")
    .reduce((sum, r) => sum + Number(r.commission), 0);

  return (
    <div className="mx-auto max-w-4xl">
      <a href="/admin/crm/affiliates" className="mb-4 inline-block text-xs text-muted hover:text-foreground">
        &larr; Back to Affiliates
      </a>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
            {affiliate.name}
          </h1>
          <p className="text-sm text-muted">{affiliate.email} &middot; {affiliate.company || "No company"}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={affiliate.status} />
          {affiliate.status === "pending" && (
            <>
              <button onClick={() => updateStatus("approved")} disabled={saving} className="rounded-md bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50">
                Approve
              </button>
              <button onClick={() => updateStatus("rejected")} disabled={saving} className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50">
                Reject
              </button>
            </>
          )}
          {affiliate.status === "approved" && (
            <button onClick={() => updateStatus("suspended")} disabled={saving} className="rounded-md bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600 hover:bg-orange-100 disabled:opacity-50">
              Suspend
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Referrals */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Referrals ({referrals.length})
              </h3>
              <span className="text-xs text-muted">
                Total: ${totalEarnings.toLocaleString()}
              </span>
            </div>
            {referrals.length === 0 ? (
              <p className="text-sm text-muted">No referrals yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-card-border text-xs text-muted">
                      <th className="pb-2 font-medium">Referred</th>
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 text-right font-medium">Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((ref) => (
                      <tr key={ref.id} className="border-b border-card-border last:border-0">
                        <td className="py-2.5">
                          <p className="font-medium text-foreground">{ref.referred_name || ref.referred_email}</p>
                        </td>
                        <td className="py-2.5 text-muted">{new Date(ref.created_at).toLocaleDateString()}</td>
                        <td className="py-2.5"><StatusBadge status={ref.status} /></td>
                        <td className="py-2.5 text-right">
                          {ref.status === "converted" ? (
                            <button
                              onClick={() => processPayout(ref.id)}
                              disabled={saving}
                              className="rounded-md bg-accent px-3 py-1 text-xs font-medium text-white hover:bg-accent-light disabled:opacity-50"
                            >
                              Pay ${Number(ref.commission).toLocaleString()}
                            </button>
                          ) : ref.status === "paid_out" ? (
                            <span className="text-xs text-green-600">
                              Paid {ref.paid_at ? new Date(ref.paid_at).toLocaleDateString() : ""}
                            </span>
                          ) : (
                            <span className="text-xs text-muted">${Number(ref.commission).toLocaleString()}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Notes</h3>
            <div className="mb-4 flex gap-2">
              <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a note..." onKeyDown={(e) => e.key === "Enter" && addNote()} className="flex-1 rounded-lg border border-card-border bg-white px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
              <button onClick={addNote} disabled={saving || !newNote.trim()} className="rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white hover:bg-accent-light disabled:opacity-50">Add</button>
            </div>
            <div className="flex flex-col gap-3">
              {notes.map((note) => (
                <div key={note.id} className="rounded-lg bg-section-alt p-3">
                  <p className="text-sm text-foreground">{note.content}</p>
                  <p className="mt-1 text-[11px] text-muted">{new Date(note.created_at).toLocaleString()}</p>
                </div>
              ))}
              {notes.length === 0 && <p className="text-xs text-muted">No notes yet</p>}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Details</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div><p className="text-xs text-muted">Phone</p><p className="text-foreground">{affiliate.phone}</p></div>
              <div><p className="text-xs text-muted">Profession</p><p className="text-foreground capitalize">{affiliate.profession.replace(/_/g, " ")}</p></div>
              <div><p className="text-xs text-muted">Referral Code</p><code className="rounded bg-section-alt px-2 py-0.5 text-xs">{affiliate.referral_code}</code></div>
              <div><p className="text-xs text-muted">Payout Method</p><p className="text-foreground capitalize">{affiliate.payout_method.replace(/_/g, " ")}</p></div>
              {affiliate.stripe_account_id && <div><p className="text-xs text-muted">Stripe Account</p><p className="truncate text-xs text-foreground">{affiliate.stripe_account_id}</p></div>}
              <div><p className="text-xs text-muted">Applied</p><p className="text-foreground">{new Date(affiliate.created_at).toLocaleDateString()}</p></div>
              {affiliate.approved_at && <div><p className="text-xs text-muted">Approved</p><p className="text-foreground">{new Date(affiliate.approved_at).toLocaleDateString()}</p></div>}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Activity</h3>
            <div className="flex flex-col gap-3">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-sm">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent/40" />
                  <div>
                    <p className="text-foreground capitalize">{act.action.replace(/_/g, " ")}</p>
                    <p className="text-[11px] text-muted">{new Date(act.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && <p className="text-xs text-muted">No activity yet</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
