"use client";

const MAX_LENGTH = 500;

/**
 * ZONA: DESCRIPCIÓN
 * Texto libre que aparece en el perfil público, debajo de la galería.
 */
export function DescriptionZoneAdmin({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <section>
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="text-[17px] font-bold">Descripción</h2>
        <span className="text-xs text-muted">
          {value.length}/{MAX_LENGTH}
        </span>
      </div>
      <p className="mb-3 text-[13px] text-muted">Cuéntale a la gente qué hace especial a tu banda.</p>
      <textarea
        value={value}
        maxLength={MAX_LENGTH}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder="Ej. Somos una banda versátil con más de 10 años de experiencia en bodas y eventos..."
        className="w-full rounded-2xl border border-border bg-surface p-3.5 text-sm outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
      />
    </section>
  );
}
