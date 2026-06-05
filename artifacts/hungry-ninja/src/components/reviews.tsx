import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

const REVIEWS = [
  {
    id: 8,
    rating: 5,
    text: "Food and drinks were amazing!!! I would come back to Stratford just for this place alone! I had the yakisoba, lemonade, mochi and a mocktail — and it was affordable for what I got (and as a broke 18-year-old)!",
    author: "charlize"
  },
  {
    id: 9,
    rating: 5,
    text: "Since it was our first time dining at a Japanese restaurant, the server explained the menu really well and made it easy to choose. We ordered the veggie ramen with chicken, chicken teriyaki sushi, miso soup and the yuzu spritzer — everything was absolutely delicious and full of flavour!",
    author: "Pawneet Namu"
  },
  {
    id: 10,
    rating: 5,
    text: "I love going here and bringing my friends. I literally cannot recommend this place enough — it's heaven for me.",
    author: "Tyson Bauld"
  },
  {
    id: 11,
    rating: 5,
    text: "The best ebiten udon I have ever tried.",
    author: "Elena Kapshutar"
  },
  {
    id: 7,
    rating: 5,
    text: "Food simply outstanding — by far the best meal I've had in Stratford, deserving of a Michelin star. The Ninja Bowls are full of umami flavours. It's essentially a one-woman show (with an all-purpose sidekick Ninja helping along) in the kitchen, so allow 90+ minutes as everything is made from scratch.",
    author: "JohnK"
  },
  {
    id: 1,
    rating: 5,
    text: "The owner had Hamachi and blue fin tuna sashimi available, and it was just like when I had it in Japan — they even had the Highball drink, a Japanese staple for izakayas. A great spot for Japanese food in Stratford.",
    author: "Dustin Nguyen"
  },
  {
    id: 2,
    rating: 5,
    text: "Small, cozy space with delicious food and friendly service! They were very accommodating with our group of 10. The Ninja Star bowl was delicious — loved the crispy tempura shrimp and smoked salmon paired with the ninja sauce!",
    author: "Cailey Huang"
  },
  {
    id: 3,
    rating: 5,
    text: "Loved getting lunch here, service was friendly and the food was fresh and flavorful. The Ninja Bomb bowl with shrimp tempura and salmon was delicious and filling. Definitely recommend!",
    author: "Elisa J."
  },
  {
    id: 4,
    rating: 5,
    text: "Absolutely PHENOMENAL. The staff was so lovely and sweet, and happy to talk us through the menu! We ordered to go and the food was all freshly made for us, and was soooo delectable. Can't recommend enough!",
    author: "sparklyclarke"
  },
  {
    id: 5,
    rating: 5,
    text: "I was hesitant to visit this small Japanese restaurant, but I was absolutely amazed! We ordered the Unagi Bowl and Tofu Bowl with the Spicy Ninja Sauce, and tried the Spicy Salmon. Everything was incredibly fresh and delicious. Highly recommend this hidden gem!",
    author: "Paige Collins"
  },
  {
    id: 6,
    rating: 5,
    text: "Quite literally the best meal we'd had since moving to Stratford. I ordered the spicy salmon roll, miso soup & salmon sashimi while my partner had the pork belly noodles. The service was phenomenal and presentation + quality was unmatched.",
    author: "Mal Taylor"
  }
];

export function Reviews() {
  const { t } = useTranslation();

  return (
    <section id="reviews" className="py-24 bg-[#1B2A4A] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
