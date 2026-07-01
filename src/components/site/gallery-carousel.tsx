"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_BANDS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = MOCK_BANDS.map((b) => ({
  slug: b.slug,
  name: b.name,
  city: b.city,
  image: b.gallery[0] ?? b.coverImage,
}));

export function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="font-display text-xl font-bold sm:text-2xl">En vivo esta temporada</h2>
          <p className="text-sm text-muted">Las mejores presentaciones, directo del escenario</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Anterior">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Siguiente">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {slides.map((s) => (
            <Link
              key={s.slug}
              href={`/bandas/${s.slug}`}
              className="relative aspect-[16/10] w-[78%] shrink-0 overflow-hidden rounded-2xl sm:w-[46%] lg:w-[31%]"
            >
              <Image src={s.image} alt={s.name} fill sizes="500px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="font-display text-lg font-semibold text-white">{s.name}</p>
                <p className="text-xs text-white/70">{s.city}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
        {slides.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selected ? "w-5 bg-primary" : "w-1.5 bg-surface-2"
            )}
          />
        ))}
      </div>
    </section>
  );
}
