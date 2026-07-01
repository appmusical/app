"use client";

import { cn } from "@/lib/utils";
import { SPECIALTIES } from "@/lib/mock-data";
import { Specialty } from "@/lib/types";

const EMOJI: Record<Specialty, string> = {
  Bodas: "💍",
  "XV años": "👑",
  Corporativo: "💼",
  "Antros y bares": "🍸",
  "Fiestas privadas": "🎉",
  Bautizos: "🕊️",
  Festivales: "🎪",
};

export function SpecialtyPills({
  active,
  onChange,
}: {
  active: Specialty | null;
  onChange: (value: Specialty | null) => void;
}) {
  return (
    <div className="scroll-thin -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          active === null
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-surface text-muted hover:text-foreground"
        )}
      >
        Todas
      </button>
      {SPECIALTIES.map((s) => (
        <button
          key={s}
          onClick={() => onChange(active === s ? null : s)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === s
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-surface text-muted hover:text-foreground"
          )}
        >
          <span className="mr-1.5">{EMOJI[s]}</span>
          {s}
        </button>
      ))}
    </div>
  );
}
