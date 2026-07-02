import { ShieldAlert } from "lucide-react";

export function AccessDenied({ reason }: { reason: string }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
        <ShieldAlert className="h-7 w-7 text-accent" />
      </span>
      <h1 className="font-display text-xl font-bold">Acceso restringido</h1>
      <p className="mt-2 text-sm text-muted">{reason}</p>
    </div>
  );
}
