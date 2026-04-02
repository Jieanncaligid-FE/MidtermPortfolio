import Link from "next/link";

import { archiveEntries, filterEntriesByDateParts } from "@/lib/archive-data";

type Props = {
  /** Optional catch-all param: undefined when visiting `/archive` only */
  dateParts: string[] | undefined;
};

export function ArchiveDateFilterSection({ dateParts }: Props) {
  const filtered = filterEntriesByDateParts(dateParts);
  const scopeDescription =
    dateParts && dateParts.length > 0 ? dateParts.join("-") : "All dates";

  return (
    <section className="space-y-6 py-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Archive</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Optional catch-all:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">/archive/[[...date]]</code>. Visiting{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">/archive</code> lists everything; adding
          year or year-month narrows the list by prefix match.
        </p>
      </div>

      <p className="text-sm">
        Active filter: <span className="font-mono text-[#3a65ff]">{scopeDescription}</span>
      </p>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link className="rounded-full border border-border px-3 py-1 hover:bg-accent" href="/archive">
          All
        </Link>
        <Link className="rounded-full border border-border px-3 py-1 hover:bg-accent" href="/archive/2026">
          2026
        </Link>
        <Link className="rounded-full border border-border px-3 py-1 hover:bg-accent" href="/archive/2026-03">
          2026-03
        </Link>
        <Link
          className="rounded-full border border-border px-3 py-1 hover:bg-accent"
          href="/archive/2026-03-20"
        >
          2026-03-20
        </Link>
      </div>

      <ul className="space-y-3">
        {filtered.map((e) => (
          <li key={e.id} className="rounded-lg border border-border bg-card px-4 py-3">
            <span className="text-xs text-muted-foreground">{e.publishedAt}</span>
            <p className="font-medium">{e.title}</p>
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground">
        Full dataset ({archiveEntries.length}): used only to demonstrate filtering against the optional
        catch-all segments.
      </p>
    </section>
  );
}
