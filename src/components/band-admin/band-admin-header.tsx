import { Logo } from "@/components/brand/logo";

export function BandAdminHeader({ bandName }: { bandName: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Logo />
        <span className="rounded-full bg-green-soft px-3 py-1 text-xs font-semibold text-green">✓ Verificada</span>
      </div>
      <p className="mt-2 text-sm text-muted">
        Panel de <span className="font-semibold text-foreground">{bandName}</span>
      </p>
    </header>
  );
}
