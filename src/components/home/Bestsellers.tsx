import Link from "next/link";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: { label: string; variant: "sale" | "new" | "bestseller" };
}

const products: Product[] = [
  {
    name: "Memory Foam Orthopedic Dog Bed",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 234,
    image: "🛏️",
    tag: { label: "Sale", variant: "sale" },
  },
  {
    name: "Interactive Cat Feather Wand",
    price: 18.99,
    rating: 4.8,
    reviews: 567,
    image: "🪶",
    tag: { label: "Bestseller", variant: "bestseller" },
  },
  {
    name: "Natural Bamboo Litter Box",
    price: 54.99,
    rating: 4.7,
    reviews: 189,
    image: "📦",
    tag: { label: "New", variant: "new" },
  },
  {
    name: "Organic Dental Chew Sticks (Pack of 24)",
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviews: 412,
    image: "🦴",
    tag: { label: "Sale", variant: "sale" },
  },
];

const tagStyles = {
  sale: "bg-pop text-white",
  new: "bg-primary text-white",
  bestseller: "bg-secondary text-foreground",
};

export function Bestsellers() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Bestsellers
            </h2>
            <p className="mt-3 text-muted-foreground">
              Loved by pets and their parents — our most popular picks.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#EBE6E0] bg-white shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
            >
              {/* Tag Badge */}
              {product.tag && (
                <div className="absolute left-4 top-4 z-10">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tagStyles[product.tag.variant]}`}
                  >
                    {product.tag.label}
                  </span>
                </div>
              )}

              {/* Product Image Placeholder */}
              <div className="flex aspect-square items-center justify-center bg-gradient-to-b from-muted to-white p-6">
                <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                  {product.image}
                </span>
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-base font-semibold text-foreground leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-secondary stroke-secondary" />
                  <span className="text-xs font-medium text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
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

                {/* Add to Cart */}
                <Button
                  className="mt-4 w-full rounded-full bg-primary font-semibold transition-all duration-300 ease-out hover:bg-primary/85 hover:-translate-y-0.5"
                  size="sm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
