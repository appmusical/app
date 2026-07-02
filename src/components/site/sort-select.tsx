"use client";

import { NativeSelect } from "@/components/ui/native-select";
import { SortOption } from "@/lib/types";

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recomendados", label: "Recomendados" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "alfabetico", label: "Orden alfabético" },
  { value: "destacados", label: "Más destacados" },
];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <NativeSelect
      aria-label="Ordenar por"
      className="w-[10.5rem]"
      value={value}
      onChange={(v) => onChange(v as SortOption)}
      options={OPTIONS}
    />
  );
}
