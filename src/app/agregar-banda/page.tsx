import type { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/application-form";

export const metadata: Metadata = {
  title: "Agrega tu banda — Tarima",
  description: "Registra tu banda, orquesta o artista para que más personas te encuentren y reserven contigo.",
};

export default function AgregarBandaPage() {
  return <ApplicationForm />;
}
