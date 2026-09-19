declare module "lucide-react" {
  import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Check: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const CreditCard: LucideIcon;
  export const Heart: LucideIcon;
  export const Instagram: LucideIcon;
  export const Lock: LucideIcon;
  export const Menu: LucideIcon;
  export const Minus: LucideIcon;
  export const Plus: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Search: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const Star: LucideIcon;
  export const Truck: LucideIcon;
  export const Twitter: LucideIcon;
  export const X: LucideIcon;
  export const Youtube: LucideIcon;
}

