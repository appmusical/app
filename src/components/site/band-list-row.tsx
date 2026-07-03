import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Band } from "@/lib/types";

export function BandListRow({ band, showAvailable }: { band: Band; showAvailable?: boolean }) {
  return (
    <Link
      href={`/bandas/${band.slug}`}
      className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-2.5 transition-colors hover:border-primary hover:shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:h-16 sm:w-16">
        <Image src={band.coverImage} alt={`Foto de ${band.name}`} fill sizes="64px" className="object-cover" />
        {band.featured && (
          <span className="absolute left-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px]">
            🔥
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-display text-[15px] font-semibold text-foreground">{band.name}</p>
          <p className="shrink-0 text-[13px] font-bold text-foreground">
            ${band.priceFrom.toLocaleString("es-MX")}
          </p>
        </div>
        <p className="truncate text-xs text-muted">
          {band.city} · {band.genre}
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 gap-1.5 overflow-hidden">
            {band.specialties.slice(0, 2).map((s) => (
              <span
                key={s}
                className="shrink-0 rounded-full bg-secondary-soft px-2 py-0.5 text-[10px] font-semibold text-secondary"
              >
                {s}
              </span>
            ))}
            {showAvailable && (
              <span className="shrink-0 rounded-full bg-green-soft px-2 py-0.5 text-[10px] font-bold text-green">
                Disponible
              </span>
            )}
          </div>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {band.rating.toFixed(1)}
            <span className="font-normal text-muted-2">({band.reviewCount})</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
