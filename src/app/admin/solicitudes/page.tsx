import type { Metadata } from "next";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { DesktopOnlyNotice } from "@/components/admin/desktop-only-notice";
import { ApplicationsTable } from "@/components/admin/applications-table";

export const metadata: Metadata = {
  title: "Solicitudes de bandas — Admin Tarima",
};

export default function AdminSolicitudesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <DesktopOnlyNotice />
      <ApplicationsTable initialApplications={MOCK_APPLICATIONS} />
    </div>
  );
}
