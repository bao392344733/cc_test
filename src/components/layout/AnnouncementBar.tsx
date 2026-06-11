import { Gift } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-center text-xs font-medium tracking-wide sm:text-sm">
        <Gift className="mr-2 h-4 w-4 shrink-0" />
        Summer Road Trip Sale: Free Shipping on Orders Over $50 + 30-Day Risk-Free Trial
      </div>
    </div>
  );
}
