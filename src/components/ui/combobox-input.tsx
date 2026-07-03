import { Input } from "@/components/ui/input";

/**
 * Campo de texto con sugerencias nativas del navegador (datalist).
 * A diferencia de un <select>, el valor NO está limitado a la lista —
 * sirve para campos donde debe poderse agregar algo nuevo (ciudad,
 * género) sin perder las sugerencias de lo que ya existe.
 */
export function ComboboxInput({
  value,
  onChange,
  options,
  placeholder,
  listId,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
  listId: string;
  required?: boolean;
}) {
  return (
    <>
      <Input
        list={listId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
      />
      <datalist id={listId}>
        {options.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </>
  );
}
