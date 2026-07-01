import { MOCK_BANDS } from "@/lib/mock-data";
import { BandCard } from "./band-card";

const ranked = [...MOCK_BANDS]
  .filter((b) => b.rankPosition)
  .sort((a, b) => (a.rankPosition ?? 99) - (b.rankPosition ?? 99))
  .slice(0, 5);

export function RankingsSection() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold sm:text-2xl">
          <span className="text-accent">🏆</span> Ranking de la semana
        </h2>
        <p className="text-sm text-muted">
          Las mejor calificadas por quienes ya vivieron su evento
        </p>
      </div>

      <div className="scroll-thin -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible sm:px-0">
        {ranked.map((band) => (
          <BandCard key={band.id} band={band} rank={band.rankPosition} compact />
        ))}
      </div>
    </section>
  );
}
