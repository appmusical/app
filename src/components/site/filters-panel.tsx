"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FilterState {
  maxPrice: number;
  minRating: number;
  minMembers: number | null;
}

export const DEFAULT_FILTERS: FilterState = {
  maxPrice: 30000,
  minRating: 0,
  minMembers: null,
};

export function FiltersPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-sm font-semibold text-foreground">Precio máximo</p>
        <input
          type="range"
          min={5000}
          max={30000}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-primary"
        />
        <p className="mt-1 text-xs text-muted">
          Hasta ${filters.maxPrice.toLocaleString("es-MX")} MXN
        </p>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-foreground">Calificación mínima</p>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: r })}
              className={cn(
                "flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filters.minRating === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface-2 text-muted"
              )}
            >
              {r === 0 ? (
                "Todas"
              ) : (
                <>
                  <Star className="h-3 w-3 fill-current" />
                  {r}+
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-foreground">Tamaño de la agrupación</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Todos", value: null },
            { label: "Solista / dúo", value: 2 },
            { label: "Banda mediana (3-7)", value: 7 },
            { label: "Banda grande (8+)", value: 8 },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => onChange({ ...filters, minMembers: opt.value })}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filters.minMembers === opt.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface-2 text-muted"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onReset} className="mt-2">
        Limpiar filtros
      </Button>
    </div>
  );
}
