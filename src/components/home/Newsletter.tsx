"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/85 px-6 py-16 text-center sm:px-16 sm:py-20">
          {/* Decorative circles */}
          <div
            className="absolute -top-12 -right-12 h-64 w-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #FF6B3D 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Mail className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>

            <h2 className="mt-6 font-heading text-3xl font-bold text-white sm:text-4xl">
              Get 15% off your first order
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/80">
              Subscribe for exclusive deals, pet care tips, and new product launches — no spam, just love.
            </p>

            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-full border-2 border-white/30 bg-white/15 px-5 py-3.5 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-white/60 focus:bg-white/20"
                required
              />
              <Button
                type="submit"
                className="rounded-full bg-white px-8 py-3.5 font-semibold text-primary transition-all duration-300 ease-out hover:bg-white/90 hover:shadow-lg hover:-translate-y-0.5"
                size="lg"
              >
                Subscribe
              </Button>
            </form>

            <p className="mt-4 text-xs text-white/50">
              No spam, unsubscribe anytime. Read our{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-white/70">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
