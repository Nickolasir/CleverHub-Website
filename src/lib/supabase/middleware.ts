import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Supabase auth middleware.
 * - Refreshes the session JWT on every request
 * - Protects /portal/* (requires auth)
 * - Protects /admin/* (requires auth + CRM admin check)
 * - Redirects authenticated users away from /login
 * - Captures ?ref= affiliate referral codes into a 30-day cookie
 */
export async function updateSession(
  request: NextRequest
): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  // Capture affiliate referral code from URL
  const refCode = request.nextUrl.searchParams.get("ref");
  if (refCode) {
    response.cookies.set("cleverhub_ref", refCode, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      httpOnly: false, // Client JS needs to read this for form submission
      sameSite: "lax",
    });
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }[]
      ) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        // Preserve the ref cookie if we just set it
        if (refCode) {
          response.cookies.set("cleverhub_ref", refCode, {
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
            httpOnly: false,
            sameSite: "lax",
          });
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isPortalRoute = pathname.startsWith("/portal");
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/login";

  // Protected routes require authentication
  if ((isPortalRoute || isAdminRoute) && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes require CRM admin role
  if (isAdminRoute && user) {
    const { data: adminRow } = await supabase
      .schema("web")
      .from("crm_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!adminRow) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
  }

  // Redirect authenticated users away from login
  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  return response;
}
