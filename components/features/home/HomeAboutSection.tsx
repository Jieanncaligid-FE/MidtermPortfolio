export function HomeAboutSection() {
  return (
    <section className="border-t border-border py-12 md:py-16">
      <div className="mx-auto max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">About Me</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            I&apos;m a student at Cordova Public College building toward a career in web and creative tech. I
            care about clear layouts, accessible markup, and interfaces that stay easy to maintain.
          </p>
          <p>
            Outside class I draw, experiment with small front-end tools, and keep iterating on portfolio work so
            it matches what I actually ship.
          </p>
          <p>Based in Cebu, Philippines.</p>
        </div>
      </div>
    </section>
  );
}
