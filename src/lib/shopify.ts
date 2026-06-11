/**
 * Shopify Storefront API client placeholder.
 *
 * Replace with real Shopify integration when ready:
 * 1. Set SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN env vars
 * 2. Install shopify-buy or use fetch with Storefront API
 * 3. Uncomment and use the client below
 *
 * @see https://shopify.dev/docs/storefronts/headless
 */

// import { createStorefrontApiClient } from "@shopify/storefront-api-client";
//
// export const shopifyClient = createStorefrontApiClient({
//   storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
//   publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
//   apiVersion: "2025-01",
// });

export const SHOPIFY_CONFIG = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "",
  storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
  apiVersion: "2025-01",
};

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_CONFIG.storeDomain && SHOPIFY_CONFIG.storefrontToken);
}

/**
 * Fetch products from Shopify Storefront API
 * (Mock implementation — replace with real API call)
 */
export async function getProducts() {
  if (!isShopifyConfigured()) {
    const { mockProducts } = await import("@/lib/products");
    return mockProducts;
  }

  // TODO: Real Shopify Storefront API call
  // const { data } = await shopifyClient.request(
  //   `query Products { products(first: 20) { edges { node { id title handle priceRange { minVariantPrice { amount } } } } } }`
  // );
  // return data.products.edges;

  const { mockProducts } = await import("@/lib/products");
  return mockProducts;
}
