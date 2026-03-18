import { siteConfig } from "@/config/site";

const footerLinks = {
  Product: [
    { label: "CleverHome", href: "#solutions" },
    { label: "CleverHost", href: "#solutions" },
    { label: "CleverBuilding", href: "#solutions" },
    { label: "Features", href: "#features" },
  ],
  Company: [
    { label: "About", href: "#product" },
    { label: "Contact", href: "#consultation" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-card-border bg-warm-gray text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#333] to-[#555] ring-2 ring-accent/30" />
              <span className="font-[var(--font-outfit)] text-xl font-bold tracking-tight">
                CleverHub
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-sm text-white/40">
              {siteConfig.contact.address} &middot;{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-accent"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                {title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} CleverAutomations. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
