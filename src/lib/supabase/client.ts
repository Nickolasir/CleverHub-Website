import { createBrowserClient as createSSRBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function createBrowserClient(): SupabaseClient | null {
  if (browserClient) return browserClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    !supabaseUrl.startsWith("http")
  ) {
    // Missing or placeholder env vars — skip client creation
    return null;
  }

  browserClient = createSSRBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}
