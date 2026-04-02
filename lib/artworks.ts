export const artworkCategoryLabels = {
  all: "All",
  portrait: "Portrait",
  framed: "Framed",
  figure: "Figure",
} as const;

export type ArtworkCategory = keyof typeof artworkCategoryLabels;

export type ArtworkItem = {
  src: string;
  alt: string;
  category: Exclude<ArtworkCategory, "all">;
};

/** Six pieces from FinalOS `src/assets` (1..jpg → 1.jpg). Categories for gallery filters. */
export const artworks: ArtworkItem[] = [
  { src: "/artworks/1.jpg", alt: "Artwork 1", category: "portrait" },
  { src: "/artworks/2.jpg", alt: "Artwork 2", category: "portrait" },
  { src: "/artworks/3.jpg", alt: "Artwork 3", category: "portrait" },
  { src: "/artworks/4.jpg", alt: "Artwork 4", category: "portrait" },
  { src: "/artworks/5.jpg", alt: "Artwork 5", category: "framed" },
  { src: "/artworks/6.jpg", alt: "Artwork 6", category: "figure" },
];

export const artworkFilterTabs = ["all", "portrait", "framed", "figure"] as const satisfies readonly ArtworkCategory[];

export function filterArtworks(category: ArtworkCategory): ArtworkItem[] {
  if (category === "all") return artworks;
  return artworks.filter((a) => a.category === category);
}
