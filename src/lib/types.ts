export type Specialty =
  | "Bodas"
  | "XV años"
  | "Corporativo"
  | "Antros y bares"
  | "Fiestas privadas"
  | "Bautizos"
  | "Festivales";

export type Genre =
  | "Versátil"
  | "Norteño"
  | "Banda"
  | "Mariachi"
  | "Pop / Rock"
  | "Salsa"
  | "Jazz"
  | "Electrónica";

export interface Band {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  city: string;
  genre: Genre;
  specialties: Specialty[];
  priceFrom: number;
  rating: number;
  reviewCount: number;
  members: number;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  rankPosition?: number;
}

export interface Review {
  id: string;
  bandId: string;
  author: string;
  rating: number;
  comment: string;
  eventType: Specialty;
  date: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  popular: boolean;
  includes: string[];
}

export type SortOption =
  | "recomendados"
  | "precio-asc"
  | "precio-desc"
  | "alfabetico"
  | "destacados";
