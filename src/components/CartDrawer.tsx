import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/useCart";
import { useRoute } from "@/useRoute";
import { formatPrice } from "@/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const { navigate } = useRoute();

  const goCheckout = () => {
    closeCart();
    navigate({ name: "checkout" });
  };

  const goCart = () => {
    closeCart();
    navigate({ name: "cart" });
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={closeCart} />
      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-stone-50 flex flex-col transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-stone-900" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Cart ({totalItems})
            </h2>
          </div>
          <button onClick={closeCart} aria-label="Close cart" className="text-stone-600 hover:text-stone-900 transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
              <ShoppingBag size={28} strokeWidth={1} className="text-stone-400" />
            </div>
            <p className="text-stone-500">Your cart is empty</p>
            <button
              onClick={() => {
                closeCart();
                navigate({ name: "shop" });
              }}
              className="px-6 py-3 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 no-scrollbar">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 h-24 bg-stone-100 rounded-sm overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-stone-900 truncate">{item.product.name}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {item.color} Â· Size {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-stone-300 rounded-sm">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>
                      <span className="text-sm font-medium text-stone-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-stone-300 hover:text-stone-900 transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-stone-200 px-6 py-5 space-y-4 shrink-0">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-stone-400">Shipping and taxes calculated at checkout.</p>
              <button
                onClick={goCheckout}
                className="w-full py-3.5 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={goCart}
                className="w-full text-center text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                View full cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

