import Link from "next/link";
import { Camera, MessageCircle, Film } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Seat Covers", href: "/category/seat-covers" },
    { label: "Travel Bowls", href: "/category/travel-bowls" },
    { label: "Travel Bags", href: "/category/travel-carriers" },
    { label: "Accessories", href: "/category/adventure-accessories" },
  ],
  Support: [
    { label: "Track Order", href: "/track" },
    { label: "Shipping Policy", href: "/faq#shipping" },
    { label: "Return Policy", href: "/faq#returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"];

const socialLinks = [
  { label: "Instagram", icon: Camera, href: "#" },
  { label: "Facebook", icon: MessageCircle, href: "#" },
  { label: "YouTube", icon: Film, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-white">
              <span className="text-2xl">🐾</span>
              PawRomer
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Premium travel essentials for adventurous dogs and their humans.
            </p>
            {/* Social Icons — real SVG */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/90">
                {title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment + Copyright */}
        <div className="mt-12 border-t border-white/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {paymentMethods.map((pm) => (
              <span
                key={pm}
                className="inline-flex items-center rounded border border-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/40"
              >
                {pm}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <p className="text-xs text-[#9CA3AF]">
              &copy; {new Date().getFullYear()} PawRomer. All rights reserved.
            </p>
            <Link href="/privacy" className="text-xs text-[#9CA3AF] transition-colors hover:text-white/70">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-[#9CA3AF] transition-colors hover:text-white/70">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
