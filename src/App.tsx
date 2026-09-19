import { CartProvider } from "@/cart";
import { RouteProvider } from "@/router";
import { useRoute } from "@/useRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import RavenickBadge from "@/components/RavenickBadge";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";

function Pages() {
  const { page } = useRoute();

  switch (page.name) {
    case "home":
      return <HomePage />;
    case "shop":
      return <ShopPage />;
    case "product":
      return <ProductDetailPage />;
    case "cart":
      return <CartPage />;
    case "checkout":
      return <CheckoutPage />;
  }
}

export default function App() {
  return (
    <RouteProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-stone-50">
          <Header />
          <main className="flex-1">
            <Pages />
          </main>
          <Footer />
          <CartDrawer />
          <RavenickBadge />
        </div>
      </CartProvider>
    </RouteProvider>
  );
}


