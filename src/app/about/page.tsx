import { Mountain, Heart, Shield, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | PawRomer",
  description:
    "At PawRomer, we believe every journey becomes more meaningful when shared with your best friend.",
};

const values = [
  {
    icon: Mountain,
    title: "Adventure",
    description: "We design gear that empowers you and your dog to explore more, worry less.",
  },
  {
    icon: Heart,
    title: "Comfort",
    description: "Every product is crafted with your dog's well-being as the top priority.",
  },
  {
    icon: Shield,
    title: "Quality",
    description: "We use premium, durable materials tested in real-world conditions.",
  },
  {
    icon: Globe,
    title: "Community",
    description: "We're building a global pack of dog travelers who share the same passion.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/90 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            About PawRomer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            We believe every journey becomes more meaningful when shared with your best friend.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              At PawRomer, we believe every journey becomes more meaningful when shared with your
              best friend. Our mission is simple: Create reliable travel gear that helps dogs and
              owners explore the world together. Whether it&apos;s a weekend road trip, a
              cross-country adventure, or a daily outing, PawRomer is built to make every mile
              better.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
            What We Stand For
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
