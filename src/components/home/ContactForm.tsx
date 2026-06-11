"use client";

export function ContactForm() {
  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Your Name"
          className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
          required
        />
      </div>
      <input
        type="text"
        placeholder="Subject"
        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
        required
      />
      <textarea
        placeholder="Your Message"
        rows={5}
        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
        required
      />
      <button
        type="submit"
        className="w-full rounded-full bg-secondary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-secondary/20 transition-all duration-300 ease-out hover:bg-secondary/90 hover:shadow-xl hover:-translate-y-0.5"
      >
        Send Message
      </button>
    </form>
  );
}
