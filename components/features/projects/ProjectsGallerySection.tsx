"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  artworkCategoryLabels,
  artworkFilterTabs,
  filterArtworks,
  type ArtworkCategory,
} from "@/lib/artworks";
import {
  filterSchoolProjects,
  schoolProjectCategoryLabels,
  schoolProjectFilterTabs,
  type SchoolProjectCategory,
} from "@/lib/school-projects";

function isInternalHref(href: string) {
  return href.startsWith("/");
}

export function ProjectsGallerySection() {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);
  const [artCategory, setArtCategory] = useState<ArtworkCategory>("all");
  const [projectCategory, setProjectCategory] = useState<SchoolProjectCategory>("all");

  const filteredArtworks = useMemo(() => filterArtworks(artCategory), [artCategory]);
  const filteredSchoolProjects = useMemo(
    () => filterSchoolProjects(projectCategory),
    [projectCategory],
  );

  const closeModal = useCallback(() => setActiveImage(null), []);

  useEffect(() => {
    if (!activeImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeImage, closeModal]);

  return (
    <div className="space-y-12 py-10">
      <section className="rounded-xl border border-border bg-card/80 p-6 shadow-sm md:p-8">
        <h2 className="mb-4 border-b-2 border-[#76bde8] pb-2 text-2xl font-bold text-[#07689f] dark:text-[#7ec8f5]">
          School Projects
        </h2>
        <div className="mb-6 flex flex-wrap gap-2">
          {schoolProjectFilterTabs.map((tab) => (
            <Button
              key={tab}
              type="button"
              size="sm"
              variant={projectCategory === tab ? "default" : "outline"}
              className="rounded-full capitalize"
              onClick={() => setProjectCategory(tab)}
            >
              {schoolProjectCategoryLabels[tab]}
            </Button>
          ))}
        </div>
        <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSchoolProjects.map((p) => (
            <li
              key={p.id}
              className="rounded-xl bg-[#d7eaff]/90 p-0 shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:bg-card dark:shadow-sm"
            >
              {"href" in p ? (
                isInternalHref(p.href) ? (
                  <Link
                    href={p.href}
                    className="block h-full rounded-xl p-5 text-inherit no-underline outline-none transition hover:bg-[#3a65ff]/10"
                  >
                    <p className="mb-2 text-xs font-semibold tracking-wide text-[#3a65ff] uppercase">
                      {schoolProjectCategoryLabels[p.category]}
                    </p>
                    <h3 className="mb-3 text-lg font-bold text-[#07689f] underline-offset-2 hover:underline dark:text-[#7ec8f5]">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-snug text-[#1d2d50]/85 dark:text-muted-foreground">
                      {p.description}
                    </p>
                  </Link>
                ) : (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full rounded-xl p-5 text-inherit no-underline outline-none transition hover:bg-[#3a65ff]/10"
                  >
                    <p className="mb-2 text-xs font-semibold tracking-wide text-[#3a65ff] uppercase">
                      {schoolProjectCategoryLabels[p.category]}
                    </p>
                    <h3 className="mb-3 text-lg font-bold text-[#07689f] underline-offset-2 hover:underline dark:text-[#7ec8f5]">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-snug text-[#1d2d50]/85 dark:text-muted-foreground">
                      {p.description}
                    </p>
                  </a>
                )
              ) : (
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold tracking-wide text-[#3a65ff] uppercase">
                    {schoolProjectCategoryLabels[p.category]}
                  </p>
                  <a
                    href={p.figmaWebHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 block text-lg font-bold text-[#07689f] underline-offset-2 hover:underline dark:text-[#7ec8f5]"
                  >
                    {p.title}
                  </a>
                  <p className="mb-4 text-sm leading-snug text-[#1d2d50]/85 dark:text-muted-foreground">
                    {p.description}
                  </p>
                  <a
                    href={p.figmaWebHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#3a65ff] hover:underline"
                  >
                    Web Frame
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card/80 p-6 shadow-sm md:p-8">
        <h2 className="mb-4 border-b-2 border-[#76bde8] pb-2 text-2xl font-bold text-[#07689f] dark:text-[#7ec8f5]">
          Artworks
        </h2>
        <div className="mb-6 flex flex-wrap gap-2">
          {artworkFilterTabs.map((tab) => (
            <Button
              key={tab}
              type="button"
              size="sm"
              variant={artCategory === tab ? "default" : "outline"}
              className="rounded-full capitalize"
              onClick={() => setArtCategory(tab)}
            >
              {artworkCategoryLabels[tab]}
            </Button>
          ))}
        </div>
        <div
          className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#76bde8]"
          role="list"
        >
          {filteredArtworks.map(({ src, alt }) => (
            <button
              key={src}
              type="button"
              role="listitem"
              className="relative h-[180px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border-0 bg-[#c9dffb] shadow-lg transition hover:scale-[1.03] hover:shadow-xl dark:bg-muted"
              onClick={() => setActiveImage({ src, alt })}
            >
              <Image src={src} alt={alt} fill className="object-cover" sizes="280px" />
            </button>
          ))}
          <Link
            href="/artworks"
            className="flex h-[180px] w-[280px] shrink-0 items-center justify-center rounded-2xl bg-[#07689f] px-4 text-center text-xl font-bold text-white shadow-lg transition hover:bg-[#054a73] dark:bg-primary dark:hover:bg-primary/90"
          >
            Show More
          </Link>
        </div>
      </section>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-xl bg-white p-2 shadow-2xl dark:bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-2 right-3 z-10 text-4xl leading-none text-neutral-700 transition hover:text-[#07689f] dark:text-foreground"
              aria-label="Close full view"
              onClick={closeModal}
            >
              ×
            </button>
            <div className="relative h-[min(85vh,800px)] w-[min(92vw,1100px)]">
              <Image src={activeImage.src} alt={activeImage.alt} fill className="object-contain" sizes="95vw" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
