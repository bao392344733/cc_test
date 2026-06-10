import Link from "next/link";
import { Dog, Cat, Rabbit } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Dogs",
    icon: Dog,
    count: "120+ products",
    href: "/dogs",
    gradient: "from-primary/15 to-primary/5",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    name: "Cats",
    icon: Cat,
    count: "95+ products",
    href: "/cats",
    gradient: "from-secondary/30 to-secondary/5",
    iconBg: "bg-accent/10 text-accent",
  },
  {
    name: "Small Pets",
    icon: Rabbit,
    count: "45+ products",
    href: "/small-pets",
    gradient: "from-pop/15 to-pop/5",
    iconBg: "bg-pop/10 text-pop",
  },
];

export function CategoryNav() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Shop by Pet
        </h2>
        <p className="mt-3 text-muted-foreground">
          Find the perfect products for your furry, fluffy, or feathery friend.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ name, icon: Icon, count, href, gradient, iconBg }) => (
          <Link
            key={name}
            href={href}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-[#EBE6E0] bg-white p-8 shadow-sm",
              "transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1"
            )}
          >
            {/* Gradient background on hover */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                gradient
              )}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                  iconBg
                )}
              >
                <Icon className="h-9 w-9" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                {name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{count}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Shop Now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
