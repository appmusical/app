"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { BandDataZone, BandDataValues } from "./band-data-zone";
import { RepresentativeZone, RepresentativeValues } from "./representative-zone";
import { VerificationZone } from "./verification-zone";
import { ApplicationSuccess } from "./application-success";

const EMPTY_BAND_DATA: BandDataValues = {
  bandName: "",
  city: "",
  genre: "",
  membersCount: "",
  yearsActive: "",
  facebookUrl: "",
  instagramUrl: "",
};

const EMPTY_REPRESENTATIVE: RepresentativeValues = {
  representativeName: "",
  representativeWhatsapp: "",
  representativeEmail: "",
};

export function ApplicationForm() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [gateEmail, setGateEmail] = useState("");
  const [gateSending, setGateSending] = useState(false);
  const [gateSent, setGateSent] = useState(false);
  const [gateError, setGateError] = useState<string | null>(null);

  const [bandData, setBandData] = useState(EMPTY_BAND_DATA);
  const [representative, setRepresentative] = useState(EMPTY_REPRESENTATIVE);
  const [idPhotoFile, setIdPhotoFile] = useState<File | null>(null);
  const [idPhotoPreview, setIdPhotoPreview] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
      setUserId(data.user?.id ?? null);
      setCheckingAuth(false);
    });
  }, []);

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGateSending(true);
    setGateError(null);
    const supabase = createClient();
    const redirectTo = new URL("/auth/callback", window.location.origin);
    redirectTo.searchParams.set("next", "/agregar-banda");
    const { error } = await supabase.auth.signInWithOtp({
      email: gateEmail,
      options: { emailRedirectTo: redirectTo.toString() },
    });
    setGateSending(false);

    if (error) {
      if (error.status === 429 || error.code === "over_email_send_rate_limit") {
        setGateError("Espera un par de minutos antes de volver a intentar — mandaste otro link hace muy poco.");
      } else {
        setGateError("No pudimos enviar el link. Verifica tu correo e intenta de nuevo.");
      }
      return;
    }

    setGateSent(true);
  }

  const isComplete =
    bandData.bandName &&
    bandData.city &&
    bandData.genre &&
    bandData.membersCount &&
    bandData.yearsActive &&
    bandData.facebookUrl &&
    bandData.instagramUrl &&
    representative.representativeName &&
    representative.representativeWhatsapp &&
    representative.representativeEmail &&
    idPhotoFile &&
    acceptedTerms;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete || !idPhotoFile || !userId) return;
    setSubmitting(true);
    setSubmitError(null);

    const supabase = createClient();

    try {
      const ext = idPhotoFile.name.split(".").pop() || "jpg";
      const path = `${userId}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("verification-ids")
        .upload(path, idPhotoFile, { contentType: idPhotoFile.type });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("band_applications").insert({
        applicant_id: userId,
        band_name: bandData.bandName,
        city: bandData.city,
        genre: bandData.genre,
        members_count: Number(bandData.membersCount),
        years_active: Number(bandData.yearsActive),
        facebook_url: bandData.facebookUrl,
        instagram_url: bandData.instagramUrl,
        representative_name: representative.representativeName,
        representative_whatsapp: representative.representativeWhatsapp,
        representative_email: representative.representativeEmail,
        representative_id_photo_url: path,
      });
      if (insertError) throw insertError;

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        err instanceof Error
          ? `No pudimos enviar la solicitud: ${err.message}`
          : "No pudimos enviar la solicitud. Intenta de nuevo."
      );
    }
  }

  if (submitted) {
    return <ApplicationSuccess bandName={bandData.bandName} />;
  }

  if (checkingAuth) {
    return <div className="mx-auto h-[70vh] max-w-xl" />;
  }

  if (!isLoggedIn) {
    if (gateSent) {
      return (
        <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-soft">
            <Mail className="h-7 w-7 text-green" />
          </span>
          <h1 className="font-display text-xl font-bold">Revisa tu correo</h1>
          <p className="mt-2.5 text-sm text-muted">
            Te enviamos un link a <b className="text-foreground">{gateEmail}</b>. Ábrelo para volver aquí y
            continuar con la solicitud.
          </p>
          <p className="mt-3 text-xs text-muted">
            ¿No lo ves? Revisa también la carpeta de <b className="text-foreground">spam o correo no deseado</b>.
          </p>
        </div>
      );
    }

    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
        <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted">
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>
        <h1 className="font-display text-2xl font-bold">Crea la cuenta de tu banda</h1>
        <p className="mt-1.5 text-sm text-muted">
          Antes de llenar la solicitud, necesitamos un correo para poder darte acceso a tu panel una vez que se
          apruebe. Es distinto de una cuenta de usuario normal.
        </p>
        <form onSubmit={handleGateSubmit} className="mt-6 flex flex-col gap-3">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
            <Input
              type="email"
              required
              value={gateEmail}
              onChange={(e) => setGateEmail(e.target.value)}
              placeholder="correo@tubanda.com"
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={gateSending || !gateEmail} className="w-full">
            {gateSending ? "Enviando…" : "Continuar"}
          </Button>
          {gateError && <p className="text-center text-xs text-accent">{gateError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 pb-16 pt-4 sm:px-6">
      <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <h1 className="font-display text-2xl font-bold">Agrega tu banda</h1>
      <p className="mt-1.5 text-sm text-muted">
        Completa estos datos para verificar tu banda. Una vez aprobada, podrás editar fotos, paquetes y
        disponibilidad desde tu propio panel.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-9">
        <BandDataZone values={bandData} onChange={setBandData} />
        <RepresentativeZone values={representative} onChange={setRepresentative} />
        <VerificationZone
          idPhotoPreview={idPhotoPreview}
          onIdPhotoChange={(file, preview) => {
            setIdPhotoFile(file);
            setIdPhotoPreview(preview);
          }}
          acceptedTerms={acceptedTerms}
          onAcceptedTermsChange={setAcceptedTerms}
        />

        <Button type="submit" disabled={!isComplete || submitting} className="w-full">
          {submitting ? "Enviando…" : "Enviar solicitud"}
        </Button>
        {submitError && <p className="text-center text-xs text-accent">{submitError}</p>}
      </form>
    </div>
  );
}
