"use client";

import { Plus, X } from "lucide-react";
import { Package } from "@/lib/types";

/**
 * ZONA: PAQUETES
 * Los 3 paquetes de precio que se muestran en el perfil público, con
 * sus inclusiones editables.
 */
export function PackagesZoneAdmin({
  packages,
  onChange,
}: {
  packages: Package[];
  onChange: (packages: Package[]) => void;
}) {
  function updatePackage(id: string, patch: Partial<Package>) {
    onChange(packages.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function updateInclude(id: string, index: number, value: string) {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;
    const includes = pkg.includes.map((it, i) => (i === index ? value : it));
    updatePackage(id, { includes });
  }

  function addInclude(id: string) {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;
    updatePackage(id, { includes: [...pkg.includes, ""] });
  }

  function removeInclude(id: string, index: number) {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;
    updatePackage(
      id,
      { includes: pkg.includes.filter((_, i) => i !== index) }
    );
  }

  return (
    <section>
      <h2 className="mb-1 text-[17px] font-bold">Paquetes</h2>
      <p className="mb-3 text-[13px] text-muted">
        Los 3 precios que ve quien visita tu perfil, con lo que incluye cada uno.
      </p>

      <div className="flex flex-col gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="rounded-2xl border border-border bg-surface p-3.5">
            <div className="flex gap-2">
              <input
                value={pkg.name}
                onChange={(e) => updatePackage(pkg.id, { name: e.target.value })}
                placeholder="Nombre del paquete"
                className="flex-1 rounded-xl border border-border bg-white px-3 py-2 text-sm font-semibold outline-none focus-visible:border-primary"
              />
              <div className="flex w-32 items-center rounded-xl border border-border bg-white px-3">
                <span className="text-sm text-muted">$</span>
                <input
                  type="number"
                  min={0}
                  value={pkg.price}
                  onChange={(e) => updatePackage(pkg.id, { price: Number(e.target.value) })}
                  className="w-full bg-transparent py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {pkg.includes.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={item}
                    onChange={(e) => updateInclude(pkg.id, i, e.target.value)}
                    placeholder="Ej. 3 horas de show"
                    className="flex-1 rounded-xl border border-border bg-white px-3 py-2 text-[13px] outline-none focus-visible:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeInclude(pkg.id, i)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-white"
                    aria-label="Quitar inclusión"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addInclude(pkg.id)}
                className="flex items-center gap-1.5 self-start text-xs font-semibold text-primary"
              >
                <Plus className="h-3.5 w-3.5" /> Agregar inclusión
              </button>
            </div>

            <label className="mt-3 flex items-center gap-2 text-xs text-muted">
              <input
                type="checkbox"
                checked={pkg.popular}
                onChange={(e) =>
                  onChange(packages.map((p) => ({ ...p, popular: p.id === pkg.id ? e.target.checked : false })))
                }
                className="h-4 w-4 accent-primary"
              />
              Marcar como &quot;Más elegido&quot;
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
