"use client";

import Link from "next/link";
import { Music2, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CITIES, GENRES } from "@/lib/mock-data";

export function TopBar({
  city,
  genre,
  query,
  onCityChange,
  onGenreChange,
  onQueryChange,
  onOpenFilters,
}: {
  city: string | null;
  genre: string | null;
  query: string;
  onCityChange: (v: string | null) => void;
  onGenreChange: (v: string | null) => void;
  onQueryChange: (v: string) => void;
  onOpenFilters: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Music2 className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">Tarima</span>
          </Link>

          <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
            Registra tu banda
          </Button>
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

        <div className="flex flex-wrap items-center gap-2">
          <Select value={city ?? "all"} onValueChange={(v) => onCityChange(v === "all" ? null : v)}>
            <SelectTrigger className="w-auto min-w-[9.5rem]">
              <SelectValue placeholder="Ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ciudades</SelectItem>
              {CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={genre ?? "all"} onValueChange={(v) => onGenreChange(v === "all" ? null : v)}>
            <SelectTrigger className="w-auto min-w-[9.5rem]">
              <SelectValue placeholder="Género musical" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los géneros</SelectItem>
              {GENRES.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="hidden items-center gap-1.5 sm:inline-flex"
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
