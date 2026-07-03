"use client";

import { useState } from "react";
import { ExternalLink, Mail, MessageCircle, Check, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { StatusBadge } from "./status-badge";
import { BandApplication } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

export function ApplicationsTable({ initialApplications }: { initialApplications: BandApplication[] }) {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const selected = applications.find((a) => a.id === selectedId) ?? null;
  const pendingCount = applications.filter((a) => a.status === "pendiente").length;

  async function updateStatus(id: string, status: "aprobada" | "rechazada", reason?: string) {
    setProcessing(true);
    setActionError(null);
    const supabase = createClient();

    const { error } = await supabase.rpc("review_band_application", {
      p_application_id: id,
      p_decision: status,
      p_rejection_reason: reason ?? null,
    });

    setProcessing(false);

    if (error) {
      setActionError(`No se pudo procesar: ${error.message}`);
      return;
    }

    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status, rejectionReason: reason } : a)));
    setSelectedId(null);
    setRejecting(false);
    setRejectionReason("");
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Solicitudes de bandas</h1>
          <p className="text-sm text-muted">{pendingCount} pendientes de revisión</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-xs text-muted">
              <th className="px-4 py-3 font-semibold">Banda</th>
              <th className="px-4 py-3 font-semibold">Ciudad</th>
              <th className="px-4 py-3 font-semibold">Género</th>
              <th className="px-4 py-3 font-semibold">Representante</th>
              <th className="px-4 py-3 font-semibold">Enviada</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-border last:border-0 hover:bg-surface/60">
                <td className="px-4 py-3 font-semibold">{app.bandName}</td>
                <td className="px-4 py-3 text-muted">{app.city}</td>
                <td className="px-4 py-3 text-muted">{app.genre}</td>
                <td className="px-4 py-3 text-muted">{app.representativeName}</td>
                <td className="px-4 py-3 text-muted">{formatDate(app.submittedAt)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="outline" size="sm" onClick={() => setSelectedId(app.id)}>
                    Ver detalle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Sheet
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedId(null);
            setRejecting(false);
            setRejectionReason("");
          }
        }}
      >
        {selected && (
          <SheetContent title={selected.bandName} className="sm:w-[440px]">
            <div className="mb-4">
              <StatusBadge status={selected.status} />
            </div>

            <div className="flex flex-col gap-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted">Ciudad</p>
                  <p className="font-medium">{selected.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Género</p>
                  <p className="font-medium">{selected.genre}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Integrantes</p>
                  <p className="font-medium">{selected.membersCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Años activos</p>
                  <p className="font-medium">{selected.yearsActive}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 border-t border-border pt-4">
                <a href={selected.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary">
                  <ExternalLink className="h-3.5 w-3.5" /> Facebook
                </a>
                <a href={selected.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary">
                  <ExternalLink className="h-3.5 w-3.5" /> Instagram
                </a>
              </div>

              <div className="border-t border-border pt-4">
                <p className="mb-2 text-xs font-semibold text-muted">Representante</p>
                <p className="font-medium">{selected.representativeName}</p>
                <a href={`https://wa.me/${selected.representativeWhatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="mt-1.5 flex items-center gap-2 text-primary">
                  <MessageCircle className="h-3.5 w-3.5" /> {selected.representativeWhatsapp}
                </a>
                <a href={`mailto:${selected.representativeEmail}`} className="mt-1 flex items-center gap-2 text-primary">
                  <Mail className="h-3.5 w-3.5" /> {selected.representativeEmail}
                </a>
              </div>

              <div className="border-t border-border pt-4">
                <p className="mb-2 text-xs font-semibold text-muted">Identificación oficial</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.representativeIdPhotoUrl}
                  alt={`Identificación de ${selected.representativeName}`}
                  className="w-full rounded-xl border border-border object-cover"
                />
                <p className="mt-1.5 text-[11px] text-muted">Visible solo para el equipo de soporte.</p>
              </div>
            </div>

            {selected.status === "pendiente" && (
              <div className="mt-6 border-t border-border pt-5">
                {actionError && <p className="mb-3 text-xs text-accent">{actionError}</p>}
                {rejecting ? (
                  <div className="flex flex-col gap-2.5">
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Motivo del rechazo (se le comparte al representante)"
                      className="min-h-20 w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus-visible:border-primary"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        disabled={processing}
                        onClick={() => setRejecting(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        disabled={!rejectionReason.trim() || processing}
                        onClick={() => updateStatus(selected.id, "rechazada", rejectionReason.trim())}
                      >
                        {processing ? "Procesando…" : "Confirmar rechazo"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      disabled={processing}
                      onClick={() => setRejecting(true)}
                    >
                      <XIcon className="h-3.5 w-3.5" /> Rechazar
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      disabled={processing}
                      onClick={() => updateStatus(selected.id, "aprobada")}
                    >
                      <Check className="h-3.5 w-3.5" /> {processing ? "Procesando…" : "Aceptar"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
}
