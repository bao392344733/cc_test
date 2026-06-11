import { Plane, Truck, ShieldCheck, Users } from "lucide-react";

const badges = [
  { icon: Plane, label: "Airline Approved", sub: "Cabin-ready carriers" },
  { icon: Truck, label: "Free Shipping", sub: "On orders over $50" },
  { icon: ShieldCheck, label: "30-Day Guarantee", sub: "Money back, no questions" },
  { icon: Users, label: "15,000+ Customers", sub: "Trusted worldwide" },
];

export function TrustBar() {
  return (
    <section className="border-y border-[#E5E7EB] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {badges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
