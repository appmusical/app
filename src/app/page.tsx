import { HomeClient } from "@/components/site/home-client";
import { MOCK_BANDS, CITIES, GENRES } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Ciudades y géneros reales de bandas ya aprobadas, para que los
  // filtros crezcan solos según lo que la gente vaya registrando —
  // se combinan con la lista base para que nunca se vea vacío.
  const { data: rows } = await supabase.from("bands").select("city, genre").eq("status", "aprobada");

  const realCities = (rows ?? []).map((r) => r.city).filter(Boolean);
  const realGenres = (rows ?? []).map((r) => r.genre).filter(Boolean);

  const availableCities = Array.from(new Set([...CITIES, ...realCities])).sort();
  const availableGenres = Array.from(new Set([...GENRES, ...realGenres])).sort();

  return <HomeClient bands={MOCK_BANDS} availableCities={availableCities} availableGenres={availableGenres} />;
}
