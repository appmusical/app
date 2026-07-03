import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, iconSize = 32 }: { className?: string; iconSize?: number }) {
  return (
    <Link href="/" className={cn("flex shrink-0 items-center gap-2", className)}>
      <Image
        src="/brand/logo-mark.png"
        alt="Tarima"
        width={iconSize}
        height={iconSize}
        className="shrink-0"
        priority
      />
      <span className="hidden font-display text-lg font-bold tracking-tight sm:inline">Tarima</span>
    </Link>
  );
}
