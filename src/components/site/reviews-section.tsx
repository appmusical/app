import { Star } from "lucide-react";
import { MOCK_REVIEWS, MOCK_BANDS } from "@/lib/mock-data";

export function ReviewsSection() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold sm:text-2xl">Lo que dicen los anfitriones</h2>
        <p className="text-sm text-muted">Reseñas verificadas de eventos reales</p>
      </div>

      <div className="scroll-thin -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {MOCK_REVIEWS.map((review) => {
          const band = MOCK_BANDS.find((b) => b.id === review.bandId);
          return (
            <div
              key={review.id}
              className="w-[82%] shrink-0 rounded-2xl border border-border bg-surface p-4 sm:w-auto"
            >
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < review.rating ? "fill-current" : "opacity-20"}`}
                  />
                ))}
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground">{review.comment}</p>
              <p className="mt-3 text-xs text-muted">
                <span className="font-medium text-foreground">{review.author}</span> · {review.eventType}
                {band ? ` · ${band.name}` : ""}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
