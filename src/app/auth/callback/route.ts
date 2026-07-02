import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * A esta ruta llega el clic del link mágico del correo. Intercambia el
 * código por una sesión real y redirige según el rol del perfil (o a
 * "next" si venía de un flujo específico, como agregar una banda).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      if (next) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const destination =
        profile?.role === "super_admin" ? "/admin/solicitudes" : profile?.role === "band_admin" ? "/mi-banda" : "/";
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/iniciar-sesion?error=1`);
}
