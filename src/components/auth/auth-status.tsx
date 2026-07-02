"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import type { SupabaseClient, User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export function AuthStatus() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loaded, setLoaded] = useState(false);
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
      <Link href="/iniciar-sesion" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Iniciar sesión</span>
      </Link>
    );
  }

  return (
    <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm text-muted" title={user.email}>
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Salir</span>
    </button>
  );
}
