"use client";

import { useState } from "react";

interface AddLeadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const verticals = [
  { label: "Select vertical...", value: "" },
  { label: "CleverHome", value: "clever_home" },
  { label: "CleverHost", value: "clever_host" },
  { label: "CleverBuilding", value: "clever_building" },
  { label: "CleverAide", value: "clever_aide" },
];

export function AddLeadForm({ onSuccess, onCancel }: AddLeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") || "",
      company: fd.get("company") || "",
      vertical: fd.get("vertical") || null,
      source_type: "manual",
      message: fd.get("message") || "",
    };

    const res = await fetch("/api/admin/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create lead");
      setLoading(false);
      return;
    }

    onSuccess();
  }

  const inputClass =
    "w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20";
  const labelClass = "mb-1.5 block text-xs font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div>
        <label htmlFor="lead-name" className={labelClass}>Name *</label>
        <input id="lead-name" name="name" required className={inputClass} placeholder="John Smith" />
      </div>

      <div>
        <label htmlFor="lead-email" className={labelClass}>Email *</label>
        <input id="lead-email" name="email" type="email" required className={inputClass} placeholder="john@example.com" />
      </div>

      <div>
        <label htmlFor="lead-phone" className={labelClass}>Phone</label>
        <input id="lead-phone" name="phone" type="tel" className={inputClass} placeholder="(555) 000-0000" />
      </div>

      <div>
        <label htmlFor="lead-company" className={labelClass}>Company</label>
        <input id="lead-company" name="company" className={inputClass} placeholder="Company name" />
      </div>

      <div>
        <label htmlFor="lead-vertical" className={labelClass}>Vertical</label>
        <select id="lead-vertical" name="vertical" className={inputClass}>
          {verticals.map((v) => (
            <option key={v.value} value={v.value}>{v.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lead-message" className={labelClass}>Message / Notes</label>
        <textarea id="lead-message" name="message" rows={3} className={inputClass} placeholder="Any initial notes..." />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-light disabled:opacity-50"
        >
          {loading ? "Creating..." : "Add Lead"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted ring-1 ring-card-border hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
