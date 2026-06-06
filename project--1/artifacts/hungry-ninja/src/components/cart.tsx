import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

function ShoppingBagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function PlusIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function TrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

export function CartButton() {
  const { totalItems, setIsOpen, notifyCount } = useCart();
  const [pulse, setPulse] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);

  useEffect(() => {
    if (notifyCount === 0) return;
    setBounceKey((k) => k + 1);
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [notifyCount]);

  return (
    <motion.button
      key={bounceKey}
      onClick={() => setIsOpen(true)}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-3 rounded-full shadow-2xl hover:bg-[#D42B2B] transition-colors duration-200 overflow-hidden"
      aria-label="Open order"
    >
      {/* Golden light flash */}
      {pulse && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scaleX: 0, opacity: 0.8 }}
          animate={{ scaleX: 3, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            originX: 0.5,
            background: "linear-gradient(90deg, transparent 0%, #D4A847 50%, transparent 100%)",
          }}
        />
      )}
      <ShoppingBagIcon size={20} />
      <span className="font-medium text-sm">My Order</span>
      {totalItems > 0 && (
        <span className="bg-[#D4A843] text-[#1A1A1A] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center relative">
          {totalItems}
        </span>
      )}
    </motion.button>
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
                <ShoppingBagIcon size={20} />
                <span className="text-[#D4A843]" />
                <h2 className="font-serif font-bold text-white text-lg">My Order</h2>
                {totalItems > 0 && (
                  <span className="bg-[#D4A843] text-[#1A1A1A] text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <XIcon size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-[#1A1A1A]/40">
                  <ShoppingBagIcon size={48} />
                  <p className="text-sm">Your order is empty</p>
                  <p className="text-xs text-center">Browse the menu and tap <strong>+</strong> to add items</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex gap-3 items-start">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#1A1A1A] text-sm leading-tight">
                            {item.name} <span className="text-[#1A1A1A]/40 font-normal">x{item.qty}</span>
                          </p>
                          {item.addons.length > 0 && (
                            <ul className="mt-1.5 space-y-0.5">
                              {item.addons.map((a, i) => (
                                <li key={i} className="flex items-center gap-1.5 text-xs text-[#D4A847]/70 pl-2 border-l-2 border-[#D4A847]/30">
                                  <span>+ {a.name}</span>
                                  <span className="text-[#D4A847]/50">{a.price}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <p className="text-[#D42B2B] font-bold text-sm mt-1.5">
                            {item.priceNum > 0 ? `$${(item.priceNum * item.qty).toFixed(2)}` : "Price TBD"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors"
                          >
                            <MinusIcon size={12} />
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#D42B2B] transition-colors"
                          >
                            <PlusIcon size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-black/20 hover:text-[#D42B2B] transition-colors ml-1"
                        >
                          <XIcon size={14} />
                        </button>
                      </div>
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
                  <TrashIcon size={14} />
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
