import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export function CartButton() {
  const { totalItems, setIsOpen } = useCart();
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-3 rounded-full shadow-2xl hover:bg-[#D42B2B] transition-colors duration-200 group"
      aria-label="Open order"
    >
      <ShoppingBag size={20} />
      <span className="font-medium text-sm">My Order</span>
      {totalItems > 0 && (
        <span className="bg-[#D4A843] text-[#1A1A1A] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export function CartPanel() {
  const { items, updateQty, removeItem, clearCart, total, totalItems, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#FAF8F4] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 bg-[#1A1A1A]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#D4A843]" />
                <h2 className="font-serif font-bold text-white text-lg">My Order</h2>
                {totalItems > 0 && (
                  <span className="bg-[#D4A843] text-[#1A1A1A] text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-[#1A1A1A]/40">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-sm">Your order is empty</p>
                  <p className="text-xs text-center">Browse the menu and tap <strong>+</strong> to add items</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex gap-3 items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#1A1A1A] text-sm leading-tight">{item.name}</p>
                        <p className="text-[#D42B2B] font-bold text-sm mt-1">
                          {item.priceNum > 0 ? `$${(item.priceNum * item.qty).toFixed(2)}` : "Price TBD"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#D42B2B] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-black/20 hover:text-[#D42B2B] transition-colors ml-1"
                      >
                        <X size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-black/10 px-6 py-5 space-y-4 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-[#1A1A1A]/60 text-sm">Estimated Total</span>
                  <span className="font-bold text-xl text-[#1A1A1A]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="bg-[#1B2A4A]/8 rounded-xl p-3 text-center">
                  <p className="text-xs text-[#1A1A1A]/60 leading-relaxed">
                    Show this list to your server when you arrive. Prices may vary.
                  </p>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[#1A1A1A]/40 hover:text-[#D42B2B] transition-colors py-1"
                >
                  <Trash2 size={14} />
                  Clear order
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
