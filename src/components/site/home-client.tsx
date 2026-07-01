"use client";

import { useMemo, useState } from "react";
import { TopBar } from "./top-bar";
import { HeroSection } from "./hero-section";
import { SpecialtyPills } from "./specialty-pills";
import { ResultsPanel } from "./results-panel";
import { GalleryCarousel } from "./gallery-carousel";
import { RankingsSection } from "./rankings-section";
import { ReviewsSection } from "./reviews-section";
import { FiltersPanel, DEFAULT_FILTERS, FilterState } from "./filters-panel";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Band, SortOption, Specialty } from "@/lib/types";

export function HomeClient({ bands }: { bands: Band[] }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [sort, setSort] = useState<SortOption>("recomendados");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [panelOpen, setPanelOpen] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleCityChange(v: string | null) {
    setCity(v);
    setPanelOpen(true);
  }

  const filtered = useMemo(() => {
    let result = bands.filter((b) => {
      if (city && b.city !== city) return false;
      if (genre && b.genre !== genre) return false;
      if (specialty && !b.specialties.includes(specialty)) return false;
      if (b.priceFrom > filters.maxPrice) return false;
      if (b.rating < filters.minRating) return false;
      if (filters.minMembers && b.members < filters.minMembers) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (!b.name.toLowerCase().includes(q) && !b.genre.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });

    switch (sort) {
      case "precio-asc":
        result = [...result].sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case "precio-desc":
        result = [...result].sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case "alfabetico":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "destacados":
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
        break;
      default:
        result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [bands, city, genre, specialty, sort, filters, query]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <TopBar
        city={city}
        genre={genre}
        query={query}
        onCityChange={handleCityChange}
        onGenreChange={(v) => {
          setGenre(v);
          setPanelOpen(true);
        }}
        onQueryChange={setQuery}
        onOpenFilters={() => setSheetOpen(true)}
      />

      <HeroSection />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10">
        <div>
          <SpecialtyPills
            active={specialty}
            onChange={(v) => {
              setSpecialty(v);
              setPanelOpen(true);
            }}
          />
        </div>

        <ResultsPanel
          bands={filtered}
          totalCount={filtered.length}
          sort={sort}
          onSortChange={setSort}
          open={panelOpen}
          onToggle={() => setPanelOpen((v) => !v)}
        />

        <GalleryCarousel />
        <RankingsSection />
        <ReviewsSection />
      </main>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent title="Filtros">
          <FiltersPanel filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
