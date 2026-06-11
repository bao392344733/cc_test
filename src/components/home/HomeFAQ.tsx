"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5-10 business days within the US. Express options available at checkout.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to Canada, UK, and Australia. Rates calculated at checkout.",
  },
  {
    q: "Can I return products?",
    a: "Absolutely. Returns are free within 30 days of delivery for any unused items.",
  },
];

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-muted py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Quick answers to common questions.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={q}
              className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/50"
              >
                <h3 className="font-heading text-base font-semibold text-foreground pr-4">
                  {q}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  openIndex === i ? "max-h-40 pb-4 px-6" : "max-h-0"
                }`}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#1E3A8A]/80"
          >
            View All FAQs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
