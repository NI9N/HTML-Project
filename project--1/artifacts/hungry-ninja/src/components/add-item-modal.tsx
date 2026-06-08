import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Lang, Loc, MenuAddon } from "@/data/menu-items.types";

export type ModalItem = {
  itemId: string;
  name: Loc;
  note?: Loc;
  price?: string;
  image?: string;
  addons?: MenuAddon[];
};

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function AddItemModal({
  item,
  lang,
  commonAddons,
  onClose,
}: {
  item: ModalItem | null;
  lang: Lang;
  commonAddons?: MenuAddon[];
  onClose: () => void;
}) {
  const { addItem, notify } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  // Reset state when a different item is opened
  useEffect(() => {
    setQty(1);
    setSelectedAddons(new Set());
  }, [item?.itemId]);

  if (item === null) return null;

  const allAddons = [...(item.addons || []), ...(commonAddons || [])];
  const hasAddons = allAddons.length > 0;

  const toggleAddon = (key: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const basePriceNum = item.price ? parseFloat(item.price.replace(/[^0-9.]/g, "")) : 0;
  const selected = allAddons.filter((a) => selectedAddons.has(a.name.en));
  const addonTotal = selected.reduce((sum, a) => sum + parseFloat(a.price.replace(/[^0-9.]/g, "")), 0);
  const unitPriceNum = basePriceNum + addonTotal;
  const totalPrice = unitPriceNum * qty;

  const handleConfirm = () => {
    const addonKeys = selected.map((a) => slugify(a.name.en)).sort();
    const comboId = addonKeys.length > 0
      ? `${item.itemId}--${addonKeys.join("--")}`
      : item.itemId;

    for (let i = 0; i < qty; i++) {
      addItem({
        id: comboId,
        baseId: item.itemId,
        name: item.name[lang],
        price: item.price || "$0",
        priceNum: unitPriceNum,
        addons: selected.map((a) => ({
          name: a.name[lang],
          price: a.price,
          priceNum: parseFloat(a.price.replace(/[^0-9.]/g, "")),
        })),
      });
    }
    notify();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-[#0D0D0D] border border-[#D4A847]/20 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header image */}
          {item.image && (
            <div className="relative h-40 md:h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name[lang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />
            </div>
          )}

          <div className="p-5 md:p-6">
            {/* Item name & price */}
            <div className="flex justify-between items-start gap-3 mb-1">
              <h3 className="font-serif font-bold text-xl text-[#FAF8F4]">{item.name[lang]}</h3>
              {item.price && (
                <span className="font-bold text-[#D4A847] text-lg whitespace-nowrap">{item.price}</span>
              )}
            </div>
            {item.note && (
              <p className="text-[#FAF8F4]/50 text-sm mb-4">{item.note[lang]}</p>
            )}

            {/* Add-ons */}
            {hasAddons && (
              <div className="mb-5">
                <p className="text-[#FAF8F4]/60 text-xs font-semibold uppercase tracking-wider mb-2">Add-ons</p>
                <div className="space-y-1.5">
                  {allAddons.map((a) => {
                    const isSelected = selectedAddons.has(a.name.en);
                    return (
                      <button
                        key={a.name.en}
                        onClick={() => toggleAddon(a.name.en)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${
                          isSelected
                            ? "bg-[#D4A847]/15 border-[#D4A847]/50 text-[#E8C35A]"
                            : "bg-black/20 border-white/10 text-[#FAF8F4]/70 hover:border-[#D4A847]/30 hover:text-[#FAF8F4]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[#D4A847] border-[#D4A847]"
                              : "border-white/30"
                          }`}>
                            {isSelected && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span>{a.name[lang]}</span>
                        </div>
                        <span className={isSelected ? "text-[#D4A847]" : "text-[#FAF8F4]/40"}>
                          {a.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[#FAF8F4]/60 text-sm">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white/50 hover:text-white transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="w-8 text-center text-white font-bold text-lg">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-white/50 hover:text-white transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-[#D4A847] text-[#0D0D0D] font-bold text-base hover:bg-[#E8C35A] transition-colors active:scale-[0.98]"
            >
              Add to Order — ${totalPrice > 0 ? totalPrice.toFixed(2) : "0.00"}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
