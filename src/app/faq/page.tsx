import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | PawRomer",
  description: "Frequently asked questions about shipping, returns, order tracking, and support.",
};

const faqs = [
  {
    id: "shipping",
    question: "Shipping Policy",
    answer:
      "We offer free standard shipping on all orders over $49 within the United States. Standard delivery takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. We currently ship to the United States, Canada, United Kingdom, and Australia. International shipping rates vary by destination.",
  },
  {
    id: "returns",
    question: "Return Policy",
    answer:
      "We want you and your dog to love every PawRomer product. If you're not completely satisfied, you can return any unused item within 30 days of delivery for a full refund. Items must be in their original packaging and condition. To initiate a return, email support@pawromer.com with your order number.",
  },
  {
    id: "tracking",
    question: "Order Tracking",
    answer:
      "Once your order ships, you'll receive a confirmation email with a tracking number. You can track your order anytime through our website or the carrier's tracking portal. If you haven't received your tracking information within 48 hours of placing your order, please contact our support team.",
  },
  {
    id: "support",
    question: "Contact Support",
    answer:
      "Our customer support team is available Monday through Friday, 9am to 5pm EST. You can reach us at support@pawromer.com or through our Contact page. We typically respond within 24-48 hours. For urgent inquiries, please include 'URGENT' in your email subject line.",
  },
  {
    id: "sizing",
    question: "How do I choose the right size?",
    answer:
      "Each product page includes a detailed sizing guide with measurements. For carriers, measure your dog's length (nose to tail base) and height (floor to shoulder). For harnesses, measure chest girth at the widest point. If you're between sizes, we recommend sizing up. Still unsure? Contact our team for personalized recommendations.",
  },
  {
    id: "warranty",
    question: "Product Warranty",
    answer:
      "All PawRomer products come with a 1-year warranty against manufacturing defects. This covers issues with materials and workmanship under normal use. The warranty does not cover damage from misuse, normal wear and tear, or modifications. To file a warranty claim, contact support@pawromer.com with photos and your order details.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-primary/90 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Everything you need to know about shopping with PawRomer.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-[#E5E7EB]">
            {faqs.map((faq) => (
              <div key={faq.id} id={faq.id} className="py-8 first:pt-0 last:pb-0">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
