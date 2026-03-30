"use client";

import { useState } from "react";
import type { ContactLog, ContactMethod, ContactDisposition, CrmEntityType } from "@/types/crm";

const METHOD_LABELS: Record<ContactMethod, string> = {
  text: "Text",
  email: "Email",
  call: "Call",
  house_visit: "House Visit",
};

const METHOD_ICONS: Record<ContactMethod, string> = {
  text: "💬",
  email: "📧",
  call: "📞",
  house_visit: "🏠",
};

const DISPOSITION_LABELS: Record<ContactDisposition, string> = {
  no_answer: "No Answer",
  left_voicemail: "Left Voicemail",
  spoke_with: "Spoke With",
  sent_message: "Sent Message",
  scheduled_callback: "Scheduled Callback",
  interested: "Interested",
  not_interested: "Not Interested",
  follow_up_needed: "Follow-up Needed",
  completed_visit: "Completed Visit",
  no_show: "No-show",
};

const DISPOSITION_COLORS: Record<ContactDisposition, string> = {
  no_answer: "bg-gray-100 text-gray-700",
  left_voicemail: "bg-yellow-50 text-yellow-700",
  spoke_with: "bg-blue-50 text-blue-700",
  sent_message: "bg-blue-50 text-blue-700",
  scheduled_callback: "bg-purple-50 text-purple-700",
  interested: "bg-green-50 text-green-700",
  not_interested: "bg-red-50 text-red-600",
  follow_up_needed: "bg-orange-50 text-orange-700",
  completed_visit: "bg-green-50 text-green-700",
  no_show: "bg-red-50 text-red-600",
};

interface ContactLogSectionProps {
  entityType: CrmEntityType;
  entityId: string;
  contacts: ContactLog[];
  onRefresh: () => void;
}

export function ContactLogSection({
  entityType,
  entityId,
  contacts,
  onRefresh,
}: ContactLogSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [method, setMethod] = useState<ContactMethod>("call");
  const [disposition, setDisposition] = useState<ContactDisposition>("spoke_with");
  const [notes, setNotes] = useState("");
  const [contactedAt, setContactedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const availableMethods: ContactMethod[] =
    entityType === "lead"
      ? ["call", "text", "email", "house_visit"]
      : ["call", "text", "email"];

  async function logContact() {
    setSaving(true);
    await fetch("/api/admin/contact-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entity_type: entityType,
        entity_id: entityId,
        contact_method: method,
        disposition,
        notes: notes || null,
        contacted_at: new Date(contactedAt).toISOString(),
      }),
    });
    setNotes("");
    setShowForm(false);
    setSaving(false);
    onRefresh();
  }

  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Contact Log ({contacts.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-light"
        >
          {showForm ? "Cancel" : "+ Log Contact"}
        </button>
      </div>

      {/* Add contact form */}
      {showForm && (
        <div className="mb-6 rounded-lg border border-card-border bg-section-alt p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Method */}
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as ContactMethod)}
                className="w-full rounded-lg border border-card-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              >
                {availableMethods.map((m) => (
                  <option key={m} value={m}>
                    {METHOD_LABELS[m]}
                  </option>
                ))}
              </select>
            </div>

            {/* Disposition */}
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">
                Disposition
              </label>
              <select
                value={disposition}
                onChange={(e) =>
                  setDisposition(e.target.value as ContactDisposition)
                }
                className="w-full rounded-lg border border-card-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              >
                {Object.entries(DISPOSITION_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date/Time */}
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-muted">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={contactedAt}
                onChange={(e) => setContactedAt(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-muted">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Details about the contact..."
                className="w-full rounded-lg border border-card-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent resize-none"
              />
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={logContact}
              disabled={saving}
              className="rounded-lg bg-accent px-5 py-2 text-xs font-medium text-white hover:bg-accent-light disabled:opacity-50"
            >
              {saving ? "Saving..." : "Log Contact"}
            </button>
          </div>
        </div>
      )}

      {/* Contact log entries */}
      <div className="flex flex-col gap-3">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="flex items-start gap-3 rounded-lg bg-section-alt p-3"
          >
            <span className="mt-0.5 text-base leading-none">
              {METHOD_ICONS[c.contact_method]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {METHOD_LABELS[c.contact_method]}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${DISPOSITION_COLORS[c.disposition]}`}
                >
                  {DISPOSITION_LABELS[c.disposition]}
                </span>
              </div>
              {c.notes && (
                <p className="mt-1 text-sm text-muted">{c.notes}</p>
              )}
              <p className="mt-1 text-[11px] text-muted">
                {new Date(c.contacted_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-xs text-muted">No contacts logged yet</p>
        )}
      </div>
    </div>
  );
}
