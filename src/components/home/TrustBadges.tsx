import { Truck, Leaf, ShieldCheck, Undo2 } from "lucide-react";

const badges = [
  { icon: Truck, label: "Free Shipping", sub: "Orders $49+" },
  { icon: Leaf, label: "100% Natural", sub: "Eco-friendly" },
  { icon: ShieldCheck, label: "Vet Approved", sub: "Quality assured" },
  { icon: Undo2, label: "Easy Returns", sub: "30-day policy" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-[#EBE6E0] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
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
