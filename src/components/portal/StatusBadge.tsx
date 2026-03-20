const statusColors: Record<string, string> = {
  // Order statuses
  pending: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  paid: "bg-green-50 text-green-700 ring-green-200",
  processing: "bg-blue-50 text-blue-700 ring-blue-200",
  shipped: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  refunded: "bg-gray-50 text-gray-600 ring-gray-200",
  canceled: "bg-red-50 text-red-600 ring-red-200",
  // Subscription statuses
  trialing: "bg-purple-50 text-purple-700 ring-purple-200",
  active: "bg-green-50 text-green-700 ring-green-200",
  past_due: "bg-orange-50 text-orange-700 ring-orange-200",
  paused: "bg-gray-50 text-gray-600 ring-gray-200",
  // Lead statuses
  new: "bg-blue-50 text-blue-700 ring-blue-200",
  contacted: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  qualified: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  converted: "bg-green-50 text-green-700 ring-green-200",
  closed: "bg-gray-50 text-gray-600 ring-gray-200",
  // Affiliate statuses
  approved: "bg-green-50 text-green-700 ring-green-200",
  rejected: "bg-red-50 text-red-600 ring-red-200",
  suspended: "bg-orange-50 text-orange-700 ring-orange-200",
  // Referral statuses
  clicked: "bg-gray-50 text-gray-600 ring-gray-200",
  lead: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  consultation: "bg-blue-50 text-blue-700 ring-blue-200",
  paid_out: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function StatusBadge({ status }: { status: string }) {
  const colors = statusColors[status] ?? "bg-gray-50 text-gray-600 ring-gray-200";
  const label = status.replace(/_/g, " ");

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${colors}`}
    >
      {label}
    </span>
  );
}
