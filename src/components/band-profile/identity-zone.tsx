import Image from "next/image";
import { Star } from "lucide-react";
import { Band } from "@/lib/types";

/**
 * ZONA: IDENTIDAD
 * Logo en recuadro (sin pegar a los bordes), nombre, ciudad/género,
 * badge de ranking y calificación general.
 */
export function IdentityZone({ band }: { band: Band }) {
  return (
    <section className="mx-4 mt-5 flex items-start gap-3.5 sm:mx-6">
      <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-border bg-white p-1.5 shadow-[var(--shadow-lift)]">
        <Image
          src={band.coverImage}
          alt={`Logo de ${band.name}`}
          width={80}
          height={80}
          className="h-full w-full rounded-[14px] object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <h1 className="font-display text-[22px] font-bold leading-tight">{band.name}</h1>
        <p className="mt-0.5 text-[13px] text-muted">
          {band.city} · {band.genre} · {band.members} integrantes
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {band.rankPosition && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
              🏆 #{band.rankPosition} en {band.city}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-foreground">
            <Star className="h-[11px] w-[11px] fill-accent text-accent" />
            {band.rating.toFixed(1)} ({band.reviewCount})
          </span>
        </div>
      </div>
    </section>
  );
}
