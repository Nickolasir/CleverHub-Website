"use client";

import { useMemo, useContext } from "react";
import { AuthContext } from "@/lib/auth-context";
import type { SupabaseClient } from "@supabase/supabase-js";

export function useAuth() {
  const ctx = useContext(AuthContext);

  // If no AuthProvider (SSG/build time or missing Supabase config), return safe defaults
  const user = ctx?.user ?? null;
  const supabase = (ctx?.supabase ?? null) as SupabaseClient;
  const loading = ctx?.loading ?? false;
  const signOut = ctx?.signOut ?? (async () => {});

  return useMemo(() => {
    const jwt = user?.app_metadata ?? {};

    return {
      user,
      supabase,
      loading,
      signOut,
      isAuthenticated: !!user,
      tenantId: (jwt.tenant_id as string) ?? null,
      userRole: (jwt.user_role as string) ?? null,
      subscriptionActive: (jwt.subscription_active as boolean) ?? false,
      hasPaidOrder: (jwt.has_paid_order as boolean) ?? false,
    };
  }, [user, supabase, loading, signOut]);
}
