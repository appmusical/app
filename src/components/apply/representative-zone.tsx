import { Input } from "@/components/ui/input";
import { Field } from "./field";

export interface RepresentativeValues {
  representativeName: string;
  representativeWhatsapp: string;
  representativeEmail: string;
}

/**
 * ZONA: REPRESENTANTE
 * Datos de contacto de la persona responsable de la banda — es a quien
 * el equipo de soporte contacta para aceptar o rechazar la solicitud.
 */
export function RepresentativeZone({
  values,
  onChange,
}: {
  values: RepresentativeValues;
  onChange: (values: RepresentativeValues) => void;
}) {
  function set<K extends keyof RepresentativeValues>(key: K, value: RepresentativeValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <section>
      <h2 className="mb-1 text-[17px] font-bold">Representante</h2>
      <p className="mb-4 text-[13px] text-muted">
        La persona encargada de administrar la banda en Tarima. Nuestro equipo la contactará para confirmar la
        solicitud.
      </p>
      <div className="flex flex-col gap-4">
        <Field label="Nombre completo del representante" required>
          <Input
            value={values.representativeName}
            onChange={(e) => set("representativeName", e.target.value)}
            placeholder="Nombre y apellidos"
            required
          />
        </Field>

        <Field label="WhatsApp del representante" required hint="Con lada, para poder contactarte">
          <Input
            type="tel"
            inputMode="tel"
            value={values.representativeWhatsapp}
            onChange={(e) => set("representativeWhatsapp", e.target.value)}
            placeholder="+52 55 1234 5678"
            required
          />
        </Field>

        <Field label="Correo electrónico" required>
          <Input
            type="email"
            inputMode="email"
            value={values.representativeEmail}
            onChange={(e) => set("representativeEmail", e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </Field>
      </div>
    </section>
  );
}
