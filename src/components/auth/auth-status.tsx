"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import type { SupabaseClient, User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { LoginFields } from "./login-fields";

export function AuthStatus() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();
  // El cliente solo se crea en el navegador (dentro de useEffect), nunca
  // durante el render en el servidor, donde todavía no hay env vars.
  const supabaseRef = useRef<SupabaseClient | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabaseRef.current = supabase;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoaded(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // Si el usuario confirma su sesión en otra pestaña (al abrir el
      // link del correo), esta pestaña lo detecta sola y cierra el panel.
      if (session?.user) setSheetOpen(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabaseRef.current?.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (!loaded) return <div className="h-9 w-9 shrink-0 rounded-full bg-surface" />;

  if (!user) {
    return (
      <>
        <button
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-1.5 text-sm font-semibold text-foreground"
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Iniciar sesión</span>
        </button>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent title="Inicia sesión">
            <p className="-mt-2 mb-4 text-sm text-muted">
              Con tu correo. Si es la primera vez, esto mismo crea tu cuenta.
            </p>
            <LoginFields />
            <p className="mt-5 text-center text-xs text-muted">
              ¿Tienes una banda?{" "}
              <Link href="/agregar-banda" className="font-semibold text-primary" onClick={() => setSheetOpen(false)}>
                Regístrala aquí
              </Link>
            </p>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm text-muted" title={user.email}>
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Salir</span>
    </button>
  );
}
