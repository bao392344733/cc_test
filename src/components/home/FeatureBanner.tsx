import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

export function FeatureBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-secondary/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="mx-auto flex aspect-square max-w-sm items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-white to-muted shadow-lg">
              <div className="text-center">
                <span className="text-7xl">💚</span>
                <p className="mt-4 font-heading text-lg font-semibold text-primary">
                  Naturally Good
                </p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2 flex flex-col items-start">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Heart className="mr-1.5 h-3.5 w-3.5" />
              Our Promise
            </span>

            <h2 className="mt-5 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Because they deserve
              <br />
              <span className="text-primary">nothing but the best.</span>
            </h2>

            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Every product at PURR is carefully selected for safety, sustainability, and
              tail-wagging joy. We partner with ethical manufacturers who share our love
              for pets and the planet.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Vet-reviewed & safety tested",
                "Eco-friendly packaging",
                "1% donated to animal shelters",
                "60-day happiness guarantee",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground-muted">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-xs text-primary font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center rounded-full border-2 border-primary bg-transparent px-8 py-3.5 text-base font-semibold text-primary transition-all duration-300 ease-out hover:bg-primary hover:text-white"
            >
              Learn Our Story
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
