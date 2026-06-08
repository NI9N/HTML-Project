import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

const CART_KEY = "hungry-ninja-cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch { /* quota exceeded, ignore */ }
}

export type CartItemAddon = {
  name: string;
  price: string;
  priceNum: number;
};

export type CartItem = {
  id: string;
  baseId: string;
  name: string;
  price: string;
  priceNum: number;
  qty: number;
  addons: CartItemAddon[];
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  notifyCount: number;
  notify: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [notifyCount, setNotifyCount] = useState(0);

  // Persist to localStorage on every change
  useEffect(() => { saveCart(items); }, [items]);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
    } else {
      setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
    }
  };

  const clearCart = () => setItems([]);

  const notify = useCallback(() => setNotifyCount((c) => c + 1), []);

  const total = items.reduce((sum, item) => sum + item.priceNum * item.qty, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, totalItems, isOpen, setIsOpen, notifyCount, notify }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
