"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LogoIcon } from "@/components/brand/Logo";


type AuthTab = "password" | "magic-link";

export default function LoginPage() {
  const { supabase } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("redirect") ?? "/portal";

  const [tab, setTab] = useState<AuthTab>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!supabase) {
        setError("Authentication service is unavailable. Please try again later.");
        setLoading(false);
        return;
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      router.push(redirectTo);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!supabase) {
        setError("Authentication service is unavailable. Please try again later.");
        setLoading(false);
        return;
      }

      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setMagicLinkSent(true);
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!supabase) {
        setError("Authentication service is unavailable. Please try again later.");
        setLoading(false);
        return;
      }

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setMagicLinkSent(true);
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="mb-8 text-center">
        <a href="/" className="inline-flex items-center gap-2.5">
          <LogoIcon size={40} />
          <span className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
            Clever<span className="text-[#D4A017]">Hub</span>
          </span>
        </a>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-card p-8 shadow-[var(--shadow-card)]">
        <h1 className="mb-1 font-[var(--font-outfit)] text-xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mb-6 text-sm text-muted">
          Sign in to your CleverHub account
        </p>

        {magicLinkSent ? (
          <div className="rounded-xl bg-accent/5 p-6 text-center">
            <p className="text-sm font-medium text-foreground">
              Check your email
            </p>
            <p className="mt-2 text-sm text-muted">
              We sent a {tab === "magic-link" ? "sign-in link" : "confirmation link"} to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <button
              onClick={() => {
                setMagicLinkSent(false);
                setLoading(false);
              }}
              className="mt-4 text-sm font-medium text-accent hover:text-accent-light"
            >
              Try a different method
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="mb-6 flex gap-1 rounded-lg bg-section-alt p-1">
              <button
                onClick={() => setTab("password")}
                className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                  tab === "password"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Password
              </button>
              <button
                onClick={() => setTab("magic-link")}
                className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                  tab === "magic-link"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Magic Link
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={
                tab === "password" ? handlePasswordLogin : handleMagicLink
              }
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {tab === "password" && (
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-xs font-medium text-foreground"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Your password"
                    className="w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-all hover:bg-accent-light disabled:opacity-50"
              >
                {loading
                  ? "Please wait..."
                  : tab === "password"
                    ? "Sign In"
                    : "Send Magic Link"}
              </button>

              {tab === "password" && (
                <button
                  type="button"
                  onClick={handleSignUp}
                  disabled={loading || !email || !password}
                  className="text-sm font-medium text-accent hover:text-accent-light disabled:opacity-50"
                >
                  Don&apos;t have an account? Sign up
                </button>
              )}
            </form>
          </>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        <a href="/" className="hover:text-foreground">
          &larr; Back to CleverHub
        </a>
      </p>
    </div>
  );
}
