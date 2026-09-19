import { createContext, useState, useCallback, type ReactNode } from "react";

export type Page =
  | { name: "home" }
  | { name: "shop"; category?: string }
  | { name: "product"; id: string }
  | { name: "cart" }
  | { name: "checkout" };

interface RouteContextValue {
  page: Page;
  navigate: (page: Page) => void;
}

export const RouteContext = createContext<RouteContextValue | undefined>(undefined);

export function RouteProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>({ name: "home" });

  const navigate = useCallback((next: Page) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return <RouteContext.Provider value={{ page, navigate }}>{children}</RouteContext.Provider>;
}



