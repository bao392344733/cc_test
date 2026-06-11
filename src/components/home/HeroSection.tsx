import Link from "next/link";
import { ArrowRight, Mountain, Star, Plane, Truck, ShieldCheck, Users } from "lucide-react";

const trustBadges = [
  { icon: Plane, label: "Airline Approved" },
  { icon: Truck, label: "Free Shipping $50+" },
  { icon: ShieldCheck, label: "30-Day Guarantee" },
  { icon: Users, label: "15,000+ Customers" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32 lg:pb-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="relative z-10 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
              <Mountain className="h-3.5 w-3.5" />
              New Collection 2025
            </span>

            <h1 className="mt-5 font-heading text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Travel Better
              <br />
              <span className="text-primary">With Your Dog</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Premium travel essentials designed for adventurous dogs and their humans.
              Every journey, safer, easier, and more enjoyable.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/shop" className="inline-flex items-center rounded-full bg-secondary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-secondary/20 transition-all duration-300 ease-out hover:bg-secondary/90 hover:shadow-xl hover:-translate-y-0.5">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/shop" className="inline-flex items-center rounded-full border-2 border-primary bg-transparent px-8 py-3.5 text-base font-semibold text-primary transition-all duration-300 ease-out hover:bg-primary hover:text-white">
                Explore Collections
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image — golden hour road trip freedom */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-secondary/10 to-muted p-1">
              <div className="h-full w-full overflow-hidden rounded-[2.25rem]">
                <img
                  src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=600&fit=crop&auto=format&q=80"
                  alt="Dog enjoying road trip freedom in car — PawRomer travel essentials"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute left-4 top-16 rounded-2xl bg-white px-5 py-3 shadow-xl shadow-foreground/5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">By 15,000+ dog parents</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
