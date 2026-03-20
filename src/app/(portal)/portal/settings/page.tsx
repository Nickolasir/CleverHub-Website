"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {
  const { user, supabase, signOut } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully.");
      setNewPassword("");
    }
    setSaving(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
        Account Settings
      </h1>

      {/* Email */}
      <div className="mb-6 rounded-2xl border border-card-border bg-card p-6">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Email</h2>
        <p className="text-sm text-muted">{user?.email}</p>
      </div>

      {/* Change Password */}
      <div className="mb-6 rounded-2xl border border-card-border bg-card p-6">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          Change Password
        </h2>
        <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password (min 6 characters)"
            minLength={6}
            required
            className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          {message && (
            <p
              className={`text-xs ${message.includes("success") ? "text-green-600" : "text-red-600"}`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-fit rounded-full bg-accent px-5 py-2 text-xs font-medium text-white hover:bg-accent-light disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Sign Out */}
      <div className="rounded-2xl border border-card-border bg-card p-6">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Session</h2>
        <button
          onClick={signOut}
          className="rounded-full border border-red-200 bg-red-50 px-5 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
