import { siteConfig } from "@/config/site";
import { LogoIcon } from "@/components/brand/Logo";

const footerLinks = {
  Product: [
    { label: "CleverHome", href: "/cleverhome" },
    { label: "CleverHost", href: "/cleverhost" },
    { label: "CleverBuilding", href: "/cleverbuilding" },
    { label: "CleverAide", href: "/cleveraide" },
    { label: "Features", href: "#features" },
  ],
  Partners: [
    { label: "Affiliate Program", href: "/affiliate" },
    { label: "Client Portal", href: "/portal" },
  ],
  Company: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-warm-gray text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2.5">
              <LogoIcon size={32} />
              <span className="font-[var(--font-outfit)] text-lg font-semibold tracking-tight">
                Clever<span className="text-[#D4A017]">Hub</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-sm text-white/40">
              {siteConfig.contact.address} &middot;{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline decoration-white/20 underline-offset-2 transition-all duration-300 hover:text-accent hover:decoration-accent/40"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                {title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 underline decoration-white/20 underline-offset-2 transition-all duration-300 hover:text-white hover:decoration-white/60"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/8 pt-8 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} CleverHub. All rights
          reserved.
          <span className="mx-2 text-white/10">&middot;</span>
          <a
            href="/login?redirect=/admin/crm"
            className="text-white/15 transition-colors duration-300 hover:text-white/30"
          >
            Manage
          </a>
        </div>
      </div>
    </footer>
  );
}
