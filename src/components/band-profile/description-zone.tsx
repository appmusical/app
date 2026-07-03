import { Band } from "@/lib/types";

const SPECIALTY_EMOJI: Record<string, string> = {
  Bodas: "💍",
  "XV años": "👑",
  Corporativo: "💼",
  "Antros y bares": "🍸",
  "Fiestas privadas": "🎉",
  Bautizos: "🕊️",
  Festivales: "🎪",
};

/**
 * ZONA: DESCRIPCIÓN
 * Texto libre + destacados (los mismos botones del Home), alimentados
 * desde el admin de banda.
 */
export function DescriptionZone({ band }: { band: Band }) {
  return (
    <section className="mx-4 mt-8 sm:mx-6">
      <h2 className="mb-2.5 text-[17px] font-bold">Sobre la banda</h2>
      <p className="text-sm leading-relaxed text-foreground">
        {band.name} lleva más de 10 años llevando la fiesta a {band.specialties.join(", ").toLowerCase()} en{" "}
        {band.city}. Repertorio {band.genre.toLowerCase()}, con agrupación en vivo completa y sonido propio incluido.
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {band.specialties.map((s) => (
          <span key={s} className="rounded-full bg-secondary-soft px-3 py-1.5 text-xs font-semibold text-secondary">
            {SPECIALTY_EMOJI[s] ?? ""} {s}
          </span>
        ))}
      </div>
    </section>
  );
}
