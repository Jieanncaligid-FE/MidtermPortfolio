import Link from "next/link";

type Props = {
  /** Optional catch-all segments — `undefined` at `/category`; nested paths pass `string[]` only. */
  segments: string[] | undefined;
};

const labels: Record<string, string> = {
  web: "Web & front-end",
  portfolio: "Portfolio work",
  coursework: "Coursework",
};

export function CategoryBrowseSection({ segments }: Props) {
  const pathLabel = segments?.length ? segments.join(" / ") : "(index)";

  return (
    <section className="space-y-6 py-10">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Category</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Catch-all route{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">/category/[[...path]]</code>. Page logic uses
          only the <strong>segments array</strong> — there is no separate root folder segment to strip.
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        Current path segments: <code className="rounded bg-muted px-1.5 py-0.5">{pathLabel}</code>
      </p>

      <nav aria-label="Sample category tree" className="flex flex-col gap-2 text-sm">
        <Link className="text-[#3a65ff] hover:underline" href="/category/web">
          /category/web
        </Link>
        <Link className="text-[#3a65ff] hover:underline" href="/category/web/portfolio">
          /category/web/portfolio
        </Link>
        <Link className="text-[#3a65ff] hover:underline" href="/category/coursework/midterm">
          /category/coursework/midterm
        </Link>
      </nav>

      <div className="rounded-xl border border-border bg-muted/40 p-4">
        <p className="font-medium">Resolved labels (demo)</p>
        <ul className="mt-2 list-inside list-disc text-muted-foreground">
          {(segments ?? []).map((s) => (
            <li key={s}>
              <span className="font-mono">{s}</span>
              {labels[s] ? ` — ${labels[s]}` : ""}
            </li>
          ))}
          {(!segments || segments.length === 0) && (
            <li className="list-none">Open a nested link above to populate segments.</li>
          )}
        </ul>
      </div>
    </section>
  );
}
