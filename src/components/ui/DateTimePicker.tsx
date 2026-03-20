"use client";

import { useState, useMemo } from "react";

interface DateTimePickerProps {
  selectedSlots: string[];
  onSlotsChange: (slots: string[]) => void;
  maxSlots?: number;
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
];

function timeStringToHours(time: string): number {
  const [timePart, period] = time.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);
  let h = hours;
  if (period === "PM" && hours !== 12) h += 12;
  if (period === "AM" && hours === 12) h = 0;
  return h + minutes / 60;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function DateTimePicker({
  selectedSlots,
  onSlotsChange,
  maxSlots = 3,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const next14Days = useMemo(() => {
    const days: Date[] = [];
    const now = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      d.setHours(0, 0, 0, 0);
      days.push(d);
    }
    return days;
  }, []);

  const handleSlotClick = (date: Date, time: string) => {
    const hours = timeStringToHours(time);
    const slotDate = new Date(date);
    slotDate.setHours(Math.floor(hours), (hours % 1) * 60, 0, 0);
    const iso = slotDate.toISOString();

    if (selectedSlots.includes(iso)) {
      onSlotsChange(selectedSlots.filter((s) => s !== iso));
    } else if (selectedSlots.length < maxSlots) {
      onSlotsChange([...selectedSlots, iso]);
    }
  };

  const isSlotSelected = (date: Date, time: string): boolean => {
    const hours = timeStringToHours(time);
    const slotDate = new Date(date);
    slotDate.setHours(Math.floor(hours), (hours % 1) * 60, 0, 0);
    return selectedSlots.includes(slotDate.toISOString());
  };

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-foreground">
        Select 3 preferred consultation times{" "}
        <span className="text-muted">
          ({selectedSlots.length}/{maxSlots} selected)
        </span>
      </p>

      {/* Selected slots summary */}
      {selectedSlots.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedSlots.map((slot) => {
            const d = new Date(slot);
            return (
              <span
                key={slot}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                {d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                at{" "}
                {d.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
                <button
                  type="button"
                  onClick={() =>
                    onSlotsChange(selectedSlots.filter((s) => s !== slot))
                  }
                  className="ml-0.5 hover:text-red-500"
                  aria-label="Remove time slot"
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Date grid */}
      <div className="mb-4 flex flex-wrap gap-2">
        {next14Days.map((day) => {
          const isSelected =
            selectedDate?.toDateString() === day.toDateString();
          const dayOfWeek = day.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => setSelectedDate(day)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 ${
                isSelected
                  ? "bg-accent text-white shadow-md"
                  : isWeekend
                  ? "bg-card-border/50 text-muted hover:bg-card-border"
                  : "bg-card border border-card-border text-foreground hover:border-accent/30"
              }`}
            >
              {formatDate(day)}
            </button>
          );
        })}
      </div>

      {/* Time slots for selected date */}
      {selectedDate && (
        <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-card)]">
          <p className="mb-3 text-xs font-medium text-muted">
            Available times for {formatDate(selectedDate)}
          </p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {timeSlots.map((time) => {
              const selected = isSlotSelected(selectedDate, time);
              const disabled = !selected && selectedSlots.length >= maxSlots;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleSlotClick(selectedDate, time)}
                  disabled={disabled}
                  className={`rounded-lg px-2 py-2 text-xs font-medium transition-all ${
                    selected
                      ? "bg-accent text-white shadow-sm"
                      : disabled
                      ? "cursor-not-allowed bg-card-border/30 text-muted/50"
                      : "bg-background text-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
