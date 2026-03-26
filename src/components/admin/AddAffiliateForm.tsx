"use client";

import { useState } from "react";

interface AddAffiliateFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const professions = [
  { label: "Select profession...", value: "" },
  { label: "Real Estate Agent", value: "real_estate_agent" },
  { label: "Interior Decorator", value: "interior_decorator" },
  { label: "Contractor", value: "contractor" },
  { label: "Property Manager", value: "property_manager" },
  { label: "Other", value: "other" },
];

export function AddAffiliateForm({ onSuccess, onCancel }: AddAffiliateFormProps) {
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
      profession: fd.get("profession") || "other",
    };

    const res = await fetch("/api/admin/affiliates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create affiliate");
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
        <label className={labelClass}>Name *</label>
        <input name="name" required className={inputClass} placeholder="Jane Doe" />
      </div>

      <div>
        <label className={labelClass}>Email *</label>
        <input name="email" type="email" required className={inputClass} placeholder="jane@example.com" />
      </div>

      <div>
        <label className={labelClass}>Phone</label>
        <input name="phone" type="tel" className={inputClass} placeholder="(555) 000-0000" />
      </div>

      <div>
        <label className={labelClass}>Company</label>
        <input name="company" className={inputClass} placeholder="Company name" />
      </div>

      <div>
        <label className={labelClass}>Profession *</label>
        <select name="profession" required className={inputClass}>
          {professions.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-light disabled:opacity-50"
        >
          {loading ? "Creating..." : "Add Affiliate"}
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
