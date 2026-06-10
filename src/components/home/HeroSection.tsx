import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative Blobs */}
      <div
        className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #8A9A78 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #FF6B3D 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-pop/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-pop">
              New Collection 2025
            </span>

            <h1 className="mt-6 font-heading text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Life is better
              <br />
              <span className="text-primary">with purrs.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Premium, natural pet supplies for the ones who make every day brighter.
              From cozy beds to playful toys — curated with love for your furry family.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 ease-out hover:bg-[#D06D47] hover:shadow-xl hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/bestsellers"
                className="inline-flex items-center rounded-full border-2 border-primary bg-transparent px-8 py-3.5 text-base font-semibold text-primary transition-all duration-300 ease-out hover:bg-primary hover:text-white"
              >
                Best Sellers
              </Link>
            </div>

            {/* Trust stats */}
            <div className="mt-10 flex gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl font-bold text-foreground">10k+</span>
                <span>Happy Pets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl font-bold text-foreground">500+</span>
                <span>Products</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl font-bold text-foreground">4.9</span>
                <span>Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Image Area */}
          <div className="relative hidden lg:block">
            {/* Main image placeholder with organic blob background */}
            <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-secondary/20 to-pop/10 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-[2.25rem] bg-gradient-to-br from-white to-muted">
                {/* Placeholder illustration */}
                <div className="text-center">
                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/30">
                    <span className="font-heading text-6xl">🐾</span>
                  </div>
                  <p className="mt-4 font-heading text-lg font-semibold text-primary">
                    Premium Pet Collection
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Curated with love & care
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -left-4 top-12 animate-bounce-slow rounded-2xl bg-white px-5 py-3 shadow-xl shadow-foreground/5">
              <p className="font-heading text-sm font-bold text-pop">★ Top Rated</p>
              <p className="text-xs text-muted-foreground">By 10,000+ pet parents</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
