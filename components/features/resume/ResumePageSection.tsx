import Image from "next/image";

export function ResumePageSection() {
  return (
    <div className="py-10 md:py-14">
      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[280px_1fr] md:gap-12">
        <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="relative mx-auto mb-4 aspect-square w-40 overflow-hidden rounded-lg bg-muted">
            <Image src="/profile.jpg" alt="Jie-ann D. Caligid" fill className="object-cover" sizes="160px" />
          </div>
          <p className="text-center font-semibold">Jie-ann D. Caligid</p>
          <p className="text-center text-sm text-muted-foreground">Front-End Developer</p>
        </aside>

        <div className="space-y-8 md:border-l md:border-border md:pl-12">
          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">About Me</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              I&apos;m a developer &amp; artist — I code, I draw, and I create things that make people feel
              something. I&apos;m passionate about consistently advancing my knowledge and skills. I have attended
              multiple seminars and boot camps on coding and development.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Personal Information</h2>
            <dl className="space-y-2 text-sm text-muted-foreground">
              <div>
                <dt className="font-medium text-foreground">Date of Birth</dt>
                <dd>October 26, 2004</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Gender</dt>
                <dd>Female</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Nationality</dt>
                <dd>Filipino</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Religion</dt>
                <dd>Born Again</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Civil Status</dt>
                <dd>Single</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Father&apos;s Name</dt>
                <dd>Jojiet S. Caligid</dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Mother&apos;s Name</dt>
                <dd>Marian D. Caligid</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Education</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>High School: Cordova National High School</li>
              <li>Year of Graduation: 2023</li>
              <li>College: Cordova Public College</li>
              <li>Degree Program: Bachelor of Science in Information Technology (BSIT)</li>
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Experience</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Senior High Work Immersion: Cordova Multipurpose Cooperative</p>
              <p>Branch: Accounting Branch, Business Enterprise, and Main Branch</p>
              <p>
                Tasks: Encoding cooperative members&apos; data, receipt encoding, closing account folder placement
              </p>
              <p>Duration: 10 Days</p>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Talents &amp; Hobbies</h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Drawing</li>
              <li>Singing</li>
              <li>Dancing</li>
              <li>Listening to Music</li>
              <li>Hair Braiding</li>
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Skills</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Technical / Development Skills: </span>
                HTML, CSS, JavaScript, Front-End Development
              </li>
              <li>
                <span className="font-medium text-foreground">Creative / Artistic Skills: </span>
                Drawing, Singing, Dancing, Listening to Music, Hair Braiding
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
