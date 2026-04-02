"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  artworkCategoryLabels,
  artworkFilterTabs,
  filterArtworks,
  type ArtworkCategory,
} from "@/lib/artworks";

export function ArtworksPageSection() {
  const [category, setCategory] = useState<ArtworkCategory>("all");
  const visible = useMemo(() => filterArtworks(category), [category]);

  return (
    <section className="space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Artworks</h1>
      <div className="flex flex-wrap gap-2">
        {artworkFilterTabs.map((tab) => (
          <Button
            key={tab}
            type="button"
            size="sm"
            variant={category === tab ? "default" : "outline"}
            className="rounded-full capitalize"
            onClick={() => setCategory(tab)}
          >
            {artworkCategoryLabels[tab]}
          </Button>
        ))}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ src, alt }) => (
          <li
            key={src}
            className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
          >
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
