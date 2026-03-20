"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/portal/StatusBadge";
import type { Lead } from "@/types/crm";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = useCallback(async () => {
    const res = await fetch("/api/admin/leads?source=contact_form");
    const data = await res.json();
    setContacts(data.leads ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
        Contact Form Submissions
      </h1>

      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : contacts.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-8 text-center">
          <p className="text-sm text-muted">No contact form submissions yet</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-card-border bg-section-alt">
                  <th className="px-5 py-3 text-xs font-medium text-muted">Name</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Email</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Message</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Date</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b border-card-border last:border-0 hover:bg-section-alt/50">
                    <td className="px-5 py-3 font-medium text-foreground">{c.name}</td>
                    <td className="px-5 py-3 text-muted">{c.email}</td>
                    <td className="max-w-xs truncate px-5 py-3 text-muted">{c.message}</td>
                    <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-3 text-muted">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <Link href={`/admin/crm/leads/${c.id}`} className="text-xs font-medium text-accent hover:text-accent-light">
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
