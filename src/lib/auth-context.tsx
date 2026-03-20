"use client";

import { createContext, useContext } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export interface AuthContextValue {
  user: User | null;
  supabase: SupabaseClient;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
