"use client";

import { Mail, Gift, Tag, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-16 sm:py-20"
          style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)" }}
        >
          <div
            className="absolute -top-12 -right-12 h-64 w-64 rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Mail className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>

            <h2 className="mt-6 font-heading text-3xl font-bold text-white sm:text-4xl">
              Join 15,000+ PawRomer Members
            </h2>
            <p className="mt-3 text-lg font-semibold text-secondary">
              Get 10% Off Your First Order
            </p>

            {/* Perks */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <Gift className="h-4 w-4" />
                Exclusive travel tips
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                Early access to new products
              </span>
              <span className="flex items-center gap-1.5">
                <Headphones className="h-4 w-4" />
                Members-only offers
              </span>
            </div>

            <form
              className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 w-full rounded-full border-2 border-white/30 bg-white/15 px-5 py-3.5 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-white/60 focus:bg-white/20"
                required
              />
              <Button
                type="submit"
                className="shrink-0 rounded-full bg-white px-8 py-3.5 font-semibold text-[#1E3A8A] transition-all duration-300 ease-out hover:bg-white/90 hover:shadow-lg hover:-translate-y-0.5"
                size="lg"
              >
                Subscribe
              </Button>
            </form>

            <p className="mt-4 text-xs text-white/50">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
