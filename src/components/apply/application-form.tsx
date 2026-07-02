"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [bandData, setBandData] = useState(EMPTY_BAND_DATA);
  const [representative, setRepresentative] = useState(EMPTY_REPRESENTATIVE);
  const [idPhotoFile, setIdPhotoFile] = useState<File | null>(null);
  const [idPhotoPreview, setIdPhotoPreview] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete) return;
    setSubmitting(true);
    // Mock: aquí se sube la foto a Supabase Storage y se inserta en
    // band_applications. Por ahora simulamos la confirmación.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return <ApplicationSuccess bandName={bandData.bandName} />;
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
      </form>
    </div>
  );
}
