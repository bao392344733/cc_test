import Link from "next/link";

const categories = [
  {
    name: "Seat Covers",
    href: "/category/seat-covers",
    image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&h=400&fit=crop&auto=format&q=80",
  },
  {
    name: "Travel Bowls",
    href: "/category/travel-bowls",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&auto=format&q=80",
  },
  {
    name: "Travel Bags",
    href: "/category/travel-carriers",
    image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&h=400&fit=crop&auto=format&q=80",
  },
  {
    name: "Accessories",
    href: "/category/adventure-accessories",
    image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop&auto=format&q=80",
  },
];

export function CategoryNav() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Shop by Category
        </h2>
        <p className="mt-3 text-muted-foreground">
          Everything you need for adventures with your best friend.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ name, href, image }) => (
          <Link
            key={name}
            href={href}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between p-5">
              <h3 className="font-heading text-lg font-semibold text-foreground">{name}</h3>
              <span className="text-sm font-medium text-primary opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Shop Now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
