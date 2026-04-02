export type ArchiveEntry = {
  id: string;
  title: string;
  /** ISO date yyyy-mm-dd */
  publishedAt: string;
};

export const archiveEntries: ArchiveEntry[] = [
  { id: "a1", title: "Winter lab notes", publishedAt: "2026-01-08" },
  { id: "a2", title: "UI mockup iteration", publishedAt: "2026-02-14" },
  { id: "a3", title: "Midterm checklist", publishedAt: "2026-03-20" },
  { id: "a4", title: "Spring portfolio polish", publishedAt: "2026-04-01" },
];

/** `dateParts` from optional catch-all, e.g. ['2026','03'] or undefined for `/archive` */
export function filterEntriesByDateParts(dateParts: string[] | undefined): ArchiveEntry[] {
  if (!dateParts || dateParts.length === 0) return archiveEntries;

  const prefix = dateParts.join("-");
  return archiveEntries.filter((e) => e.publishedAt.startsWith(prefix));
}
