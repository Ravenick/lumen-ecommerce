import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/useCart";
import { useRoute } from "@/useRoute";
import { categories } from "@/data";

export default function Header() {
  const { totalItems, openCart } = useCart();
  const { navigate } = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (page: Parameters<typeof navigate>[0]) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bg-stone-900 text-stone-50 text-center text-xs tracking-[0.15em] uppercase py-2.5">
        Free shipping on orders over $100 â€” Complimentary returns
      </div>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-stone-50/95 backdrop-blur-xl shadow-sm" : "bg-stone-50"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-1 -ml-1 text-stone-900"
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => go({ name: "home" })}
                className="font-serif text-2xl md:text-3xl tracking-tight text-stone-900 leading-none"
              >
                LUMEN
              </button>
            </div>

            <nav className="hidden lg:flex items-center gap-10">
              <button
                onClick={() => go({ name: "shop" })}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors relative group"
              >
                Shop All
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => go({ name: "shop", category: cat.id })}
                  className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors relative group"
                >
                  {cat.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <button className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors relative group">
                Journal
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
              </button>
            </nav>

            <div className="flex items-center gap-4 md:gap-5">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-stone-900 hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button
                className="text-stone-900 hover:opacity-60 transition-opacity hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                className="text-stone-900 hover:opacity-60 transition-opacity relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-stone-50 text-[10px] font-semibold w-4.5 h-4.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-stone-50 flex flex-col transition-transform duration-400 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200">
            <span className="font-serif text-2xl text-stone-900">LUMEN</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={22} strokeWidth={1.5} className="text-stone-900" />
            </button>
          </div>
          <nav className="flex flex-col py-4">
            <button
              onClick={() => go({ name: "shop" })}
              className="text-left px-6 py-3.5 text-lg font-medium text-stone-900 hover:bg-stone-100 transition-colors"
            >
              Shop All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => go({ name: "shop", category: cat.id })}
                className="text-left px-6 py-3.5 text-lg font-medium text-stone-900 hover:bg-stone-100 transition-colors"
              >
                {cat.label}
              </button>
            ))}
            <button className="text-left px-6 py-3.5 text-lg font-medium text-stone-900 hover:bg-stone-100 transition-colors">
              Journal
            </button>
          </nav>
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-stone-50 transition-transform duration-400 ${
            searchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8">
            <div className="flex items-center gap-4 border-b border-stone-300 pb-4">
              <Search size={24} strokeWidth={1.5} className="text-stone-400" />
              <input
                autoFocus={searchOpen}
                placeholder="Search for products, categories, or collectionsâ€¦"
                className="flex-1 text-lg md:text-xl bg-transparent outline-none text-stone-900 placeholder:text-stone-400"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={24} strokeWidth={1.5} className="text-stone-600" />
              </button>
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-stone-400 mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {["Linen Shirt", "Sneakers", "Wallet", "Denim", "New Arrivals"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchOpen(false);
                      go({ name: "shop" });
                    }}
                    className="px-4 py-2 text-sm border border-stone-300 rounded-full hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

