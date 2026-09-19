import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/useCart";
import { useRoute } from "@/useRoute";
import { formatPrice } from "@/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const { navigate } = useRoute();

  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 md:py-32 text-center px-5">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={32} strokeWidth={1} className="text-stone-400" />
        </div>
        <h1 className="font-serif text-3xl text-stone-900 mb-3">Your cart is empty</h1>
        <p className="text-stone-500 mb-8">Looks like you haven't added anything yet. Let's fix that.</p>
        <button
          onClick={() => navigate({ name: "shop" })}
          className="px-8 py-4 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors inline-flex items-center gap-2 group"
        >
          Start Shopping
          <ArrowRight size={18} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10 md:py-16">
      <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-2">Shopping Cart</h1>
      <p className="text-stone-500 mb-10">{totalItems} {totalItems === 1 ? "item" : "items"}</p>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 md:gap-6 pb-6 border-b border-stone-200 last:border-b-0">
              <button
                onClick={() => navigate({ name: "product", id: item.product.id })}
                className="w-28 h-36 md:w-32 md:h-40 bg-stone-100 rounded-sm overflow-hidden shrink-0"
              >
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-stone-400 uppercase tracking-wider">{item.product.brand}</p>
                    <h3
                      className="text-base md:text-lg font-medium text-stone-900 mt-1 cursor-pointer hover:underline underline-offset-4 truncate"
                      onClick={() => navigate({ name: "product", id: item.product.id })}
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-stone-500 mt-1">
                      {item.color} Â· Size {item.size}
                    </p>
                  </div>
                  <span className="text-base font-medium text-stone-900 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-stone-300 rounded-sm">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus size={14} strokeWidth={2} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus size={14} strokeWidth={2} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-sm text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1"
                  >
                    <X size={14} strokeWidth={1.5} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate({ name: "shop" })}
            className="text-sm font-medium text-stone-900 flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowRight size={16} strokeWidth={1.5} className="rotate-180" />
            Continue shopping
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-stone-100/60 rounded-sm p-6 sticky top-28">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-5">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping</span>
                <span className="font-medium text-stone-900">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated tax</span>
                <span className="font-medium text-stone-900">{formatPrice(tax)}</span>
              </div>
              {subtotal < 100 && subtotal > 0 && (
                <p className="text-xs text-stone-500 pt-2">
                  Add {formatPrice(100 - subtotal)} more for free shipping
                </p>
              )}
              <div className="border-t border-stone-300 pt-3 flex justify-between">
                <span className="font-semibold text-stone-900">Total</span>
                <span className="font-semibold text-stone-900 text-lg">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate({ name: "checkout" })}
              className="w-full py-3.5 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors mt-6"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

