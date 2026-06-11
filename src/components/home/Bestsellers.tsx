"use client";

import Link from "next/link";
import { ShoppingCart, Star, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroProducts } from "@/lib/products";

const tagStyles: Record<string, string> = {
  sale: "bg-[#F97316] text-white",
  new: "bg-[#1E3A8A] text-white",
  bestseller: "bg-[#F97316] text-white",
};

/** Unsplash fallbacks for hero products using local paths */
const FALLBACKS: Record<string, string> = {
  "Active Pets Black Rear Seat Cover":
    "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&h=400&fit=crop&auto=format&q=80",
  "FUYEC 3-in-1 Stainless Steel Water Bottle":
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&auto=format&q=80",
  "Modoker Premium Travel Bag Set":
    "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop&auto=format&q=80",
};

export function Bestsellers() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Best Sellers
            </h2>
            <p className="mt-3 text-muted-foreground">
              The gear that dog travelers love most.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {heroProducts.map((product) => (
            <div
              key={product.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1"
            >
              {/* Tag */}
              {product.tag && (
                <div className="absolute left-4 top-4 z-10">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tagStyles[product.tag.variant]}`}>
                    {product.tag.label}
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const fallback = FALLBACKS[product.name];
                    if (fallback && e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    } else {
                      e.currentTarget.style.display = "none";
                      const ph = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (ph) ph.style.display = "flex";
                    }
                  }}
                />
                <div className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                  <span className="text-4xl">🐾</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-sm font-semibold text-foreground leading-snug line-clamp-2">
                  {product.name}
                </h3>

                {/* Stars + reviews */}
                <div className="mt-2 flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">
                    {product.rating} ({product.reviews} Reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-heading text-lg font-bold text-foreground">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Shipping */}
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
                  <Truck className="h-3 w-3" />
                  Free Shipping
                </p>

                {/* CTA */}
                <Button
                  className="mt-3 w-full rounded-full bg-[#1E3A8A] font-semibold text-white transition-all duration-300 ease-out hover:bg-[#1E3A8A]/85 hover:-translate-y-0.5"
                  size="sm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
