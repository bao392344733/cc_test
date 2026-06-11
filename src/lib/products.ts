export interface Product {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  tag?: { label: string; variant: "sale" | "new" | "bestseller" };
}

/*
 * Product image paths:
 * - Place your cleaned-up product photos in /public/images/products/
 * - Use the local paths below; Unsplash URLs serve as fallbacks.
 * - Expected files: seat-cover.jpg, water-bottle.jpg, travel-bag.jpg
 */

const LOCAL = "/images/products";

export const mockProducts: Product[] = [
  {
    name: "Active Pets Black Rear Seat Cover",
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.9,
    reviews: 487,
    image: `${LOCAL}/seat-cover.jpg`,
    category: "seat-covers",
    tag: { label: "Bestseller", variant: "bestseller" },
  },
  {
    name: "FUYEC 3-in-1 Stainless Steel Water Bottle",
    price: 25.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 312,
    image: `${LOCAL}/water-bottle.jpg`,
    category: "travel-bowls",
  },
  {
    name: "Modoker Premium Travel Bag Set",
    price: 48.99,
    rating: 4.9,
    reviews: 203,
    image: `${LOCAL}/travel-bag.jpg`,
    category: "travel-carriers",
    tag: { label: "New", variant: "new" },
  },
  {
    name: "Waterproof Hammock Backseat Protector",
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviews: 338,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&auto=format&q=80",
    category: "seat-covers",
    tag: { label: "Bestseller", variant: "bestseller" },
  },
  {
    name: "Collapsible Silicone Travel Bowl Set",
    price: 19.99,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&auto=format&q=80",
    category: "travel-bowls",
  },
  {
    name: "Reflective Adventure Dog Leash",
    price: 22.99,
    rating: 4.8,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1601758228041-964f394f29bf?w=400&h=400&fit=crop&auto=format&q=80",
    category: "adventure-accessories",
    tag: { label: "New", variant: "new" },
  },
  {
    name: "Airline-Approved Travel Dog Crate",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviews: 274,
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=400&fit=crop&auto=format&q=80",
    category: "travel-carriers",
    tag: { label: "Sale", variant: "sale" },
  },
  {
    name: "LED Safety Dog Collar",
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.5,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&auto=format&q=80",
    category: "adventure-accessories",
  },
];

export const heroProducts = mockProducts.slice(0, 4);
