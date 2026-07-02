"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginFields } from "./login-fields";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <h1 className="font-display text-2xl font-bold">Inicia sesión</h1>
      <p className="mt-1.5 text-sm text-muted">
        Con tu correo. Si es la primera vez, esto mismo crea tu cuenta — no necesitas contraseña.
      </p>

      <div className="mt-6">
        <LoginFields next={next} />
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        ¿Tienes una banda?{" "}
        <Link href="/agregar-banda" className="font-semibold text-primary">
          Regístrala aquí
        </Link>
      </p>
    </div>
  );
}
