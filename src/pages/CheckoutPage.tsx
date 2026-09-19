import { useState } from "react";
import { Lock, Check, CreditCard, ArrowLeft } from "lucide-react";
import { useCart } from "@/useCart";
import { useRoute } from "@/useRoute";
import { formatPrice } from "@/utils";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { navigate } = useRoute();
  const [step, setStep] = useState<"form" | "success">("form");
  const [email, setEmail] = useState("");

  const shipping = subtotal >= 100 ? 0 : 8;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const completeOrder = () => {
    setStep("success");
    clearCart();
    window.scrollTo({ top: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeOrder();
  };

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 md:py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-accent-500 flex items-center justify-center mx-auto mb-8 animate-scale-in">
          <Check size={36} strokeWidth={2} className="text-white" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">Order confirmed</h1>
        <p className="text-stone-500 text-lg mb-2">
          Thank you{email ? `, ${email.split("@")[0]}` : ""}. Your order has been placed.
        </p>
        <p className="text-stone-400 text-sm mb-10">
          A confirmation email is on its way. Your items will ship within 1â€“2 business days.
        </p>
        <div className="bg-stone-100/60 rounded-sm p-6 text-left mb-10 max-w-md mx-auto">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-500">Order number</span>
            <span className="font-medium text-stone-900">LUM-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-500">Total paid</span>
            <span className="font-medium text-stone-900">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Estimated delivery</span>
            <span className="font-medium text-stone-900">3â€“5 business days</span>
          </div>
        </div>
        <button
          onClick={() => navigate({ name: "home" })}
          className="px-8 py-4 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-5">
        <h1 className="font-serif text-3xl text-stone-900 mb-4">Nothing to check out</h1>
        <p className="text-stone-500 mb-8">Your cart is empty.</p>
        <button
          onClick={() => navigate({ name: "shop" })}
          className="px-8 py-4 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10 md:py-16">
      <button
        onClick={() => navigate({ name: "cart" })}
        className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-8"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Back to cart
      </button>

      <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Express */}
          <div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {["Apple Pay", "Google Pay", "PayPal"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={completeOrder}
                  className="py-3 border border-stone-300 rounded-sm text-sm font-medium text-stone-900 hover:border-stone-900 hover:bg-stone-100 transition-all"
                >
                  {method}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400 uppercase tracking-wider">Or pay by card</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>
          </div>

          {/* Contact */}
          <Section title="Contact" step="1">
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <label className="flex items-center gap-2 mt-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-stone-900" />
              <span className="text-sm text-stone-500">Email me with news and offers</span>
            </label>
          </Section>

          {/* Shipping */}
          <Section title="Shipping address" step="2">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" required placeholder="Jane" />
              <Input label="Last name" required placeholder="Doe" />
            </div>
            <Input label="Address" required placeholder="123 Main Street" />
            <Input label="Apartment, suite, etc. (optional)" placeholder="Apt 4B" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" required placeholder="New York" />
              <Input label="ZIP code" required placeholder="10001" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="State" required placeholder="NY" />
              <Input label="Country" required placeholder="United States" defaultValue="United States" />
            </div>
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
          </Section>

          {/* Shipping method */}
          <Section title="Delivery method" step="3">
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 border border-stone-300 rounded-sm cursor-pointer hover:border-stone-900 transition-all has-[:checked]:border-stone-900 has-[:checked]:bg-stone-100/60">
                <div className="flex items-center gap-3">
                  <input type="radio" name="delivery" defaultChecked className="accent-stone-900" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">Standard delivery</p>
                    <p className="text-xs text-stone-500">3â€“5 business days</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-stone-900">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </label>
              <label className="flex items-center justify-between p-4 border border-stone-300 rounded-sm cursor-pointer hover:border-stone-900 transition-all has-[:checked]:border-stone-900 has-[:checked]:bg-stone-100/60">
                <div className="flex items-center gap-3">
                  <input type="radio" name="delivery" className="accent-stone-900" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">Express delivery</p>
                    <p className="text-xs text-stone-500">1â€“2 business days</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-stone-900">$18</span>
              </label>
            </div>
          </Section>

          {/* Payment */}
          <Section title="Payment" step="4">
            <div className="relative">
              <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-stone-400">
                <Lock size={12} strokeWidth={2} />
                Secure
              </div>
              <Input label="Card number" required placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Expiry date" required placeholder="MM / YY" />
              <Input label="CVC" required placeholder="123" />
            </div>
            <Input label="Name on card" required placeholder="Jane Doe" />
          </Section>

          <button
            type="submit"
            className="w-full py-4 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
          >
            <Lock size={16} strokeWidth={1.5} />
            Pay {formatPrice(total)}
          </button>
          <p className="text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
            <Lock size={12} strokeWidth={2} />
            Encrypted and secure. We never store your card details.
          </p>
        </form>

        {/* Order summary */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-5">Your order</h2>
          <div className="space-y-4 mb-6">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative w-20 h-24 bg-stone-100 rounded-sm overflow-hidden shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  <span className="absolute -top-1 -right-1 bg-stone-900 text-stone-50 text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-stone-900 truncate">{item.product.name}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">{item.color} Â· {item.size}</p>
                  <p className="text-sm font-medium text-stone-900 mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Shipping</span>
              <span className="font-medium text-stone-900">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Tax</span>
              <span className="font-medium text-stone-900">{formatPrice(tax)}</span>
            </div>
            <div className="border-t border-stone-200 pt-2 flex justify-between">
              <span className="font-semibold text-stone-900">Total</span>
              <span className="font-semibold text-stone-900 text-lg">{formatPrice(total)}</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-stone-100/60 rounded-sm">
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <CreditCard size={14} strokeWidth={1.5} />
              <span className="font-medium">Accepted payment methods</span>
            </div>
            <div className="flex gap-2">
              {["Visa", "Mastercard", "Amex", "Apple Pay"].map((m) => (
                <span key={m} className="text-xs px-2.5 py-1 bg-stone-50 border border-stone-200 rounded text-stone-600">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, step, children }: { title: string; step: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-6 h-6 rounded-full border border-stone-400 flex items-center justify-center text-xs text-stone-600 font-medium">
          {step}
        </span>
        <h2 className="text-lg font-medium text-stone-900">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  required,
  placeholder,
  value,
  onChange,
  defaultValue,
}: {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-stone-500 mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-sm text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-stone-900 focus:bg-stone-50 transition-all"
      />
    </div>
  );
}



