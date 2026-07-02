import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Select nativo del navegador, estilizado para verse igual que el resto
 * de los controles. Se usa en vez de un popover personalizado en los
 * filtros simples (ciudad, género, orden) porque el <select> nativo abre
 * el selector propio del sistema operativo en móvil — cierra siempre
 * correctamente, sin los problemas táctiles de los popovers a medida.
 */
export function NativeSelect({
  value,
  onChange,
  options,
  className,
  "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="h-11 w-full appearance-none truncate rounded-full border border-border bg-surface pl-4 pr-9 text-sm text-foreground outline-none transition-colors hover:bg-surface-2 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}
