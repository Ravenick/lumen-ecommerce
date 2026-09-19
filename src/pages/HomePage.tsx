import { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useRoute } from "@/useRoute";
import { products, categories, heroImages, editorialImage } from "@/data";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const { navigate } = useRoute();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featured = products.filter((p) => p.badge === "bestseller" || p.badge === "new").slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-stone-900">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === heroIndex ? 1 : 0 }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
          </div>
        ))}

        <div className="relative h-full max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
          <div className="max-w-2xl">
            <p className="text-stone-50/80 text-sm tracking-[0.2em] uppercase mb-4 animate-fade-up">
              Autumn / Winter 2026
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-stone-50 leading-[1.05] animate-fade-up stagger-1">
              Essentials, refined.
            </h1>
            <p className="text-stone-50/80 text-lg mt-6 max-w-lg leading-relaxed animate-fade-up stagger-2">
              Thoughtfully designed clothing, footwear, and accessories â€” made from premium materials, built to last.
            </p>
            <div className="flex flex-wrap gap-3 mt-8 animate-fade-up stagger-3">
              <button
                onClick={() => navigate({ name: "shop" })}
                className="group px-8 py-4 bg-stone-50 text-stone-900 text-sm font-medium rounded-sm flex items-center gap-2 hover:bg-stone-200 transition-all"
              >
                Shop the Collection
                <ArrowRight size={18} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate({ name: "shop", category: "apparel" })}
                className="px-8 py-4 border border-stone-50/30 text-stone-50 text-sm font-medium rounded-sm hover:bg-stone-50/10 transition-all"
              >
                Explore Apparel
              </button>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 right-5 md:right-10 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === heroIndex ? "w-8 bg-stone-50" : "w-4 bg-stone-50/40"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-stone-900 text-stone-50 py-4 overflow-hidden border-y border-stone-800">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-12 px-6">
              {["Free shipping over $100", "30-day returns", "Carbon-neutral delivery", "Crafted in Europe", "Lifetime repairs"].map((text) => (
                <span key={text} className="text-sm tracking-wider uppercase text-stone-400 flex items-center gap-12">
                  {text}
                  <span className="text-stone-700">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-400 mb-2">Browse by category</p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">Shop the edit</h2>
          </div>
          <button
            onClick={() => navigate({ name: "shop" })}
            className="group flex items-center gap-1.5 text-sm font-medium text-stone-900 hover:gap-3 transition-all"
          >
            View All
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => navigate({ name: "shop", category: cat.id })}
              className={`group relative aspect-[3/4] overflow-hidden rounded-sm bg-stone-100 animate-fade-up stagger-${i + 1}`}
            >
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <h3 className="font-serif text-xl md:text-2xl text-stone-50">{cat.label}</h3>
                <p className="text-stone-50/70 text-sm mt-1">{cat.description}</p>
                <div className="flex items-center gap-1.5 mt-3 text-stone-50 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                  Shop now
                  <ArrowUpRight size={15} strokeWidth={1.5} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28 bg-stone-100/60 -mx-0">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-400 mb-2">Curated selection</p>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900">Featured favorites</h2>
            </div>
            <button
              onClick={() => navigate({ name: "shop" })}
              className="group flex items-center gap-1.5 text-sm font-medium text-stone-900 hover:gap-3 transition-all"
            >
              Shop All
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} delayClass={`stagger-${(i % 4) + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-sm">
          <img src={editorialImage} alt="" className="w-full h-[500px] md:h-[600px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-md px-8 md:px-16">
              <p className="text-stone-50/70 text-sm tracking-[0.15em] uppercase mb-4">The Maker Series</p>
              <h2 className="font-serif text-3xl md:text-5xl text-stone-50 leading-tight">
                Behind the craft
              </h2>
              <p className="text-stone-50/80 text-base mt-4 leading-relaxed">
                From Tuscan tanneries to Portuguese ateliers â€” meet the artisans who shape every LUMEN piece.
              </p>
              <button className="mt-6 group flex items-center gap-2 text-stone-50 text-sm font-medium">
                Read the story
                <ArrowRight size={18} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-20 border-t border-stone-200">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            { icon: Truck, title: "Free shipping", text: "Complimentary on all orders over $100, delivered carbon-neutral." },
            { icon: RotateCcw, title: "Easy returns", text: "30 days to return or exchange. No questions, no restocking fees." },
            { icon: ShieldCheck, title: "Lifetime guarantee", text: "Every piece is backed by our repair-or-replace promise." },
          ].map((prop) => (
            <div key={prop.title} className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center mb-4">
                <prop.icon size={22} strokeWidth={1.25} className="text-stone-900" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">{prop.title}</h3>
              <p className="text-sm text-stone-500 mt-1.5 leading-relaxed max-w-xs">{prop.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews teaser */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pb-8">
        <div className="flex items-center gap-3 justify-center">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="fill-stone-900 text-stone-900" />
            ))}
          </div>
          <span className="text-sm text-stone-600">Loved by 12,000+ customers worldwide</span>
        </div>
      </section>
    </div>
  );
}

