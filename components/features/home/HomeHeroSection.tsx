"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";

const socials = [
  { href: "https://www.facebook.com/ayumi.zain.5", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/jieanncaligid", label: "Instagram", Icon: Instagram },
  { href: "https://github.com/Jieanncaligid-FE", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/jie-ann-caligid-33b67039b/", label: "LinkedIn", Icon: Linkedin },
];

export function HomeHeroSection() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="py-10 md:py-16">
      <div
        className={`mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-12 px-4 md:gap-20 md:px-8 transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Profile card — layered pastel block + white card (matches reference) */}
        <div
          className={`relative w-full max-w-[300px] transition-[transform,opacity] duration-[900ms] ease-out md:max-w-[320px] ${
            isReady ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <div
            className="pointer-events-none absolute -top-3 -left-4 -z-10 h-[min(100%,360px)] w-[85%] rounded-[22px] md:-left-6"
            style={{
              background: "var(--hero-profile-bg)",
              boxShadow: "4px 8px 16px rgba(100, 140, 255, 0.2)",
            }}
          />
          <div className="relative z-10 rounded-[24px] bg-card px-8 pb-8 pt-10 text-center shadow-[0_15px_40px_rgba(100,140,255,0.18)]">
            <div className="relative mx-auto mb-5 h-[128px] w-[128px]">
              <Image
                src="/profile.jpg"
                alt="Jie-ann D. Caligid"
                fill
                className="rounded-full border-[4px] object-cover"
                style={{ borderColor: "var(--hero-accent-soft)" }}
                sizes="128px"
                priority
              />
            </div>
            <p className="text-xl font-bold tracking-tight text-[#1d2d50] dark:text-foreground">Jie-ann D. Caligid</p>
            <p className="mt-2 text-xs font-normal tracking-[0.25em] text-muted-foreground uppercase">
              Front-End Developer
            </p>
            <div className="mt-6 flex justify-center gap-5 text-[#1d2d50] dark:text-foreground">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#3a65ff]"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[480px] flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight text-[#1d2d50] dark:text-foreground md:text-5xl">
            Hello!
          </h1>
          <p className="text-lg font-medium text-[#2f3a54] dark:text-muted-foreground">
            Here&apos;s who I am &amp; what I do
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Button
              asChild
              className="rounded-full bg-[#3a65ff] px-8 py-6 text-base font-semibold text-white shadow-[0_4px_14px_rgba(58,101,255,0.45)] hover:bg-[#274ecd]"
            >
              <Link href="/resume">Resume</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2 border-[#3a65ff] bg-transparent px-8 py-6 text-base font-semibold text-[#3a65ff] hover:bg-[#3a65ff] hover:text-white dark:border-[#3a65ff]"
            >
              <Link href="/projects">Projects</Link>
            </Button>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#4a5a7a] dark:text-muted-foreground">
            I&apos;m a developer &amp; artist — I code, I draw, and I create things that make people feel
            something.
          </p>
        </div>
      </div>
    </section>
  );
}
