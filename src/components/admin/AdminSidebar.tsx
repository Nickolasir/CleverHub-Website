"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LogoIcon } from "@/components/brand/Logo";

const adminLinks = [
  { label: "Dashboard", href: "/admin/crm", icon: "dashboard", exact: true },
  { label: "Analytics", href: "/admin/analytics", icon: "chart" },
  { label: "Inbox", href: "/admin/crm/inbox", icon: "bell" },
  { label: "Leads", href: "/admin/crm/leads", icon: "users" },
  { label: "Affiliates", href: "/admin/crm/affiliates", icon: "link" },
  { label: "Orders", href: "/admin/crm/orders", icon: "package" },
  { label: "Contacts", href: "/admin/crm/contacts", icon: "inbox" },
];

const iconMap: Record<string, React.ReactNode> = {
  chart: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  bell: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  dashboard: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  users: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  link: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  package: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  inbox: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-17.5 0V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0113.048 0c1.131.094 1.976 1.057 1.976 2.192V13.5" />
    </svg>
  ),
};

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [inboxCount, setInboxCount] = useState(0);

  useEffect(() => {
    fetch("/api/admin/consultations?status=new")
      .then((r) => r.json())
      .then((data) => setInboxCount(data.newCount ?? 0))
      .catch(() => {});

    // Poll every 60s for new consultations
    const interval = setInterval(() => {
      fetch("/api/admin/consultations?status=new")
        .then((r) => r.json())
        .then((data) => setInboxCount(data.newCount ?? 0))
        .catch(() => {});
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="flex h-full w-64 flex-col border-r border-card-border bg-warm-gray text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-white/8 px-6 py-5">
        <a href="/" className="flex items-center gap-2.5">
          <LogoIcon size={32} />
          <span className="font-[var(--font-outfit)] text-lg font-semibold tracking-tight">
            Clever<span className="text-[#D4A017]">CRM</span>
          </span>
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
          CRM
        </p>
        <div className="flex flex-col gap-1">
          {adminLinks.map((link) => {
            const isActive = (link as { exact?: boolean }).exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                {iconMap[link.icon]}
                <span className="flex-1">{link.label}</span>
                {link.icon === "bell" && inboxCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-white">
                    {inboxCount > 99 ? "99+" : inboxCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="my-4 h-px bg-white/8" />
        <Link
          href="/portal"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/40 hover:text-white/70"
        >
          &larr; Back to Portal
        </Link>
      </nav>

      {/* User */}
      <div className="border-t border-white/8 px-4 py-4">
        <p className="truncate text-xs text-white/40">{user?.email}</p>
        <button
          onClick={signOut}
          className="mt-2 text-xs font-medium text-white/30 hover:text-white/60"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
