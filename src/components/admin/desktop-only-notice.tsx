import { Monitor } from "lucide-react";

export function DesktopOnlyNotice() {
  return (
    <div className="mb-5 flex items-center gap-2.5 rounded-2xl border border-amber bg-amber-soft px-4 py-3 lg:hidden">
      <Monitor className="h-4 w-4 shrink-0 text-amber" />
      <p className="text-xs text-foreground">
        El admin general está pensado para escritorio. Algunas cosas se van a ver apretadas en este tamaño de
        pantalla.
      </p>
    </div>
  );
}
