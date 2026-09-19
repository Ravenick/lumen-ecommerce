import type { Product } from "@/types";
import { formatPrice, badgeLabel, badgeStyle } from "@/utils";
import { useCart } from "@/useCart";
import { useRoute } from "@/useRoute";
import { Plus } from "lucide-react";

interface Props {
  product: Product;
  className?: string;
  delayClass?: string;
}

export default function ProductCard({ product, className = "", delayClass = "" }: Props) {
  const { navigate } = useRoute();
  const { addToCart } = useCart();

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0].name, 1);
  };

  return (
    <div
      onClick={() => navigate({ name: "product", id: product.id })}
      className={`group cursor-pointer ${className} ${delayClass} animate-fade-up`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm ${badgeStyle(product.badge)}`}
          >
            {badgeLabel(product.badge)}
          </span>
        )}
        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400" style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}>
          <button
            onClick={quickAdd}
            className="w-full bg-stone-50/95 backdrop-blur-sm text-stone-900 py-3 text-sm font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-stone-900 hover:text-stone-50 transition-all"
          >
            <Plus size={16} strokeWidth={2} />
            Quick Add
          </button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-stone-400 uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-sm font-medium text-stone-900 mt-1 leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-medium text-stone-900">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-stone-400 line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        {/* Color dots */}
        <div className="flex gap-1.5 mt-2.5">
          {product.colors.map((color) => (
            <span
              key={color.name}
              className="w-3 h-3 rounded-full border border-stone-300 ring-1 ring-stone-100"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

