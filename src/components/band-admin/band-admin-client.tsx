"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BandAdminHeader } from "./band-admin-header";
import { LogoZone } from "./logo-zone";
import { BandNameZone } from "./band-name-zone";
import { GalleryManagerZone } from "./gallery-manager-zone";
import { DescriptionZoneAdmin } from "./description-zone-admin";
import { SpecialtiesZoneAdmin } from "./specialties-zone-admin";
import { PackagesZoneAdmin } from "./packages-zone-admin";
import { AvailabilityZoneAdmin } from "./availability-zone-admin";
import { getPackagesForBand, getOccupiedDaysForBand } from "@/lib/mock-data";
import { Band, Specialty } from "@/lib/types";

export function BandAdminClient({ band }: { band: Band }) {
  const [logoPreview, setLogoPreview] = useState<string | null>(band.coverImage);
  const [gallery, setGallery] = useState<string[]>(band.gallery);
  const [description, setDescription] = useState(
    `${band.name} lleva más de 10 años llevando la fiesta a ${band.specialties.join(", ").toLowerCase()} en ${band.city}.`
  );
  const [specialties, setSpecialties] = useState<Specialty[]>(band.specialties);
  const [packages, setPackages] = useState(() => getPackagesForBand(band));
  const [occupiedDays, setOccupiedDays] = useState(() => getOccupiedDaysForBand(band));
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  function handleSave() {
    setSaving(true);
    // Mock: aquí se sube lo nuevo a Supabase Storage y se actualiza la
    // fila de `bands` (logo_url, gallery, description, specialties).
    setTimeout(() => {
      setSaving(false);
      setSavedAt(Date.now());
    }, 700);
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <BandAdminHeader bandName={band.name} />

      <div className="mx-auto flex max-w-xl flex-col gap-8 px-4 py-6 sm:px-6">
        <LogoZone logoPreview={logoPreview} onLogoChange={(_file, preview) => setLogoPreview(preview)} />
        <BandNameZone name={band.name} />
        <GalleryManagerZone
          images={gallery}
          onAdd={(previews) => setGallery((g) => [...g, ...previews])}
          onRemove={(i) => setGallery((g) => g.filter((_, idx) => idx !== i))}
        />
        <DescriptionZoneAdmin value={description} onChange={setDescription} />
        <SpecialtiesZoneAdmin selected={specialties} onChange={setSpecialties} />
        <PackagesZoneAdmin packages={packages} onChange={setPackages} />
        <AvailabilityZoneAdmin occupiedDays={occupiedDays} onChange={setOccupiedDays} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 sm:px-6">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          {savedAt && (
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-green">
              <Check className="h-3.5 w-3.5" /> Guardado
            </span>
          )}
          <Button className="flex-1" disabled={saving} onClick={handleSave}>
            {saving ? "Guardando…" : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </div>
  );
}
