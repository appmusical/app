import Link from "next/link";
import { Music2 } from "lucide-react";

export function BandAdminHeader({ bandName }: { bandName: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Music2 className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Tarima</span>
        </Link>
        <span className="rounded-full bg-green-soft px-3 py-1 text-xs font-semibold text-green">✓ Verificada</span>
      </div>
      <p className="mt-2 text-sm text-muted">
        Panel de <span className="font-semibold text-foreground">{bandName}</span>
      </p>
    </header>
  );
}
