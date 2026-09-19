import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { useRoute } from "@/useRoute";
import { categories } from "@/data";

export default function Footer() {
  const { navigate } = useRoute();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Newsletter */}
        <div className="border-b border-stone-700/50 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-50 leading-tight">
                Join the LUMEN circle
              </h2>
              <p className="text-stone-400 mt-3 text-base max-w-md">
                Early access to new collections, members-only pricing, and stories from our makers.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent border-b border-stone-600 pb-3 text-stone-50 placeholder:text-stone-500 outline-none focus:border-stone-300 transition-colors"
              />
              <button className="group flex items-center gap-2 text-stone-50 font-medium pb-3 whitespace-nowrap">
                Subscribe
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 py-16">
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => navigate({ name: "home" })}
              className="font-serif text-2xl text-stone-50 mb-4 block"
            >
              LUMEN
            </button>
            <p className="text-sm text-stone-400 max-w-[220px] leading-relaxed">
              Thoughtfully designed essentials for modern living. Made to last, designed to endure.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate({ name: "shop" })} className="hover:text-stone-50 transition-colors">
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate({ name: "shop", category: cat.id })}
                    className="hover:text-stone-50 transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {["Our Story", "Sustainability", "Journal", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-stone-50 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              {["Shipping", "Returns & Exchanges", "Size Guide", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-stone-50 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 mb-4">Follow</h4>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-stone-700 rounded-full flex items-center justify-center hover:bg-stone-50 hover:text-stone-900 transition-all"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-700/50 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-500">
          <p>Â© 2026 LUMEN. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

