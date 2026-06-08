import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function OrderSummary() {
  const { items, clearCart, total, totalItems } = useCart();
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Order — Hungry Ninja";
  }, []);

  const handlePrint = () => window.print();
  const handleBack = () => navigate("/");
  const handleClear = () => { clearCart(); navigate("/"); };

  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: "#1A1A1A" }}
      animate={{ opacity: 1, backgroundColor: "#FAF8F4" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen"
    >
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white px-6 py-6 print:bg-white print:text-black print:border-b print:border-black/20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif font-bold text-2xl print:text-xl">Hungry Ninja</h1>
          <p className="text-[#D4A847] text-sm mt-1 print:text-gray-600">Order Summary</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 print:py-4">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500 mb-4">Your order is empty</p>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white rounded-xl font-medium hover:bg-[#D42B2B] transition-colors"
            >
              Back to Menu
            </button>
          </div>
        ) : (
          <>
            {/* Order date */}
            <p className="text-sm text-gray-400 mb-6 print:text-gray-500">
              Order prepared: {new Date().toLocaleDateString("en-US", {
                weekday: "long", year: "numeric", month: "long", day: "numeric",
              })}
            </p>

            {/* Items */}
            <div className="space-y-3 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 shadow-sm border border-black/5 print:border-black/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[#1A1A1A] text-base">{item.name}</h3>
                      <p className="text-sm text-gray-400 mt-0.5">Qty: {item.qty}</p>
                    </div>
                    <span className="font-bold text-lg text-[#1A1A1A] whitespace-nowrap ml-4">
                      ${(item.priceNum * item.qty).toFixed(2)}
                    </span>
                  </div>
                  {item.addons.length > 0 && (
                    <ul className="mt-2 space-y-0.5">
                      {item.addons.map((a, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#D4A847]/80 pl-3 border-l-2 border-[#D4A847]/30">
                          <span>+ {a.name}</span>
                          <span className="text-gray-400">{a.price}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5 mb-8 print:border-black/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                <span>Tax & service</span>
                <span>Calculated at register</span>
              </div>
              <div className="border-t border-black/10 pt-3 flex justify-between items-center">
                <span className="font-bold text-lg">Estimated Total</span>
                <span className="font-bold text-2xl text-[#D42B2B]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Note */}
            <div className="bg-[#1B2A4A]/5 rounded-xl p-4 text-center mb-8 print:bg-transparent print:border print:border-black/10">
              <p className="text-sm text-gray-500 leading-relaxed">
                Show this screen to your server when you arrive. Prices and availability may vary.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 print:hidden">
              <button
                onClick={handleBack}
                className="flex-1 py-3 rounded-xl bg-[#1A1A1A] text-white font-medium hover:bg-[#D42B2B] transition-colors text-center"
              >
                Back to Menu
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 py-3 rounded-xl border-2 border-[#1A1A1A] text-[#1A1A1A] font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors text-center"
              >
                Print / Save PDF
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-3 rounded-xl bg-white border border-red-200 text-red-400 font-medium hover:bg-red-50 transition-colors text-center"
              >
                Clear & Start Over
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
