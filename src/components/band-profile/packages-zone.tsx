import { Check } from "lucide-react";
import { Package } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * ZONA: PAQUETES
 * 3 opciones de precio por presentación, con lista de inclusiones.
 * Se alimentan desde el admin de banda.
 */
export function PackagesZone({ packages }: { packages: Package[] }) {
  return (
    <section className="mt-8">
      <h2 className="mx-4 mb-3.5 text-[17px] font-bold sm:mx-6">Paquetes por presentación</h2>
      <div className="scroll-thin flex gap-2.5 overflow-x-auto px-4 pb-1 sm:px-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={cn(
              "relative w-[78%] shrink-0 rounded-2xl border bg-white p-[18px] sm:w-[280px]",
              pkg.popular ? "border-primary shadow-[var(--shadow-card)]" : "border-border"
            )}
          >
            {pkg.popular && (
              <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                Más elegido
              </span>
            )}
            <h3 className="text-[15px] font-bold">{pkg.name}</h3>
            <p className="mt-1.5 font-display text-2xl font-bold">
              ${pkg.price.toLocaleString("es-MX")} <span className="text-xs font-medium text-muted">MXN</span>
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-[12.5px] text-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
