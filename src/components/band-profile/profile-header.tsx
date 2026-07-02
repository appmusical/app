"use client";

import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";

/**
 * ZONA: ENCABEZADO
 * Barra de navegación simple del perfil (volver y compartir).
 */
export function ProfileHeader({ bandName }: { bandName: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link
        href="/"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white"
        aria-label="Volver al buscador"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <span className="max-w-[60%] truncate font-display text-[15px] font-bold">{bandName}</span>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white"
        aria-label="Compartir perfil"
      >
        <Share2 className="h-4 w-4" />
      </button>
    </header>
  );
}
