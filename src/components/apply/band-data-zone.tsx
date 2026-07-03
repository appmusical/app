import { Input } from "@/components/ui/input";
import { ComboboxInput } from "@/components/ui/combobox-input";
import { Field } from "./field";
import { CITIES, GENRES } from "@/lib/mock-data";

export interface BandDataValues {
  bandName: string;
  city: string;
  genre: string;
  membersCount: string;
  yearsActive: string;
  facebookUrl: string;
  instagramUrl: string;
}

/**
 * ZONA: DATOS DE LA BANDA
 * Información que ayuda a verificar que es una banda real y activa:
 * nombre, ciudad, género, número de integrantes, tiempo como banda,
 * y redes sociales (Facebook / Instagram).
 */
export function BandDataZone({
  values,
  onChange,
}: {
  values: BandDataValues;
  onChange: (values: BandDataValues) => void;
}) {
  function set<K extends keyof BandDataValues>(key: K, value: BandDataValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <section>
      <h2 className="mb-4 text-[17px] font-bold">Datos de la banda</h2>
      <div className="flex flex-col gap-4">
        <Field label="Nombre de la banda o artista" required>
          <Input
            value={values.bandName}
            onChange={(e) => set("bandName", e.target.value)}
            placeholder="Ej. Los Costeños"
            required
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Ciudad" required hint="Elige una o escribe la tuya si no aparece">
            <ComboboxInput
              listId="ciudades-sugeridas"
              value={values.city}
              onChange={(v) => set("city", v)}
              options={CITIES}
              placeholder="Ej. Cancún"
              required
            />
          </Field>
          <Field label="Género musical" required hint="Elige uno o escribe el tuyo">
            <ComboboxInput
              listId="generos-sugeridos"
              value={values.genre}
              onChange={(v) => set("genre", v)}
              options={GENRES}
              placeholder="Ej. Norteño"
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Número de integrantes" required>
            <Input
              type="number"
              min={1}
              inputMode="numeric"
              value={values.membersCount}
              onChange={(e) => set("membersCount", e.target.value)}
              placeholder="8"
              required
            />
          </Field>
          <Field label="Años como banda" required hint="Tiempo activos, no de fundación">
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              value={values.yearsActive}
              onChange={(e) => set("yearsActive", e.target.value)}
              placeholder="5"
              required
            />
          </Field>
        </div>

        <Field label="Página de Facebook" required hint="Ayuda a verificar la trayectoria de la banda">
          <Input
            type="url"
            value={values.facebookUrl}
            onChange={(e) => set("facebookUrl", e.target.value)}
            placeholder="https://facebook.com/tubanda"
            required
          />
        </Field>

        <Field label="Instagram" required>
          <Input
            type="url"
            value={values.instagramUrl}
            onChange={(e) => set("instagramUrl", e.target.value)}
            placeholder="https://instagram.com/tubanda"
            required
          />
        </Field>
      </div>
    </section>
  );
}
