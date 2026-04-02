"use client";

import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export function ContactCardSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="space-y-12 py-10">
      <div className="mx-auto max-w-lg rounded-xl bg-[#c9e8fa]/90 p-8 shadow-md dark:bg-card/90">
        <h2 className="mb-6 text-2xl font-bold text-[#0d2a4b] dark:text-foreground">Contact Info</h2>
        <ul className="space-y-4 text-[#0d2a4b] dark:text-foreground">
          <li className="flex items-start gap-3 text-sm">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#0d2a4b] dark:text-primary" aria-hidden />
            <span>jieanncaligid@gmail.com</span>
          </li>
          <li className="flex items-start gap-3 text-sm">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#0d2a4b] dark:text-primary" aria-hidden />
            <span>+63 945 361 0108</span>
          </li>
          <li className="text-sm leading-relaxed">Cordova Cebu 6017, Cebu City, Philippines</li>
        </ul>
        <div className="mt-8 flex justify-center gap-5">
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3a7fd6] text-white shadow-md transition hover:bg-[#2d6bc0]"
            aria-label="TikTok"
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/jieanncaligid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3a7fd6] text-white shadow-md transition hover:bg-[#2d6bc0]"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com/ayumi.zain.5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3a7fd6] text-white shadow-md transition hover:bg-[#2d6bc0]"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:gap-12">
        <div className="space-y-3 text-muted-foreground">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Let&apos;s connect</h2>
          <p>
            Have a question about coursework, collaboration, or creative work? Send a message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="sr-only">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/50 focus-visible:ring-2"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/50 focus-visible:ring-2"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-ring/50 focus-visible:ring-2"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="rounded-full bg-[#3a65ff] px-8 font-semibold hover:bg-[#274ecd]"
            >
              Send Message
            </Button>
          </div>
          {submitted ? (
            <p className="text-center text-sm text-green-600 dark:text-green-400" role="status">
              Thanks for your message.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
