import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión — Tarima",
};

export default function IniciarSesionPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
