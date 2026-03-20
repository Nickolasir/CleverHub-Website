"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/components/portal/StatusBadge";
import type { Lead, LeadStatus, CrmNote, CrmActivity } from "@/types/crm";
import { useAuth } from "@/hooks/useAuth";

const statusPipeline: LeadStatus[] = ["new", "contacted", "qualified", "converted", "closed"];

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { supabase } = useAuth();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<CrmNote[]>([]);
  const [activities, setActivities] = useState<CrmActivity[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    const [leadRes, notesRes, activitiesRes] = await Promise.all([
      supabase.schema("web").from("leads").select("*").eq("id", id).single(),
      supabase
        .schema("web")
        .from("crm_notes")
        .select("*")
        .eq("entity_type", "lead")
        .eq("entity_id", id)
        .order("created_at", { ascending: false }),
      supabase
        .schema("web")
        .from("crm_activities")
        .select("*")
        .eq("entity_type", "lead")
        .eq("entity_id", id)
        .order("created_at", { ascending: false }),
    ]);

    setLead(leadRes.data);
    setNotes(notesRes.data ?? []);
    setActivities(activitiesRes.data ?? []);
    setLoading(false);
  }, [id, supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function updateStatus(newStatus: LeadStatus) {
    setSaving(true);
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    await loadData();
    setSaving(false);
  }

  async function addNote() {
    if (!newNote.trim()) return;
    setSaving(true);
    await fetch(`/api/admin/leads/${id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote }),
    });
    setNewNote("");
    await loadData();
    setSaving(false);
  }

  async function updateField(field: string, value: string | null) {
    setSaving(true);
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    });
    await loadData();
    setSaving(false);
  }

  if (loading) return <p className="text-sm text-muted">Loading...</p>;
  if (!lead) return <p className="text-sm text-red-600">Lead not found</p>;

  return (
    <div className="mx-auto max-w-4xl">
      <a
        href="/admin/crm/leads"
        className="mb-4 inline-block text-xs text-muted hover:text-foreground"
      >
        &larr; Back to Leads
      </a>

      <h1 className="mb-1 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
        {lead.name || lead.email}
      </h1>
      <p className="mb-6 text-sm text-muted">{lead.email}</p>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Pipeline */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Pipeline
            </h3>
            <div className="flex gap-2">
              {statusPipeline.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={saving}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium capitalize transition-all ${
                    lead.status === s
                      ? "bg-accent text-white"
                      : statusPipeline.indexOf(s) < statusPipeline.indexOf(lead.status)
                        ? "bg-accent/10 text-accent"
                        : "bg-section-alt text-muted hover:bg-card-border/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Notes
            </h3>
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                onKeyDown={(e) => e.key === "Enter" && addNote()}
                className="flex-1 rounded-lg border border-card-border bg-white px-4 py-2 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                onClick={addNote}
                disabled={saving || !newNote.trim()}
                className="rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white hover:bg-accent-light disabled:opacity-50"
              >
                Add
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {notes.map((note) => (
                <div key={note.id} className="rounded-lg bg-section-alt p-3">
                  <p className="text-sm text-foreground">{note.content}</p>
                  <p className="mt-1 text-[11px] text-muted">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-xs text-muted">No notes yet</p>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Activity
            </h3>
            <div className="flex flex-col gap-3">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-start gap-3 text-sm"
                >
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent/40" />
                  <div>
                    <p className="text-foreground">
                      <span className="capitalize">
                        {act.action.replace(/_/g, " ")}
                      </span>
                    </p>
                    <p className="text-[11px] text-muted">
                      {new Date(act.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-xs text-muted">No activity yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <div>
                <p className="text-xs text-muted">Phone</p>
                <p className="text-foreground">{lead.phone || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Company</p>
                <p className="text-foreground">{lead.company || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Vertical</p>
                <p className="text-foreground capitalize">
                  {lead.vertical?.replace(/_/g, " ") || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted">Source</p>
                <p className="text-foreground capitalize">
                  {lead.source_type?.replace(/_/g, " ") ?? lead.source}
                </p>
              </div>
              {lead.referral_code && (
                <div>
                  <p className="text-xs text-muted">Referral Code</p>
                  <span className="rounded bg-accent/8 px-2 py-0.5 text-xs font-medium text-accent">
                    {lead.referral_code}
                  </span>
                </div>
              )}
              <div>
                <p className="text-xs text-muted">Created</p>
                <p className="text-foreground">
                  {new Date(lead.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Follow-up */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              Follow-up
            </h3>
            <input
              type="date"
              value={lead.follow_up_date?.split("T")[0] ?? ""}
              onChange={(e) =>
                updateField(
                  "follow_up_date",
                  e.target.value ? new Date(e.target.value).toISOString() : null
                )
              }
              className="w-full rounded-lg border border-card-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Current Status
            </h3>
            <StatusBadge status={lead.status} />
          </div>

          {/* Message */}
          {lead.message && (
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Message
              </h3>
              <p className="text-sm text-foreground leading-relaxed">{lead.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
