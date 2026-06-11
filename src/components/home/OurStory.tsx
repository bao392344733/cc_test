"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function OurStory() {
  return (
    <section className="relative overflow-hidden bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image — golden hour road trip lifestyle */}
          <div className="relative w-full">
            <div className="overflow-hidden rounded-3xl aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/10">
              <img
                src="https://images.unsplash.com/photo-1534351450181-e6f748bac3c4?w=600&h=600&fit=crop&auto=format&q=80"
                alt="Dog and owner on golden hour road trip adventure — PawRomer lifestyle"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Our Story
            </span>

            <h2 className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Born from a simple belief
            </h2>

            <blockquote className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dogs deserve the same comfort and safety during travel as humans.
              </p>
              <p>
                We create practical gear that helps pet parents explore the world with
                confidence — whether it&apos;s a weekend camping trip, a cross-country move,
                or just a daily drive to the park.
              </p>
              <p>
                Every PawRomer product is field-tested by real dogs and their humans,
                because the best adventures are the ones you share.
              </p>
            </blockquote>

            <Link href="/about" className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
              Read Our Full Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
