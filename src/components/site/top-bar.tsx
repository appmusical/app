"use client";

import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { AuthStatus } from "@/components/auth/auth-status";
import { Logo } from "@/components/brand/logo";

export function TopBar({
  city,
  genre,
  query,
  availableCities,
  availableGenres,
  onCityChange,
  onGenreChange,
  onQueryChange,
  onOpenFilters,
}: {
  city: string | null;
  genre: string | null;
  query: string;
  availableCities: string[];
  availableGenres: string[];
  onCityChange: (v: string | null) => void;
  onGenreChange: (v: string | null) => void;
  onQueryChange: (v: string) => void;
  onOpenFilters: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <Logo />

          <div className="flex items-center gap-2">
            <AuthStatus />
            <Button asChild variant="secondary" size="sm" className="px-3.5">
              <Link href="/agregar-banda">
                <span className="sm:hidden">Agregar banda</span>
                <span className="hidden sm:inline">Agrega tu banda</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
            <Input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Busca una banda, artista u orquesta…"
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full sm:hidden"
            onClick={onOpenFilters}
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="grid flex-1 grid-cols-2 gap-2 sm:flex-none sm:flex">
            <NativeSelect
              aria-label="Ciudad"
              className="sm:w-[10.5rem]"
              value={city ?? "all"}
              onChange={(v) => onCityChange(v === "all" ? null : v)}
              options={[
                { value: "all", label: "Todas las ciudades" },
                ...availableCities.map((c) => ({ value: c, label: c })),
              ]}
            />

            <NativeSelect
              aria-label="Género musical"
              className="sm:w-[10.5rem]"
              value={genre ?? "all"}
              onChange={(v) => onGenreChange(v === "all" ? null : v)}
              options={[
                { value: "all", label: "Todos los géneros" },
                ...availableGenres.map((g) => ({ value: g, label: g })),
              ]}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="hidden shrink-0 items-center gap-1.5 sm:inline-flex"
            onClick={onOpenFilters}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Más filtros
          </Button>
        </div>
      </div>
    </header>
  );
}
