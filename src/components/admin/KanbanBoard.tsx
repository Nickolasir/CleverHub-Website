"use client";

import { useState, useCallback, type ReactNode, type DragEvent } from "react";

export interface KanbanColumn {
  id: string;
  label: string;
}

interface KanbanBoardProps<T> {
  columns: KanbanColumn[];
  items: T[];
  getId: (item: T) => string;
  getStatus: (item: T) => string;
  renderCard: (item: T) => ReactNode;
  onMove: (itemId: string, newStatus: string) => void;
}

export function KanbanBoard<T>({
  columns,
  items,
  getId,
  getStatus,
  renderCard,
  onMove,
}: KanbanBoardProps<T>) {
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = useCallback(
    (e: DragEvent, item: T) => {
      const id = getId(item);
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
      setDraggingId(id);
    },
    [getId]
  );

  const handleDragOver = useCallback(
    (e: DragEvent, colId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (dragOverCol !== colId) setDragOverCol(colId);
    },
    [dragOverCol]
  );

  const handleDragLeave = useCallback(() => {
    setDragOverCol(null);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent, colId: string) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("text/plain");
      setDragOverCol(null);
      setDraggingId(null);
      if (itemId) onMove(itemId, colId);
    },
    [onMove]
  );

  const handleDragEnd = useCallback(() => {
    setDragOverCol(null);
    setDraggingId(null);
  }, []);

  return (
    <div className="flex min-w-0 gap-3 pb-4">
      {columns.map((col) => {
        const colItems = items.filter((i) => getStatus(i) === col.id);
        const isOver = dragOverCol === col.id;

        return (
          <div
            key={col.id}
            className={`flex min-w-0 flex-1 flex-col rounded-2xl border bg-section-alt/50 transition-all ${
              isOver
                ? "border-accent/40 ring-2 ring-accent/20"
                : "border-card-border"
            }`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            {/* Column header */}
            <div className="flex items-center justify-between border-b border-card-border px-4 py-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                {col.label}
              </h3>
              <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-medium text-muted ring-1 ring-card-border">
                {colItems.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-1 flex-col gap-2 p-3" style={{ minHeight: "8rem" }}>
              {colItems.map((item) => {
                const id = getId(item);
                return (
                  <div
                    key={id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    className={`cursor-grab rounded-xl border border-card-border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing ${
                      draggingId === id ? "opacity-40" : ""
                    }`}
                  >
                    {renderCard(item)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
