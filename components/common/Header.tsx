import Link from "next/link";

import { SiteNav } from "@/components/common/SiteNav";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-border py-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-bold tracking-tight">
          Portfolio
        </Link>
        <div className="flex items-center gap-6">
          <SiteNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
