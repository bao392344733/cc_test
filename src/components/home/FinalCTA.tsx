import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#1E3A8A] py-20 sm:py-24">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1601758228041-964f394f29bf?w=1200&h=600&fit=crop&auto=format"
          alt=""
          className="h-full w-full object-cover opacity-25"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/90 to-[#1E3A8A]/70" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Ready For Your Next Adventure?
        </h2>
        <p className="mt-4 text-lg text-white/80 leading-relaxed">
          Premium travel gear designed for dogs who love to explore.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center rounded-full bg-secondary px-10 py-4 text-base font-semibold text-white shadow-xl shadow-secondary/30 transition-all duration-300 ease-out hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-2xl"
        >
          Shop Best Sellers
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
