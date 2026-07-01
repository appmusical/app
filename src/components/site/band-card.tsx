import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Band } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BandCard({
  band,
  rank,
  compact = false,
}: {
  band: Band;
  rank?: number;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/bandas/${band.slug}`}
      className={cn(
        "group relative flex shrink-0 flex-col overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-card)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        compact ? "w-[168px] sm:w-[190px]" : "w-full"
      )}
    >
      <div className={cn("relative w-full overflow-hidden", compact ? "aspect-[3/4]" : "aspect-[4/5]")}>
        <Image
          src={band.coverImage}
          alt={`Foto de ${band.name}`}
          fill
          sizes={compact ? "190px" : "(min-width: 768px) 33vw, 90vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {rank && (
          <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 font-display text-sm font-bold text-accent backdrop-blur-sm">
            {rank}
          </span>
        )}

        {band.featured && !rank && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
            🔥 Top del mes
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <p className="font-display text-base font-semibold leading-tight text-white sm:text-lg">
            {band.name}
          </p>
          <p className="mt-0.5 text-xs text-white/70">{band.city} · {band.genre}</p>

          {!compact && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {band.specialties.slice(0, 2).map((s) => (
                <Badge key={s} variant="primary" className="bg-white/10 text-white backdrop-blur-sm">
                  {s}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs font-medium text-white">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              {band.rating.toFixed(1)}
              <span className="text-white/50">({band.reviewCount})</span>
            </span>
            <span className="text-xs font-semibold text-white">
              Desde ${band.priceFrom.toLocaleString("es-MX")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
