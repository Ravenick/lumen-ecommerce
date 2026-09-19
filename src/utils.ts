import type { Product } from "./types";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

export function badgeLabel(badge: NonNullable<Product["badge"]>): string {
  switch (badge) {
    case "new":
      return "New";
    case "bestseller":
      return "Bestseller";
    case "sale":
      return "Sale";
    case "limited":
      return "Limited";
  }
}

export function badgeStyle(badge: NonNullable<Product["badge"]>): string {
  switch (badge) {
    case "new":
      return "bg-stone-900 text-stone-50";
    case "bestseller":
      return "bg-stone-100 text-stone-900 border border-stone-300";
    case "sale":
      return "bg-sale-500 text-white";
    case "limited":
      return "bg-stone-50 text-stone-900 border border-stone-400";
  }
}

