import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MOCK_BANDS, getPackagesForBand, getReviewsForBand, getOccupiedDaysForBand } from "@/lib/mock-data";
import { ProfileHeader } from "@/components/band-profile/profile-header";
import { IdentityZone } from "@/components/band-profile/identity-zone";
import { GalleryZone } from "@/components/band-profile/gallery-zone";
import { DescriptionZone } from "@/components/band-profile/description-zone";
import { ReviewsZone } from "@/components/band-profile/reviews-zone";
import { PackagesZone } from "@/components/band-profile/packages-zone";
import { AvailabilityZone } from "@/components/band-profile/availability-zone";

export function generateStaticParams() {
  return MOCK_BANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const band = MOCK_BANDS.find((b) => b.slug === slug);
  if (!band) return {};
  return {
    title: `${band.name} — Tarima`,
    description: band.tagline,
  };
}

export default async function BandProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const band = MOCK_BANDS.find((b) => b.slug === slug);
  if (!band) notFound();

  const packages = getPackagesForBand(band);
  const reviews = getReviewsForBand(band);
  const occupiedDays = getOccupiedDaysForBand(band);
  const galleryImages = band.gallery.length > 0 ? band.gallery : [band.coverImage];

  return (
    <div className="min-h-screen bg-background pb-24">
      <ProfileHeader bandName={band.name} />
      <IdentityZone band={band} />
      <GalleryZone images={galleryImages} bandName={band.name} />
      <DescriptionZone band={band} />
      <ReviewsZone reviews={reviews} rating={band.rating} reviewCount={band.reviewCount} />
      <PackagesZone packages={packages} />
      <AvailabilityZone occupiedDays={occupiedDays} packages={packages} />
    </div>
  );
}
