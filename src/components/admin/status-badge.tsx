import { ApplicationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<ApplicationStatus, string> = {
  pendiente: "bg-amber-soft text-amber",
  aprobada: "bg-green-soft text-green",
  rechazada: "bg-accent/10 text-accent",
};

const LABELS: Record<ApplicationStatus, string> = {
  pendiente: "Pendiente",
  aprobada: "Aprobada",
  rechazada: "Rechazada",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", STYLES[status])}>
      {LABELS[status]}
    </span>
  );
}
