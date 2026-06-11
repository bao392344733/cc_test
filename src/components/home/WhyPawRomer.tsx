import { Plane, Heart, ShieldCheck, Users } from "lucide-react";

const advantages = [
  {
    icon: Plane,
    title: "Airline-Friendly Design",
    description: "Cabin-ready carriers and travel gear that meet airline requirements worldwide.",
  },
  {
    icon: Heart,
    title: "Stress-Free Travel",
    description: "Designed with dogs in mind — ergonomic, cozy, and calming for anxious travelers.",
  },
  {
    icon: ShieldCheck,
    title: "Waterproof & Durable",
    description: "Built to withstand every trail, terrain, and weather condition your adventure demands.",
  },
  {
    icon: Users,
    title: "Trusted By 15,000+ Dog Owners",
    description: "Loved by pet travelers across the US, Canada, UK, and Australia.",
  },
];

export function WhyPawRomer() {
  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Why PawRomer
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-muted-foreground">
            We create practical travel essentials for dogs and their owners.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
