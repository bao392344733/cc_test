"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Dogs", href: "/dogs" },
  { label: "Cats", href: "/cats" },
  { label: "Small Pets", href: "/small-pets" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-[#EBE6E0]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-heading text-2xl font-bold text-primary">
          <PawPrint className="h-6 w-6" />
          PURR
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
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
            className="hidden sm:inline-flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:text-primary hover:bg-muted"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className="relative inline-flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:text-primary hover:bg-muted"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pop text-[10px] font-bold text-white">
              0
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="inline-flex md:hidden items-center justify-center rounded-full p-2 text-muted-foreground"
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
          "md:hidden overflow-hidden transition-all duration-300 ease-out",
          mobileOpen ? "max-h-80 border-t border-[#EBE6E0]" : "max-h-0"
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
          <div className="mt-2 border-t border-[#EBE6E0] pt-2">
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
