"use client";

import { useRef } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";

const MAX_PHOTOS = 10;

/**
 * ZONA: GALERÍA
 * Hasta 10 fotos, 4:3 horizontal, 1600×1200 px recomendado.
 */
export function GalleryManagerZone({
  images,
  onAdd,
  onRemove,
}: {
  images: string[];
  onAdd: (previews: string[]) => void;
  onRemove: (index: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const remaining = MAX_PHOTOS - images.length;

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const toAdd = Array.from(files)
      .slice(0, remaining)
      .map((f) => URL.createObjectURL(f));
    onAdd(toAdd);
  }

  return (
    <section>
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="text-[17px] font-bold">Galería</h2>
        <span className="text-xs text-muted">
          {images.length}/{MAX_PHOTOS} fotos
        </span>
      </div>
      <p className="mb-3 text-[13px] text-muted">
        Horizontal, <b className="text-foreground">1600 × 1200 px</b> recomendado. JPG, PNG o WEBP, máximo 8MB cada
        una.
      </p>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {images.map((src, i) => (
          <div key={src + i} className="relative aspect-square overflow-hidden rounded-xl bg-surface">
            <Image src={src} alt={`Foto ${i + 1} de la galería`} fill sizes="120px" className="object-cover" />
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
              aria-label="Quitar foto"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {remaining > 0 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-surface text-muted"
          >
            <Plus className="h-5 w-5" />
            <span className="text-[10px] font-medium">Agregar</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </section>
  );
}
