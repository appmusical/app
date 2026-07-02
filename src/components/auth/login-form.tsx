"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setErrorMsg(null);

    const supabase = createClient();
    const redirectTo = new URL("/auth/callback", window.location.origin);
    if (next) redirectTo.searchParams.set("next", next);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo.toString() },
    });

    setSending(false);
    if (error) {
      setErrorMsg("No pudimos enviar el link. Verifica tu correo e intenta de nuevo.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-soft">
          <CheckCircle2 className="h-8 w-8 text-green" />
        </span>
        <h1 className="font-display text-xl font-bold">Revisa tu correo</h1>
        <p className="mt-2.5 text-sm text-muted">
          Te enviamos un link a <b className="text-foreground">{email}</b>. Ábrelo desde este mismo dispositivo para
          entrar.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <h1 className="font-display text-2xl font-bold">Inicia sesión</h1>
      <p className="mt-1.5 text-sm text-muted">
        Con tu correo. Si es la primera vez, esto mismo crea tu cuenta — no necesitas contraseña.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className="pl-10"
          />
        </div>
        {errorMsg && <p className="text-xs text-accent">{errorMsg}</p>}
        <Button type="submit" disabled={sending || !email} className="w-full">
          {sending ? "Enviando…" : "Continuar"}
        </Button>
      </form>

      <p className="mt-5 text-center text-xs text-muted">
        ¿Tienes una banda?{" "}
        <Link href="/agregar-banda" className="font-semibold text-primary">
          Regístrala aquí
        </Link>
      </p>
    </div>
  );
}
