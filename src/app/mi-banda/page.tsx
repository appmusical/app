import type { Metadata } from "next";
import { MOCK_BANDS } from "@/lib/mock-data";
import { BandAdminClient } from "@/components/band-admin/band-admin-client";

export const metadata: Metadata = {
  title: "Mi banda — Tarima",
};

export default function MiBandaPage() {
  // Simulación: en la versión real, esta banda se busca por owner_id del
  // usuario con sesión (band_admin), no por índice fijo.
  const band = MOCK_BANDS[0];
  return <BandAdminClient band={band} />;
}
