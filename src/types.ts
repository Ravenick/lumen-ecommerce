export type Category = "apparel" | "footwear" | "accessories" | "home";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  rating: number;
  reviewCount: number;
  badge?: "new" | "bestseller" | "sale" | "limited";
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  image: string;
  description: string;
}

