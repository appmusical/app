"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DOW = ["D", "L", "M", "M", "J", "V", "S"];

/**
 * ZONA: DISPONIBILIDAD
 * Calendario donde la banda marca sus fechas ocupadas — lo que se
 * bloquea aquí se ve como "no disponible" en el perfil público.
 */
export function AvailabilityZoneAdmin({
  occupiedDays,
  onChange,
}: {
  occupiedDays: number[];
  onChange: (days: number[]) => void;
}) {
  const [calDate, setCalDate] = useState(() => new Date());
  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

  const days = useMemo(() => {
    const firstDow = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { day: number | null }[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ day: null });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });
    return cells;
  }, [year, month]);

  function toggleDay(day: number) {
    if (!isCurrentMonth) return; // el mock solo maneja el mes en curso
    onChange(occupiedDays.includes(day) ? occupiedDays.filter((d) => d !== day) : [...occupiedDays, day]);
  }

  return (
    <section>
      <h2 className="mb-1 text-[17px] font-bold">Disponibilidad</h2>
      <p className="mb-3 text-[13px] text-muted">Toca una fecha para marcarla como ocupada o liberarla de nuevo.</p>

      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setCalDate(new Date(year, month - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="text-sm font-bold">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={() => setCalDate(new Date(year, month + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {DOW.map((d, i) => (
          <div key={i} className="pb-1 text-[10px] font-semibold text-muted-2">
            {d}
          </div>
        ))}
        {days.map((cell, i) => {
          const occupied = isCurrentMonth && cell.day !== null && occupiedDays.includes(cell.day);
          return cell.day === null ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              onClick={() => toggleDay(cell.day as number)}
              disabled={!isCurrentMonth}
              className={cn(
                "aspect-square rounded-lg text-[13px]",
                occupied ? "bg-accent font-bold text-accent-foreground" : "bg-surface text-foreground hover:bg-primary-soft",
                !isCurrentMonth && "opacity-40"
              )}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      {!isCurrentMonth && (
        <p className="mt-3 text-xs text-muted">
          Por ahora solo puedes editar el mes en curso en esta simulación.
        </p>
      )}

      <div className="mt-3.5 flex gap-3.5">
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <i className="h-2.5 w-2.5 rounded-sm bg-surface" /> Disponible
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <i className="h-2.5 w-2.5 rounded-sm bg-accent" /> Ocupada
        </span>
      </div>
    </section>
  );
}
