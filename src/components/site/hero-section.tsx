import Image from "next/image";
import { MOCK_BANDS } from "@/lib/mock-data";

const collage = MOCK_BANDS.slice(0, 6);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            +{MOCK_BANDS.length * 40} artistas listos para tu evento
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            La tarima
            <br />
            <span className="text-primary">correcta</span>, para
            <br />
            cada momento.
          </h1>
          <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
            Compara bandas, orquestas y artistas en vivo por ciudad, género y precio — y reserva
            todo desde un solo lugar.
          </p>
        </div>

        <div className="relative grid h-[320px] grid-cols-3 gap-2.5 sm:h-[380px] lg:h-[440px]">
          {collage.map((band, i) => (
            <div
              key={band.id}
              className="relative overflow-hidden rounded-2xl"
              style={{
                gridRow: i % 2 === 0 ? "span 2" : "span 1",
                marginTop: i % 3 === 1 ? "1.5rem" : 0,
              }}
            >
              <Image
                src={band.gallery[0] ?? band.coverImage}
                alt={`Presentación de ${band.name}`}
                fill
                sizes="220px"
                className="object-cover"
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
