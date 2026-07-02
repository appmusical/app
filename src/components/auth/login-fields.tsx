"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LoginFields({ next, onSent }: { next?: string | null; onSent?: () => void }) {
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
    onSent?.();
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-soft">
          <CheckCircle2 className="h-7 w-7 text-green" />
        </span>
        <p className="font-display text-lg font-bold">Revisa tu correo</p>
        <p className="mt-1.5 text-sm text-muted">
          Te enviamos un link a <b className="text-foreground">{email}</b>. Ábrelo desde este mismo navegador para
          entrar — no hace falta que cierres esta pestaña.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
        <Input
          type="email"
          required
          autoFocus
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
      <p className="text-center text-xs text-muted">Sin contraseña — el link del correo te da acceso directo.</p>
    </form>
  );
}
