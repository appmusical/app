"use client";

import { useState } from "react";
import { Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Review } from "@/lib/types";

/**
 * ZONA: RESEÑAS
 * Resumen + lista (5 visibles, botón "ver más"). Si no hay sesión iniciada,
 * en vez del formulario para calificar se muestra la invitación a
 * iniciar sesión — sin cuenta no hay reseña ni reserva.
 */
export function ReviewsZone({
  reviews,
  rating,
  reviewCount,
  isLoggedIn = false,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  isLoggedIn?: boolean;
}) {
  const [shown, setShown] = useState(5);

  return (
    <section className="mx-4 mt-8 sm:mx-6">
      <h2 className="mb-3.5 text-[17px] font-bold">Reseñas</h2>

      <div className="mb-3.5 flex items-center gap-2.5">
        <span className="font-display text-[28px] font-bold leading-none">{rating.toFixed(1)}</span>
        <div>
          <div className="flex gap-0.5 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "fill-current" : "opacity-20"}`} />
            ))}
          </div>
          <p className="text-xs text-muted">{reviewCount} reseñas verificadas</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {reviews.slice(0, shown).map((r) => (
          <div key={r.id} className="rounded-2xl border border-border p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold">{r.author}</span>
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-current" : "opacity-20"}`} />
                ))}
              </div>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-foreground">{r.comment}</p>
            <p className="mt-1.5 text-[11px] text-muted-2">{r.eventType}</p>
          </div>
        ))}
      </div>

      {shown < reviews.length && (
        <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => setShown((s) => s + 5)}>
          Ver más reseñas
        </Button>
      )}

      {isLoggedIn ? (
        <Button variant="secondary" size="sm" className="mt-4 w-full">
          Escribir una reseña
        </Button>
      ) : (
        <div className="mt-3.5 rounded-2xl border border-dashed border-border bg-surface p-4 text-center">
          <Lock className="mx-auto mb-1.5 h-5 w-5 text-muted" />
          <p className="mb-2.5 text-[13px] text-muted">
            Inicia sesión para dejar tu reseña — solo usuarios registrados que ya reservaron pueden calificar.
          </p>
          <Button size="sm">Iniciar sesión</Button>
        </div>
      )}
    </section>
  );
}
