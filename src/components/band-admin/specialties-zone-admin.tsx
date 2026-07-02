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

/**
 * ZONA: DESTACADOS
 * Las especialidades que se muestran como botones/pills en el Home y en
 * el perfil público — se eligen aquí, se reflejan allá.
 */
export function SpecialtiesZoneAdmin({
  selected,
  onChange,
}: {
  selected: Specialty[];
  onChange: (v: Specialty[]) => void;
}) {
  function toggle(s: Specialty) {
    onChange(selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s]);
  }

  return (
    <section>
      <h2 className="mb-1 text-[17px] font-bold">Destacados</h2>
      <p className="mb-3 text-[13px] text-muted">
        Elige en qué tipo de eventos te especializas — aparecen como botones en tu perfil y ayudan a que te
        encuentren.
      </p>
      <div className="flex flex-wrap gap-2">
        {SPECIALTIES.map((s) => {
          const active = selected.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted"
              )}
            >
              {EMOJI[s]} {s}
            </button>
          );
        })}
      </div>
    </section>
  );
}
