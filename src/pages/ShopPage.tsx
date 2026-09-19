import { useState, useMemo } from "react";
import { SlidersHorizontal, X, Check } from "lucide-react";
import { products, categories } from "@/data";
import type { Category } from "@/types";
import ProductCard from "@/components/ProductCard";
import { useRoute } from "@/useRoute";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export default function ShopPage() {
  const { page, navigate } = useRoute();
  const initialCategory = page.name === "shop" ? page.category : undefined;

  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    initialCategory ? new Set([initialCategory as Category]) : new Set(),
  );
  const [sort, setSort] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState(250);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.price <= maxPrice);
    if (selectedCategories.size > 0) {
      result = result.filter((p) => selectedCategories.has(p.category));
    }
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }
    return result;
  }, [selectedCategories, sort, maxPrice]);

  const activeCategoryLabel = initialCategory
    ? categories.find((c) => c.id === initialCategory)?.label
    : null;

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <nav className="text-xs text-stone-400 mb-4">
          <button onClick={() => navigate({ name: "home" })} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <span className="mx-2">/</span>
          <span className="text-stone-900">{activeCategoryLabel || "Shop All"}</span>
        </nav>
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900">
          {activeCategoryLabel || "All Products"}
        </h1>
        <p className="text-stone-500 mt-3 text-base">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-28 space-y-8">
            <FilterSection
              title="Category"
              content={
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${
                          selectedCategories.has(cat.id)
                            ? "bg-stone-900 border-stone-900"
                            : "border-stone-300 group-hover:border-stone-500"
                        }`}
                      >
                        {selectedCategories.has(cat.id) && <Check size={12} strokeWidth={3} className="text-stone-50" />}
                      </button>
                      <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              }
            />

            <FilterSection
              title="Price Range"
              content={
                <div>
                  <input
                    type="range"
                    min={0}
                    max={250}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-stone-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-500 mt-2">
                    <span>$0</span>
                    <span className="font-medium text-stone-900">Up to ${maxPrice}</span>
                  </div>
                </div>
              }
            />

            {(selectedCategories.size > 0 || maxPrice < 250 || sort !== "featured") && (
              <button
                onClick={() => {
                  setSelectedCategories(new Set());
                  setMaxPrice(250);
                  setSort("featured");
                  navigate({ name: "shop" });
                }}
                className="text-sm text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-4"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-sm text-sm font-medium text-stone-900"
            >
              <SlidersHorizontal size={16} strokeWidth={1.5} />
              Filters
            </button>
            <div className="hidden lg:block" />
            <label className="flex items-center gap-2 text-sm">
              <span className="text-stone-500">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="border border-stone-300 rounded-sm px-3 py-2 text-sm bg-stone-50 text-stone-900 outline-none focus:border-stone-900 transition-colors cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} delayClass={`stagger-${(i % 4) + 1}`} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-stone-500 text-lg">No products match your filters</p>
              <button
                onClick={() => {
                  setSelectedCategories(new Set());
                  setMaxPrice(250);
                }}
                className="mt-4 px-6 py-3 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          showFilters ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
        <div
          className={`absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-stone-50 flex flex-col transition-transform duration-400 ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900">Filters</h2>
            <button onClick={() => setShowFilters(false)} aria-label="Close filters">
              <X size={20} strokeWidth={1.5} className="text-stone-900" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            <FilterSection
              title="Category"
              content={
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${
                          selectedCategories.has(cat.id)
                            ? "bg-stone-900 border-stone-900"
                            : "border-stone-300 group-hover:border-stone-500"
                        }`}
                      >
                        {selectedCategories.has(cat.id) && <Check size={12} strokeWidth={3} className="text-stone-50" />}
                      </button>
                      <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors">
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              }
            />
            <FilterSection
              title="Price Range"
              content={
                <div>
                  <input
                    type="range"
                    min={0}
                    max={250}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-stone-900 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-500 mt-2">
                    <span>$0</span>
                    <span className="font-medium text-stone-900">Up to ${maxPrice}</span>
                  </div>
                </div>
              }
            />
          </div>
          <div className="border-t border-stone-200 px-6 py-4">
            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-3.5 bg-stone-900 text-stone-50 text-sm font-medium rounded-sm"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-stone-500 mb-4 font-semibold">{title}</h3>
      {content}
    </div>
  );
}

