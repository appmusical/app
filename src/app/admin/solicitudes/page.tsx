import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { DesktopOnlyNotice } from "@/components/admin/desktop-only-notice";
import { ApplicationsTable } from "@/components/admin/applications-table";
import { AccessDenied } from "@/components/admin/access-denied";
import { BandApplication, ApplicationStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Solicitudes de bandas — Admin Tarima",
};

// Fila cruda tal como viene de la tabla band_applications en Supabase.
interface ApplicationRow {
  id: string;
  band_name: string;
  city: string;
  genre: string;
  members_count: number;
  years_active: number;
  facebook_url: string;
  instagram_url: string;
  representative_name: string;
  representative_whatsapp: string;
  representative_email: string;
  representative_id_photo_url: string;
  status: ApplicationStatus;
  rejection_reason: string | null;
  created_at: string;
}

export default async function AdminSolicitudesPage() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return <AccessDenied reason="Necesitas iniciar sesión." />;
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", userData.user.id).single();

  if (profile?.role !== "super_admin") {
    return <AccessDenied reason="Esta sección es solo para el equipo de soporte." />;
  }

  const { data: rows, error } = await supabase
    .from("band_applications")
    .select(
      "id, band_name, city, genre, members_count, years_active, facebook_url, instagram_url, representative_name, representative_whatsapp, representative_email, representative_id_photo_url, status, rejection_reason, created_at"
    )
    .order("created_at", { ascending: false })
    .returns<ApplicationRow[]>();

  if (error) {
    return <AccessDenied reason={`No pudimos cargar las solicitudes: ${error.message}`} />;
  }

  // La foto de identificación vive en un bucket privado — generamos una
  // URL firmada de corta duración solo para esta vista, para cada una.
  const applications: BandApplication[] = await Promise.all(
    (rows ?? []).map(async (row) => {
      const { data: signed } = await supabase.storage
        .from("verification-ids")
        .createSignedUrl(row.representative_id_photo_url, 60 * 10);

      return {
        id: row.id,
        bandName: row.band_name,
        city: row.city,
        genre: row.genre,
        membersCount: row.members_count,
        yearsActive: row.years_active,
        facebookUrl: row.facebook_url,
        instagramUrl: row.instagram_url,
        representativeName: row.representative_name,
        representativeWhatsapp: row.representative_whatsapp,
        representativeEmail: row.representative_email,
        representativeIdPhotoUrl: signed?.signedUrl ?? "",
        status: row.status,
        submittedAt: row.created_at,
        rejectionReason: row.rejection_reason ?? undefined,
      };
    })
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <DesktopOnlyNotice />
      <ApplicationsTable initialApplications={applications} />
    </div>
  );
}
