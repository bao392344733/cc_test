import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Dogs", href: "/dogs" },
    { label: "Cats", href: "/cats" },
    { label: "Small Pets", href: "/small-pets" },
    { label: "New Arrivals", href: "/new" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Track Order", href: "/track" },
  ],
  Company: [
    { label: "About PURR", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Wholesale", href: "/wholesale" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-white">
              <PawPrint className="h-5 w-5" />
              PURR
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Premium pet supplies crafted with love. Because every purr, wag, and hop deserves the best.
            </p>
            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              {["Instagram", "Facebook", "Pinterest"].map((s) => (
                <span
                  key={s}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80 transition-colors hover:bg-white/20"
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/90">
                {title}
              </h4>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} PURR. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/50 transition-colors hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/50 transition-colors hover:text-white/70">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
