import { Mail, Clock, MessageCircle, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/home/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | PawRomer",
  description: "Get in touch with PawRomer customer support. We're here to help.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/90 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            We&apos;re here to help you and your dog travel better.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#E5E7EB] p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
                <Mail className="h-7 w-7 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">Email</h3>
              <p className="mt-2 text-sm text-muted-foreground">Customer Support</p>
              <a
                href="mailto:support@pawromer.com"
                className="mt-2 block text-sm font-medium text-primary hover:underline"
              >
                support@pawromer.com
              </a>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
                <Clock className="h-7 w-7 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                Response Time
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">We typically reply within</p>
              <p className="text-sm font-medium text-primary">24-48 hours</p>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
                <MessageCircle className="h-7 w-7 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                Live Chat
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Available Monday-Friday</p>
              <p className="text-sm font-medium text-primary">9am - 5pm EST</p>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
                <MapPin className="h-7 w-7 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                Headquarters
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Portland, Oregon</p>
              <p className="text-sm text-muted-foreground">United States</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-16 mx-auto max-w-2xl">
            <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
