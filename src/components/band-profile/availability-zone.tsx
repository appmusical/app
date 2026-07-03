"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Package } from "@/lib/types";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DOW = ["D", "L", "M", "M", "J", "V", "S"];

/**
 * ZONA: CALENDARIO / DISPONIBILIDAD
 * Mes navegable con fechas ocupadas bloqueadas. Al elegir una fecha se
 * habilita la barra fija "Reservar fecha"; al presionarla se abre la
 * hoja para elegir el paquete.
 */
export function AvailabilityZone({ occupiedDays, packages }: { occupiedDays: number[]; packages: Package[] }) {
  const [calDate, setCalDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [chosenPackage, setChosenPackage] = useState<string | null>(null);

  const year = calDate.getFullYear();
  const month = calDate.getMonth();

  const days = useMemo(() => {
    const firstDow = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const cells: { day: number | null; occupied?: boolean; past?: boolean; today?: boolean; selected?: boolean }[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
      const isPast = new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isOccupied = month === today.getMonth() && occupiedDays.includes(d);
      const isSelected =
        !!selectedDate &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === d;
      cells.push({ day: d, occupied: isOccupied || isPast, past: isPast, today: isToday, selected: isSelected });
    }
    return cells;
  }, [year, month, occupiedDays, selectedDate]);

  function selectPackage(id: string) {
    setChosenPackage(id);
  }

  function confirmPackage() {
    setSheetOpen(false);
    // Aquí seguirá el flujo real de pago con Stripe.
  }

  return (
    <section className="mx-4 mb-8 mt-8 sm:mx-6">
      <h2 className="mb-3.5 text-[17px] font-bold">Disponibilidad</h2>

      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setCalDate(new Date(year, month - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="text-sm font-bold">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={() => setCalDate(new Date(year, month + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface"
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
        {days.map((cell, i) =>
          cell.day === null ? (
            <div key={i} />
          ) : (
            <button
              key={i}
              disabled={cell.occupied}
              onClick={() => setSelectedDate(new Date(year, month, cell.day as number))}
              className={cn(
                "aspect-square rounded-lg text-[13px]",
                cell.occupied ? "bg-surface text-muted-2 line-through" : "text-foreground hover:bg-primary-soft",
                cell.today && "border border-primary font-bold",
                cell.selected && "bg-primary font-bold text-primary-foreground hover:bg-primary"
              )}
            >
              {cell.day}
            </button>
          )
        )}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-3.5">
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <i className="h-2.5 w-2.5 rounded-sm border border-primary bg-primary-soft" /> Disponible
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <i className="h-2.5 w-2.5 rounded-sm bg-surface-2" /> Ocupado
        </span>
      </div>

      {selectedDate && (
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-surface px-3.5 py-3">
          <p className="text-[13px]">
            Fecha solicitada
            <span className="block text-sm font-bold">
              {selectedDate.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </p>
          <button
            onClick={() => setSelectedDate(null)}
            className="flex h-8 items-center gap-1 rounded-full border border-border bg-surface px-3 text-xs font-medium"
          >
            <X className="h-3 w-3" /> Quitar
          </button>
        </div>
      )}

      {/* Barra fija de reserva */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 sm:px-6">
        <div className="mx-auto max-w-[720px]">
          <Button
            className="w-full"
            disabled={!selectedDate}
            onClick={() => {
              setChosenPackage(null);
              setSheetOpen(true);
            }}
          >
            {selectedDate ? "Reservar fecha" : "Selecciona una fecha primero"}
          </Button>
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent title="Elige tu paquete">
          <p className="-mt-2 mb-4 text-[13px] text-muted">
            {selectedDate &&
              `Para el ${selectedDate.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}`}
          </p>
          <div className="flex flex-col gap-2.5">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => selectPackage(pkg.id)}
                className={cn(
                  "flex items-center justify-between rounded-2xl border p-3.5 text-left",
                  chosenPackage === pkg.id ? "border-primary bg-primary-soft" : "border-border bg-surface"
                )}
              >
                <span className="text-sm font-semibold">{pkg.name}</span>
                <span className="text-[13px] text-muted">${pkg.price.toLocaleString("es-MX")}</span>
              </button>
            ))}
          </div>
          <Button className="mt-5 w-full" disabled={!chosenPackage} onClick={confirmPackage}>
            Confirmar paquete
          </Button>
        </SheetContent>
      </Sheet>
    </section>
  );
}
