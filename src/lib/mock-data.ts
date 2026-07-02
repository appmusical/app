import { Band, Package, Review } from "./types";

export const CITIES = [
  "Cancún",
  "Ciudad de México",
  "Guadalajara",
  "Monterrey",
  "Mérida",
  "Playa del Carmen",
  "Puebla",
  "Tulum",
] as const;

export const GENRES = [
  "Versátil",
  "Norteño",
  "Banda",
  "Mariachi",
  "Pop / Rock",
  "Salsa",
  "Jazz",
  "Electrónica",
] as const;

export const SPECIALTIES = [
  "Bodas",
  "XV años",
  "Corporativo",
  "Antros y bares",
  "Fiestas privadas",
  "Bautizos",
  "Festivales",
] as const;

export const MOCK_BANDS: Band[] = [
  {
    id: "1",
    slug: "los-costenos",
    name: "Los Costeños",
    tagline: "Cumbia y versátil con sabor caribeño",
    city: "Cancún",
    genre: "Versátil",
    specialties: ["Bodas", "Fiestas privadas", "Antros y bares"],
    priceFrom: 18000,
    rating: 4.9,
    reviewCount: 132,
    members: 8,
    coverImage: "https://picsum.photos/seed/tarima-1/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-1a/1200/800",
      "https://picsum.photos/seed/tarima-1b/1200/800",
      "https://picsum.photos/seed/tarima-1c/1200/800",
    ],
    featured: true,
    rankPosition: 1,
  },
  {
    id: "2",
    slug: "mariachi-real-azteca",
    name: "Mariachi Real Azteca",
    tagline: "Tradición mexicana para momentos únicos",
    city: "Ciudad de México",
    genre: "Mariachi",
    specialties: ["Bodas", "XV años", "Bautizos"],
    priceFrom: 12000,
    rating: 4.8,
    reviewCount: 210,
    members: 10,
    coverImage: "https://picsum.photos/seed/tarima-2/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-2a/1200/800",
      "https://picsum.photos/seed/tarima-2b/1200/800",
    ],
    featured: true,
    rankPosition: 2,
  },
  {
    id: "3",
    slug: "electra-nights",
    name: "Electra Nights",
    tagline: "DJ + banda en vivo, energía total",
    city: "Playa del Carmen",
    genre: "Electrónica",
    specialties: ["Antros y bares", "Fiestas privadas", "Festivales"],
    priceFrom: 25000,
    rating: 4.7,
    reviewCount: 87,
    members: 4,
    coverImage: "https://picsum.photos/seed/tarima-3/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-3a/1200/800",
      "https://picsum.photos/seed/tarima-3b/1200/800",
    ],
    featured: false,
  },
  {
    id: "4",
    slug: "sinfonica-urbana",
    name: "Sinfónica Urbana",
    tagline: "Cuerdas y pop para bodas de ensueño",
    city: "Guadalajara",
    genre: "Pop / Rock",
    specialties: ["Bodas", "Corporativo"],
    priceFrom: 22000,
    rating: 4.9,
    reviewCount: 64,
    members: 6,
    coverImage: "https://picsum.photos/seed/tarima-4/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-4a/1200/800",
      "https://picsum.photos/seed/tarima-4b/1200/800",
    ],
    featured: true,
    rankPosition: 3,
  },
  {
    id: "5",
    slug: "banda-sierra-alta",
    name: "Banda Sierra Alta",
    tagline: "El sonido de banda que todos bailan",
    city: "Monterrey",
    genre: "Banda",
    specialties: ["XV años", "Fiestas privadas", "Bodas"],
    priceFrom: 20000,
    rating: 4.6,
    reviewCount: 145,
    members: 12,
    coverImage: "https://picsum.photos/seed/tarima-5/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-5a/1200/800",
      "https://picsum.photos/seed/tarima-5b/1200/800",
    ],
    featured: false,
  },
  {
    id: "6",
    slug: "salsa-brava",
    name: "Salsa Brava",
    tagline: "Ritmo tropical para no parar de bailar",
    city: "Mérida",
    genre: "Salsa",
    specialties: ["Bodas", "Corporativo", "Antros y bares"],
    priceFrom: 16000,
    rating: 4.8,
    reviewCount: 98,
    members: 9,
    coverImage: "https://picsum.photos/seed/tarima-6/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-6a/1200/800",
      "https://picsum.photos/seed/tarima-6b/1200/800",
    ],
    featured: false,
  },
  {
    id: "7",
    slug: "jazz-de-medianoche",
    name: "Jazz de Medianoche",
    tagline: "Elegancia sonora para eventos exclusivos",
    city: "Ciudad de México",
    genre: "Jazz",
    specialties: ["Corporativo", "Fiestas privadas"],
    priceFrom: 19000,
    rating: 4.9,
    reviewCount: 51,
    members: 5,
    coverImage: "https://picsum.photos/seed/tarima-7/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-7a/1200/800",
      "https://picsum.photos/seed/tarima-7b/1200/800",
    ],
    featured: true,
    rankPosition: 4,
  },
  {
    id: "8",
    slug: "los-norteños-del-golfo",
    name: "Los Norteños del Golfo",
    tagline: "Acordeón y tuba directo desde la frontera",
    city: "Monterrey",
    genre: "Norteño",
    specialties: ["Bodas", "XV años", "Fiestas privadas"],
    priceFrom: 14000,
    rating: 4.7,
    reviewCount: 176,
    members: 7,
    coverImage: "https://picsum.photos/seed/tarima-8/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-8a/1200/800",
      "https://picsum.photos/seed/tarima-8b/1200/800",
    ],
    featured: false,
  },
  {
    id: "9",
    slug: "tulum-live-sessions",
    name: "Tulum Live Sessions",
    tagline: "Deep house y percusiones para atardeceres",
    city: "Tulum",
    genre: "Electrónica",
    specialties: ["Fiestas privadas", "Festivales"],
    priceFrom: 28000,
    rating: 5.0,
    reviewCount: 39,
    members: 3,
    coverImage: "https://picsum.photos/seed/tarima-9/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-9a/1200/800",
      "https://picsum.photos/seed/tarima-9b/1200/800",
    ],
    featured: true,
    rankPosition: 5,
  },
  {
    id: "10",
    slug: "puebla-big-band",
    name: "Puebla Big Band",
    tagline: "Metales potentes, repertorio para todos",
    city: "Puebla",
    genre: "Versátil",
    specialties: ["Bodas", "Corporativo", "XV años"],
    priceFrom: 21000,
    rating: 4.6,
    reviewCount: 72,
    members: 11,
    coverImage: "https://picsum.photos/seed/tarima-10/900/1200",
    gallery: [
      "https://picsum.photos/seed/tarima-10a/1200/800",
      "https://picsum.photos/seed/tarima-10b/1200/800",
    ],
    featured: false,
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    bandId: "1",
    author: "Fernanda R.",
    rating: 5,
    comment:
      "Hicieron nuestra boda inolvidable, el repertorio fue perfecto y muy profesionales con los tiempos.",
    eventType: "Bodas",
    date: "2026-05-12",
  },
  {
    id: "r2",
    bandId: "2",
    author: "Jorge M.",
    rating: 5,
    comment:
      "Contratamos el mariachi para los XV de mi hija, llegaron puntuales y sonaron increíble.",
    eventType: "XV años",
    date: "2026-04-02",
  },
  {
    id: "r3",
    bandId: "9",
    author: "Carla T.",
    rating: 5,
    comment:
      "El ambiente que crearon en la playa fue justo lo que buscábamos para el evento de la empresa.",
    eventType: "Corporativo",
    date: "2026-03-20",
  },
  {
    id: "r4",
    bandId: "4",
    author: "Diego A.",
    rating: 4,
    comment:
      "Muy buena banda, el único detalle fue el tiempo de instalación, pero el show valió la pena.",
    eventType: "Bodas",
    date: "2026-02-14",
  },
];

// ---------------------------------------------------------------------
// Generadores usados en el perfil de banda (mock, listos para reemplazar
// por datos reales de Supabase con la misma forma)
// ---------------------------------------------------------------------
export function getPackagesForBand(band: Band): Package[] {
  return [
    {
      id: "esencial",
      name: "Esencial",
      price: band.priceFrom,
      popular: false,
      includes: [
        "2 horas de show",
        `Banda completa (${band.members} integrantes)`,
        "Sonido básico incluido",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: Math.round((band.priceFrom * 1.4) / 500) * 500,
      popular: true,
      includes: [
        "3 horas de show",
        `Banda completa (${band.members} integrantes)`,
        "Sonido e iluminación",
        "1 hora extra de cortesía",
      ],
    },
    {
      id: "todo-incluido",
      name: "Todo incluido",
      price: Math.round((band.priceFrom * 1.9) / 500) * 500,
      popular: false,
      includes: [
        "4 horas de show",
        `Banda completa (${band.members} integrantes)`,
        "Sonido, iluminación y pantallas",
        "DJ de respaldo incluido",
        "Coordinación de repertorio personalizada",
      ],
    },
  ];
}

const REVIEW_TEMPLATES: { author: string; comment: string }[] = [
  { author: "Fernanda R.", comment: "Hicieron nuestro evento inolvidable, muy profesionales con los tiempos." },
  { author: "Jorge M.", comment: "Excelente energía, todos bailando toda la noche. Muy recomendados." },
  { author: "Carla T.", comment: "Muy buenos, el único detalle fue que llegaron justos de tiempo para el montaje." },
  { author: "Diego A.", comment: "Sonido increíble y muy atentos a las peticiones de canciones." },
  { author: "Marisol V.", comment: "Los volvería a contratar sin pensarlo. 100% recomendados." },
  { author: "Héctor P.", comment: "Cumplieron todo lo acordado y el repertorio fue justo lo que buscábamos." },
];

export function getReviewsForBand(band: Band): Review[] {
  return REVIEW_TEMPLATES.map((t, i) => ({
    id: `${band.id}-r${i}`,
    bandId: band.id,
    author: t.author,
    rating: i === 2 ? 4 : 5,
    comment: t.comment,
    eventType: band.specialties[i % band.specialties.length],
    date: "2026-0" + ((i % 6) + 1) + "-10",
  }));
}

/** Días ocupados del mes en curso, determinísticos por banda (mock). */
export function getOccupiedDaysForBand(band: Band): number[] {
  const seed = band.id.charCodeAt(0);
  return [5, 12, 13, 20, 27].map((d) => ((d + seed) % 27) + 1);
}

