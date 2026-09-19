import { useState } from "react";
import { Star, Minus, Plus, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import { products } from "@/data";
import type { Product } from "@/types";
import { useRoute } from "@/useRoute";
import { useCart } from "@/useCart";
import { formatPrice, badgeLabel, badgeStyle } from "@/utils";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const { page, navigate } = useRoute();
  const { addToCart } = useCart();

  const product = page.name === "product" ? products.find((p) => p.id === page.id) : undefined;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-32 text-center">
        <p className="text-stone-500 mb-4">Product not found</p>
        <button onClick={() => navigate({ name: "shop" })} className="text-stone-900 underline underline-offset-4">
          Back to shop
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }
    setError("");
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-6">
        <nav className="text-xs text-stone-400 flex items-center gap-2">
          <button onClick={() => navigate({ name: "home" })} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <ChevronRight size={12} />
          <button
            onClick={() => navigate({ name: "shop", category: product.category })}
            className="hover:text-stone-900 transition-colors capitalize"
          >
            {product.category}
          </button>
          <ChevronRight size={12} />
          <span className="text-stone-900">{product.name}</span>
        </nav>
      </div>

      {/* Main product */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-20 lg:w-20 lg:h-24 rounded-sm overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === i ? "border-stone-900" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1 aspect-[4/5] bg-stone-100 rounded-sm overflow-hidden relative">
              <img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm ${badgeStyle(product.badge)}`}
                >
                  {badgeLabel(product.badge)}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:py-4">
            <p className="text-xs uppercase tracking-wider text-stone-400">{product.brand}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={i < Math.floor(product.rating) ? "fill-stone-900 text-stone-900" : "text-stone-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-stone-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-2xl font-medium text-stone-900">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-stone-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                  <span className="text-sm font-medium text-sale-500">
                    Save {formatPrice(product.compareAtPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Color */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-stone-900">Color</span>
                <span className="text-sm text-stone-500">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-stone-900 ring-2 ring-stone-200 ring-offset-2 ring-offset-stone-50"
                        : "border-stone-200 hover:border-stone-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-stone-900">Size</span>
                <button className="text-sm text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-4">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setError("");
                    }}
                    className={`min-w-[48px] px-4 py-2.5 text-sm font-medium border rounded-sm transition-all ${
                      selectedSize === size
                        ? "border-stone-900 bg-stone-900 text-stone-50"
                        : "border-stone-300 text-stone-700 hover:border-stone-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="text-sm text-sale-500 mt-2">{error}</p>}
            </div>

            {/* Quantity + Add */}
            <div className="flex gap-3 mt-8">
              <div className="flex items-center border border-stone-300 rounded-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} strokeWidth={2} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-12 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} strokeWidth={2} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex-1 h-12 rounded-sm text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                  added
                    ? "bg-accent-500 text-white"
                    : "bg-stone-900 text-stone-50 hover:bg-stone-800"
                }`}
              >
                {added ? (
                  "Added to cart"
                ) : (
                  <>
                    <ShoppingBag size={18} strokeWidth={1.5} />
                    Add to Cart â€” {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-stone-200">
              {[
                { icon: Truck, text: "Free shipping over $100" },
                { icon: RotateCcw, text: "30-day free returns" },
                { icon: ShieldCheck, text: "Lifetime guarantee" },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center text-center gap-2">
                  <item.icon size={20} strokeWidth={1.25} className="text-stone-600" />
                  <span className="text-xs text-stone-500 leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-3">Description</h3>
              <p className="text-stone-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Details list */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-3">Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="w-1 h-1 rounded-full bg-stone-400 mt-2 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24 border-t border-stone-200">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p: Product, i) => (
              <ProductCard key={p.id} product={p} delayClass={`stagger-${i + 1}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

