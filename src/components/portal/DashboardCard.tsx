export function DashboardCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: { label: string; href: string };
}) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-[var(--font-outfit)] text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        {action && (
          <a
            href={action.href}
            className="text-xs font-medium text-accent hover:text-accent-light"
          >
            {action.label} &rarr;
          </a>
        )}
      </div>
      {children}
    </div>
  );
}
