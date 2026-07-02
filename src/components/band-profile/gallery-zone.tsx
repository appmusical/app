"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ZONA: GALERÍA
 * Imagen principal + miniaturas debajo (máximo 10, alimentadas desde el
 * admin de banda). Al tocar una miniatura, cambia la imagen principal.
 */
export function GalleryZone({ images, bandName }: { images: string[]; bandName: string }) {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-4 mt-6 sm:mx-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface">
        <Image
          src={images[active]}
          alt={`Foto de ${bandName} ${active + 1}`}
          fill
          sizes="(min-width: 640px) 640px, 100vw"
          className="object-cover"
          priority
        />
        <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {active + 1} / {images.length}
        </span>
      </div>

      <div className="scroll-thin mt-2 flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
              i === active ? "border-primary" : "border-transparent"
            )}
          >
            <Image src={src} alt={`Miniatura ${i + 1} de ${bandName}`} fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}
