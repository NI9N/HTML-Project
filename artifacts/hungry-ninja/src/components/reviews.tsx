import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Reviews() {
  const { t } = useTranslation();

  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Absolutely PHENOMENAL. The staff was so lovely and sweet. The food was all freshly made and soooo delectable! Can't recommend enough!",
      author: "sparklyclarke"
    },
    {
      id: 2,
      rating: 5,
      text: "The Ninja Star bowl was delicious — loved the crispy tempura shrimp and smoked salmon paired with ninja sauce!",
      author: "Cailey"
    },
    {
      id: 3,
      rating: 5,
      text: "The owner had Hamachi and blue fin tuna sashimi available — it was just like having it in Japan.",
      author: "Dustin Nguyen"
    },
    {
      id: 4,
      rating: 4,
      text: "Delicious bowl of Tonkatsu Ramen. Friendly staff. Will definitely come back.",
      author: "C McCarthy"
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-[#1B2A4A] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-4 text-[#FAF8F4]">
            {t("reviews.title")}
          </h2>
          <p className="text-white/70 text-lg">
            {t("reviews.subtitle")}
          </p>
          <div className="flex justify-center items-center mt-4 gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-[#F4854A] text-[#F4854A] w-6 h-6" />
            ))}
            <span className="ml-2 font-bold text-xl">4.5+</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 shadow-lg flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? "fill-[#F4854A] text-[#F4854A]" : "fill-white/20 text-white/20"}`} 
                  />
                ))}
              </div>
              <p className="text-white/90 italic mb-6 flex-1 text-sm md:text-base">
                "{review.text}"
              </p>
              <p className="font-bold text-[#FAF8F4] text-sm">
                — {review.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
