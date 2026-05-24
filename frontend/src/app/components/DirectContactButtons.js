"use client";

import { contactLinks } from "../data/contactLinks";

export default function DirectContactButtons() {
  const mailto = `mailto:${contactLinks.email}?subject=${encodeURIComponent(
    "Hello Rohit"
  )}`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${contactLinks.whatsappPhoneE164}`;

  const commonClasses =
    "px-7 py-4 rounded-2xl font-semibold inline-flex items-center justify-center w-full sm:w-auto hover:transition";

  return (
    <section className="max-w-7xl mx-auto px-6 -mt-6 pb-10">
      {/* Keep all buttons visually centered like the user requested */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
        <a
          href={mailto}
          className={`${commonClasses} bg-white text-black hover:bg-zinc-200`}
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>✉️</span>
            Email
          </span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={`${commonClasses} border border-white/20 text-white hover:bg-white/10`}
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>💬</span>
            WhatsApp
          </span>
        </a>

        <a
          href={contactLinks.githubUrl}
          target="_blank"
          rel="noreferrer"
          className={`${commonClasses} border border-white/20 text-white hover:bg-white/10`}
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>🐙</span>
            GitHub
          </span>
        </a>
      </div>
    </section>
  );
}

