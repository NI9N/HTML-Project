import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    text: "Food simply outstanding — by far the best meal I've had in Stratford. Deserving of a Michelin star. The Ninja Bowls are full of umami flavours, packed with fresh and well-portioned ingredients.",
    author: "Google Reviewer"
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
    text: "The owner had Hamachi and blue fin tuna sashimi available — it was just like having it in Japan. They even had the Highball drink, a Japanese staple for izakayas.",
    author: "Dustin Nguyen"
  },
  {
    id: 4,
    rating: 5,
    text: "I was initially hesitant to visit this small Japanese restaurant, but I was absolutely amazed! The staff are incredibly approachable and helpful in guiding us through the menu.",
    author: "Google Reviewer"
  },
  {
    id: 5,
    rating: 5,
    text: "Absolutely PHENOMENAL. The staff was so lovely and sweet. The food was all freshly made and soooo delectable! Can't recommend enough!",
    author: "sparklyclarke"
  },
  {
    id: 6,
    rating: 4,
    text: "Delicious bowl of Tonkatsu Ramen. Friendly staff. Will definitely come back.",
    author: "C McCarthy"
  }
];

export function Reviews() {
  const { t } = useTranslation();

  return (
    <section id="reviews" className="py-24 bg-[#1B2A4A] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-4 text-[#FAF8F4]">
            {t("reviews.title")}
          </h2>
          <p className="text-white/70 text-lg mb-4">
            {t("reviews.subtitle")}
          </p>
          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-[#F4854A] text-[#F4854A] w-6 h-6" />
            ))}
            <span className="ml-2 font-bold text-2xl">{t("reviews.rating")}</span>
            <span className="ml-1 text-white/50 text-sm self-end mb-0.5">/ 5</span>
          </div>
          <a
            href="https://www.google.com/maps/place/Hungry+Ninja/@43.3701,-80.9825,17z"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-google-reviews"
            className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors mt-2"
          >
            View on Google Maps <ExternalLink size={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              data-testid={`card-review-${review.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
              <p className="text-white/90 italic mb-6 flex-1 text-sm md:text-base leading-relaxed">
                "{review.text}"
              </p>
              <p className="font-bold text-[#FAF8F4] text-sm">— {review.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
