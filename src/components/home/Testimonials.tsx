import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    quote: "Perfect for road trips with my Labrador. The gear held up beautifully across three states!",
    author: "Sarah M.",
    location: "Portland, OR",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&auto=format",
  },
  {
    quote: "The carrier is surprisingly comfortable. My anxious pup actually fell asleep during our drive.",
    author: "Michael T.",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format",
  },
  {
    quote: "Finally a bowl that doesn't spill in the car. Game changer for our camping weekends.",
    author: "Emma J.",
    location: "Denver, CO",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&auto=format",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Loved by Adventurers
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Trusted by{" "}
            <span className="font-semibold text-foreground">15,000+ Dog Owners</span>{" "}
            who travel better with PawRomer.
          </p>
        </div>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {testimonials.map(({ quote, author, location, avatar }) => (
            <div
              key={author}
              className="flex shrink-0 w-[85vw] snap-center sm:w-auto flex-col rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm text-center transition-all duration-300 hover:shadow-md"
            >
              {/* Avatar */}
              <div className="mx-auto h-14 w-14 overflow-hidden rounded-full bg-muted">
                <img
                  src={avatar}
                  alt={author}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Stars */}
              <div className="mt-4 flex items-center justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div className="mt-5 border-t border-[#E5E7EB] pt-4">
                <p className="text-sm font-semibold text-foreground">{author}</p>
                <p className="text-xs text-muted-foreground">{location}</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs font-medium text-primary">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified Buyer
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
