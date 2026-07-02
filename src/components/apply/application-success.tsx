import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApplicationSuccess({ bandName }: { bandName: string }) {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-soft">
        <CheckCircle2 className="h-8 w-8 text-green" />
      </span>
      <h1 className="font-display text-2xl font-bold">¡Solicitud enviada!</h1>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">
        Recibimos la solicitud de <b className="text-foreground">{bandName}</b>. Nuestro equipo va a revisar la
        información y se pondrá en contacto con el representante por WhatsApp o correo.
      </p>
      <p className="mt-4 rounded-2xl bg-surface px-4 py-3 text-xs text-muted">
        Tiempo estimado de verificación: hasta <b className="text-foreground">48 horas hábiles</b>
      </p>
      <Button asChild className="mt-6 w-full">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
