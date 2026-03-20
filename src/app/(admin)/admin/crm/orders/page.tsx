"use client";

import { useEffect, useState, useCallback } from "react";
import { StatusBadge } from "@/components/portal/StatusBadge";

interface AdminOrder {
  id: string;
  user_id: string;
  status: string;
  hardware_total: number;
  tax: number;
  tracking_number: string | null;
  created_at: string;
  plan?: { name: string; vertical: string };
}

const statusFilters = ["all", "pending", "paid", "processing", "shipped", "delivered"];

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadOrders = useCallback(async () => {
    const params = filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/admin/orders${params}`);
    const data = await res.json();
    setOrders(data.orders ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    setLoading(true);
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-foreground">
          Orders Pipeline
        </h1>
        <span className="text-sm text-muted">{orders.length} orders</span>
      </div>

      <div className="mb-6 flex gap-2">
        {statusFilters.map((sf) => (
          <button
            key={sf}
            onClick={() => setFilter(sf)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all ${
              filter === sf
                ? "bg-foreground text-white"
                : "bg-card text-muted ring-1 ring-card-border hover:text-foreground"
            }`}
          >
            {sf}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-8 text-center">
          <p className="text-sm text-muted">No orders found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-card-border bg-section-alt">
                  <th className="px-5 py-3 text-xs font-medium text-muted">Order</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Plan</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Total</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Tracking</th>
                  <th className="px-5 py-3 text-xs font-medium text-muted">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-card-border last:border-0 hover:bg-section-alt/50">
                    <td className="px-5 py-3 font-mono text-xs text-foreground">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="px-5 py-3 text-foreground">
                      {order.plan?.name ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-foreground">
                      ${(order.hardware_total + order.tax).toFixed(2)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {order.tracking_number ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-muted">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
