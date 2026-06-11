"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Mountain } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Travel Bags", href: "/category/travel-carriers" },
  { label: "Travel Bowls", href: "/category/travel-bowls" },
  { label: "Seat Covers", href: "/category/seat-covers" },
  { label: "Accessories", href: "/category/adventure-accessories" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
          <Mountain className="h-6 w-6" />
          PawRomer
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="hidden sm:inline-flex items-center justify-center rounded-full p-2 text-foreground-muted transition-colors hover:text-primary hover:bg-muted"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className="relative inline-flex items-center justify-center rounded-full p-2 text-foreground-muted transition-colors hover:text-primary hover:bg-muted"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
              0
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="inline-flex lg:hidden items-center justify-center rounded-full p-2 text-foreground-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out",
          mobileOpen ? "max-h-96 border-t border-[#E5E7EB]" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 bg-white px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-[#E5E7EB] pt-2">
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-muted hover:text-primary"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
