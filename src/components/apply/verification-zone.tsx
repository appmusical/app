"use client";

import { useRef, useState } from "react";
import { Camera, ShieldCheck, X } from "lucide-react";

/**
 * ZONA: VERIFICACIÓN
 * Foto de identificación oficial del representante (solo la ve el equipo
 * de soporte, nunca es pública) + aceptación de términos. Aquí también
 * se avisa el tiempo estimado de revisión.
 */
export function VerificationZone({
  idPhotoPreview,
  onIdPhotoChange,
  acceptedTerms,
  onAcceptedTermsChange,
}: {
  idPhotoPreview: string | null;
  onIdPhotoChange: (file: File | null, preview: string | null) => void;
  acceptedTerms: boolean;
  onAcceptedTermsChange: (v: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(file: File | null) {
    if (!file) {
      onIdPhotoChange(null, null);
      setFileName(null);
      return;
    }
    const preview = URL.createObjectURL(file);
    setFileName(file.name);
    onIdPhotoChange(file, preview);
  }

  return (
    <section>
      <h2 className="mb-1 text-[17px] font-bold">Verificación</h2>
      <p className="mb-4 text-[13px] text-muted">
        Necesitamos confirmar que quien registra la banda es una persona real. Esta foto la revisa únicamente
        nuestro equipo de soporte, nunca se muestra en el perfil público.
      </p>

      <span className="mb-1.5 block text-[13px] font-semibold text-foreground">
        Foto de identificación oficial del representante <span className="text-accent">*</span>
      </span>
      <p className="mb-2.5 text-xs text-muted">INE, pasaporte o licencia — que se vea clara y completa</p>

      {idPhotoPreview ? (
        <div className="relative overflow-hidden rounded-2xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={idPhotoPreview} alt="Vista previa de identificación" className="max-h-48 w-full object-cover" />
          <button
            type="button"
            onClick={() => {
              handleFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
            aria-label="Quitar foto"
          >
            <X className="h-4 w-4" />
          </button>
          {fileName && (
            <p className="truncate border-t border-border bg-surface px-3 py-2 text-xs text-muted">{fileName}</p>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-surface px-4 py-8 text-center"
        >
          <Camera className="h-6 w-6 text-muted" />
          <span className="text-[13px] font-semibold text-foreground">Toca para subir la foto</span>
          <span className="text-xs text-muted">JPG o PNG, máximo 8MB</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      <div className="mt-5 flex items-start gap-2 rounded-2xl bg-primary-soft p-3.5">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs leading-relaxed text-foreground">
          La verificación puede tardar hasta <b>48 horas hábiles</b>. Nuestro equipo de soporte contactará al
          representante por WhatsApp o correo para confirmar los datos antes de aprobar o rechazar la solicitud.
        </p>
      </div>

      <label className="mt-4 flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => onAcceptedTermsChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
          required
        />
        <span className="text-xs text-muted">
          Confirmo que la información proporcionada es verídica y acepto que Tarima verifique estos datos antes de
          publicar el perfil de la banda.
        </span>
      </label>
    </section>
  );
}
