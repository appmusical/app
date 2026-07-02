import { Lock } from "lucide-react";

/**
 * ZONA: NOMBRE
 * De solo lectura — se definió en el registro/verificación. Cambiarlo
 * requiere pasar otra vez por soporte para no perder la verificación.
 */
export function BandNameZone({ name }: { name: string }) {
  return (
    <section>
      <h2 className="mb-1 text-[17px] font-bold">Nombre de la banda</h2>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5">
        <span className="font-display text-base font-semibold">{name}</span>
        <Lock className="h-4 w-4 shrink-0 text-muted" />
      </div>
      <p className="mt-2 text-xs text-muted">
        ¿Necesitas cambiarlo?{" "}
        <a href="mailto:soporte@tarima.app" className="font-semibold text-primary">
          Contacta a soporte
        </a>{" "}
        — no se puede editar aquí para proteger la verificación de tu banda.
      </p>
    </section>
  );
}
