"use client";

import { useEffect, useState } from "react";

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bedrooms: number;
  has_office: boolean;
  preferred_time_1: string;
  preferred_time_2: string;
  preferred_time_3: string;
  referral_code: string | null;
  status: string | null;
  created_at: string;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function InboxPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "reviewed">("all");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/consultations?status=${filter}`)
      .then((r) => r.json())
      .then((data) => {
        setConsultations(data.consultations ?? []);
        setLoading(false);
      });
  }, [filter]);

  async function markReviewed(id: string) {
    await fetch("/api/admin/consultations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "reviewed" }),
    });
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "reviewed" } : c))
    );
  }

  const selectedItem = consultations.find((c) => c.id === selected);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
          Consultation Inbox
        </h1>
        <div className="flex gap-1 rounded-lg bg-section-alt p-1">
          {(["all", "new", "reviewed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                filter === f
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : consultations.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-12 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-section-alt">
            <svg className="h-6 w-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-17.5 0V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0113.048 0c1.131.094 1.976 1.057 1.976 2.192V13.5" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground">No consultations</p>
          <p className="mt-1 text-xs text-muted">
            {filter === "new" ? "All caught up!" : "No consultation requests yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* List */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              {consultations.map((c) => {
                const isNew = !c.status || c.status === "new";
                const isSelected = selected === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-accent/30 bg-accent/5 shadow-md"
                        : "border-card-border bg-card shadow-[var(--shadow-card)] hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isNew && (
                          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                        )}
                        <span className="text-sm font-semibold text-foreground">
                          {c.name}
                        </span>
                      </div>
                      <span className="flex-shrink-0 text-[10px] text-muted">
                        {timeAgo(c.created_at)}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted">
                      {c.address} &middot; {c.bedrooms} bed{c.bedrooms !== 1 ? "s" : ""}
                      {c.has_office ? " + office" : ""}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {c.email}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selectedItem ? (
              <div className="sticky top-6 rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <h2 className="font-[var(--font-outfit)] text-lg font-semibold text-foreground">
                      {selectedItem.name}
                    </h2>
                    <p className="mt-0.5 text-sm text-muted">
                      Submitted {new Date(selectedItem.created_at).toLocaleString()}
                    </p>
                  </div>
                  {(!selectedItem.status || selectedItem.status === "new") && (
                    <button
                      onClick={() => markReviewed(selectedItem.id)}
                      className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-accent-light"
                    >
                      Mark Reviewed
                    </button>
                  )}
                  {selectedItem.status === "reviewed" && (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      Reviewed
                    </span>
                  )}
                </div>

                {/* Contact Info */}
                <div className="mb-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                      Email
                    </p>
                    <a
                      href={`mailto:${selectedItem.email}`}
                      className="mt-1 block text-sm font-medium text-accent hover:text-accent-light"
                    >
                      {selectedItem.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                      Phone
                    </p>
                    <a
                      href={`tel:${selectedItem.phone}`}
                      className="mt-1 block text-sm font-medium text-foreground"
                    >
                      {selectedItem.phone}
                    </a>
                  </div>
                </div>

                {/* Property */}
                <div className="mb-5 rounded-xl bg-section-alt/50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    Property
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {selectedItem.address}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {selectedItem.bedrooms} bedroom{selectedItem.bedrooms !== 1 ? "s" : ""}
                    {selectedItem.has_office ? " + home office" : ""}
                  </p>
                </div>

                {/* Preferred Times */}
                <div className="mb-5">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    Preferred Times
                  </p>
                  <div className="space-y-2">
                    {[
                      selectedItem.preferred_time_1,
                      selectedItem.preferred_time_2,
                      selectedItem.preferred_time_3,
                    ]
                      .filter(Boolean)
                      .map((t, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded-lg border border-card-border bg-white px-3 py-2"
                        >
                          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-foreground">
                            {formatTime(t)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Referral */}
                {selectedItem.referral_code && (
                  <div className="rounded-xl bg-accent/5 px-4 py-3">
                    <p className="text-xs text-muted">
                      Referred by affiliate:{" "}
                      <span className="font-medium text-accent">
                        {selectedItem.referral_code}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-card-border">
                <p className="text-sm text-muted">
                  Select a consultation to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
