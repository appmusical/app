"use client";

import { ChevronDown, ListMusic } from "lucide-react";
import { Band, SortOption } from "@/lib/types";
import { BandListRow } from "./band-list-row";
import { SortSelect } from "./sort-select";
import { cn } from "@/lib/utils";

export function ResultsPanel({
  bands,
  totalCount,
  sort,
  onSortChange,
  open,
  onToggle,
}: {
  bands: Band[];
  totalCount: number;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="rounded-3xl border border-border bg-surface shadow-[var(--shadow-card)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 sm:px-5"
      >
        <span className="flex items-center gap-2 text-left">
          <ListMusic className="h-4 w-4 text-primary" />
          <span>
            <span className="font-display text-base font-semibold sm:text-lg">
              {totalCount} {totalCount === 1 ? "banda encontrada" : "bandas encontradas"}
            </span>
            <span className="block text-xs text-muted">
              Mostrando las {Math.min(5, totalCount)} mejores para tu búsqueda
            </span>
          </span>
        </span>
        <ChevronDown
          className={cn("h-5 w-5 shrink-0 text-muted transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="animate-panel-in border-t border-border px-4 pb-4 pt-3 sm:px-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs text-muted">Ordenar por</span>
            <SortSelect value={sort} onChange={onSortChange} />
          </div>

          {bands.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <p className="font-display text-base font-semibold">Sin resultados por ahora</p>
              <p className="max-w-xs text-sm text-muted">
                Prueba quitando algún filtro o busca en otra ciudad — seguimos sumando bandas cada semana.
              </p>
            </div>
          ) : (
            <div className="scroll-thin max-h-[68vh] overflow-y-auto pr-1 sm:max-h-[560px]">
              <div className="flex flex-col gap-2">
                {bands.slice(0, 5).map((band, i) => (
                  <BandListRow key={band.id} band={band} showAvailable={i % 2 === 0} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
