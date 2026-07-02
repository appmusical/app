"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

/**
 * ZONA: LOGOTIPO
 * Cuadrado, 512×512px recomendado, PNG o WEBP con transparencia.
 */
export function LogoZone({
  logoPreview,
  onLogoChange,
}: {
  logoPreview: string | null;
  onLogoChange: (file: File | null, preview: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | null) {
    if (!file) return onLogoChange(null, null);
    onLogoChange(file, URL.createObjectURL(file));
  }

  return (
    <section>
      <h2 className="mb-1 text-[17px] font-bold">Logotipo</h2>
      <p className="mb-3 text-[13px] text-muted">
        Cuadrado, <b className="text-foreground">512 × 512 px</b> recomendado. PNG o WEBP, idealmente con fondo
        transparente. Máximo 5MB.
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-surface"
      >
        {logoPreview ? (
          <Image src={logoPreview} alt="Logo de la banda" fill sizes="112px" className="object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-1.5 text-muted">
            <Camera className="h-5 w-5" />
            <span className="text-[11px] font-medium">Subir logo</span>
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </section>
  );
}
