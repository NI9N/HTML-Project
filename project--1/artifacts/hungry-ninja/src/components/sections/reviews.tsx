import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

type ReviewTranslation = { zh: string; ja: string };

type Review = {
  id: number;
  rating: number;
  text: string;
  author: string;
  translation: ReviewTranslation;
};

const REVIEWS: Review[] = [
  {
    id: 12,
    rating: 5,
    text: "When I came in, I was hungry and not a ninja, but when the mighty noodles arrived at my table in a flash, I left FULL and like a ninja.",
    author: "Manny Fernandez",
    translation: {
      zh: "我来的时候饥肠辘辘，根本不是个忍者。但当那一碗霸气面条闪电般端上桌后，我吃饱喝足，走起路来都像是个忍者了。",
      ja: "来たときはお腹ペコペコで、忍者なんかじゃなかった。でも、力強い麺が一瞬でテーブルに届いたあとは、お腹いっぱい、まるで忍者のように店を後にしたよ。"
    }
  },
  {
    id: 8,
    rating: 5,
    text: "Food and drinks were amazing!!! I would come back to Stratford just for this place alone! I had the yakisoba, lemonade, mochi and a mocktail — and it was affordable for what I got (and as a broke 18-year-old)!",
    author: "charlize",
    translation: {
      zh: "食物和饮品太棒了！！！我会为了这家店专程再来斯特拉特福德的！我点了日式炒面、柠檬水、麻糬和一杯无酒精鸡尾酒——对于我得到的食物来说价格很实惠（作为一个身无分文的18岁少年来说）！",
      ja: "料理もドリンクも最高でした！！！このお店のためだけにストラトフォードに戻ってきたいくらい！焼きそば、レモネード、餅、モクテルを注文しましたが、このクオリティでこの値段は本当にお手頃でした。"
    }
  },
  {
    id: 9,
    rating: 5,
    text: "Since it was our first time dining at a Japanese restaurant, the server explained the menu really well and made it easy to choose. We ordered the veggie ramen with chicken, chicken teriyaki sushi, miso soup and the yuzu spritzer — everything was absolutely delicious and full of flavour!",
    author: "Pawneet Namu",
    translation: {
      zh: "因为这是我们第一次去日式餐厅吃饭，服务员非常详细地介绍了菜单，让我们很容易做出了选择。我们点了蔬菜拉面加鸡肉、照烧鸡肉寿司、味噌汤和柚子气泡饮——每一样都美味至极，风味十足！",
      ja: "初めての日本食レストランでしたが、スタッフの方がメニューを丁寧に説明してくれて、とても選びやすかったです。ベジラーメンチキン、チキン照り焼き寿司、味噌汁、柚子スプリッツァーを注文しましたが、どれも絶品で風味豊かでした！"
    }
  },
  {
    id: 10,
    rating: 5,
    text: "I love going here and bringing my friends. I literally cannot recommend this place enough — it's heaven for me.",
    author: "Tyson Bauld",
    translation: {
      zh: "我超爱来这家店，还带朋友们一起来。我真的不知道怎么推荐才够——这里对我来说就是天堂。",
      ja: "ここに来るのが大好きで、いつも友達を連れてきます。本当に、言葉にできないほどおすすめできる場所——まさに私にとっての天国です。"
    }
  },
  {
    id: 11,
    rating: 5,
    text: "The best ebiten udon I have ever tried.",
    author: "Elena Kapshutar",
    translation: {
      zh: "我吃过的最好吃的炸虾乌冬面。",
      ja: "今まで食べた中で一番美味しい海老天うどんでした。"
    }
  },
  {
    id: 7,
    rating: 5,
    text: "Food simply outstanding — by far the best meal I've had in Stratford, deserving of a Michelin star. The Ninja Bowls are full of umami flavours. It's essentially a one-woman show (with an all-purpose sidekick Ninja helping along) in the kitchen, so allow 90+ minutes as everything is made from scratch.",
    author: "JohnK",
    translation: {
      zh: "食物堪称一流——绝对是迄今为止我在斯特拉特福德吃过的最好一餐，值得米其林星级。忍者盖饭充满了鲜味。厨房基本是老板一人主理（有个万能忍者副手帮忙），所有菜品都是现点现做，所以请留出90分钟以上的时间。",
      ja: "料理はまさに絶品—今までストラトフォードで食べた中で間違いなく最高の食事で、ミシュラン星に値します。忍者ボウルは旨味がたっぷり。厨房は基本的にワンウーマンショー（万能な相棒の忍者が手伝ってくれています）なので、すべて手作りのため90分以上はお時間をご用意ください。"
    }
  },
  {
    id: 1,
    rating: 5,
    text: "The owner had Hamachi and blue fin tuna sashimi available, and it was just like when I had it in Japan — they even had the Highball drink, a Japanese staple for izakayas. A great spot for Japanese food in Stratford.",
    author: "Dustin Nguyen",
    translation: {
      zh: "老板当天有鰤鱼和蓝鳍金枪鱼刺身供应，味道跟在日本吃的一模一样——他们甚至还有高球酒，这可是居酒屋的标配。在斯特拉特福德吃日料的好去处。",
      ja: "オーナーがハマチと本マグロの刺身を用意してくれていて、日本で食べたのとまったく同じ味。ハイボールもあって、居酒屋の定番を楽しめました。ストラトフォードで日本食を楽しむなら最高のお店です。"
    }
  },
  {
    id: 2,
    rating: 5,
    text: "Small, cozy space with delicious food and friendly service! They were very accommodating with our group of 10. The Ninja Star bowl was delicious — loved the crispy tempura shrimp and smoked salmon paired with the ninja sauce!",
    author: "Cailey Huang",
    translation: {
      zh: "小而温馨的空间，食物美味，服务友好！他们非常热情地接待了我们10个人的团体。忍者之星盖饭太好吃了——酥脆的天妇罗虾和烟熏三文鱼配上忍者酱，绝了！",
      ja: "こぢんまりとした居心地の良い空間で、料理は美味しく、サービスもフレンドリー！10名のグループにも快く対応してくれました。ニンジャスターボウルは絶品—サクサクの海老天とスモークサーモンに忍者ソースがベストマッチ！"
    }
  },
  {
    id: 3,
    rating: 5,
    text: "Loved getting lunch here, service was friendly and the food was fresh and flavorful. The Ninja Bomb bowl with shrimp tempura and salmon was delicious and filling. Definitely recommend!",
    author: "Elisa J.",
    translation: {
      zh: "超喜欢在这里吃午餐，服务友好，食物新鲜又美味。忍者爆弹碗配炸虾天妇罗和三文鱼又好吃又管饱。强烈推荐！",
      ja: "ランチにぴったりのお店。サービスは親切で、料理は新鮮で風味豊か。海老天とサーモンのニンジャボムは美味しくてボリューム満点。間違いなくおすすめです！"
    }
  },
  {
    id: 4,
    rating: 5,
    text: "Absolutely PHENOMENAL. The staff was so lovely and sweet, and happy to talk us through the menu! We ordered to go and the food was all freshly made for us, and was soooo delectable. Can't recommend enough!",
    author: "sparklyclarke",
    translation: {
      zh: "真的太棒了。店员超可爱超贴心，很乐意给我们讲解菜单！我们点了外带，食物全是现做的，真的太好吃了。怎么推荐都不够！",
      ja: "本当に最高でした。スタッフの方はとても感じが良く、メニューを丁寧に説明してくれました！テイクアウトで注文しましたが、全部作りたてで、すごく美味しかったです。おすすめしすぎて足りないくらい！"
    }
  },
  {
    id: 5,
    rating: 5,
    text: "I was hesitant to visit this small Japanese restaurant, but I was absolutely amazed! We ordered the Unagi Bowl and Tofu Bowl with the Spicy Ninja Sauce, and tried the Spicy Salmon. Everything was incredibly fresh and delicious. Highly recommend this hidden gem!",
    author: "Paige Collins",
    translation: {
      zh: "本来有点犹豫要不要来这家小店，结果完全被惊艳到了！我们点了鳗鱼盖饭和豆腐盖饭配辣味忍者酱，还试了辣味三文鱼。每一样都超级新鲜美味。强烈推荐这家隐藏的宝藏！",
      ja: "小さな日本食レストランに行くのは少し迷いましたが、もう本当に感動しました！うなぎ丼と豆腐ボウルにスパイシー忍者ソース、スパイシーサーモンを注文。どれも信じられないほど新鮮で美味しかったです。隠れた名店、強くおすすめします！"
    }
  },
  {
    id: 6,
    rating: 5,
    text: "Quite literally the best meal we'd had since moving to Stratford. I ordered the spicy salmon roll, miso soup & salmon sashimi while my partner had the pork belly noodles. The service was phenomenal and presentation + quality was unmatched.",
    author: "Mal Taylor",
    translation: {
      zh: "毫不夸张地说，这是我们搬到斯特拉特福德以来吃过的最好的一餐。我点了辣味三文鱼卷、味噌汤和三文鱼刺身，伴侣点了五花肉面条。服务无可挑剔，摆盘和品质更是无可比拟。",
      ja: "ストラトフォードに引っ越してから間違いなく一番の食事でした。私はスパイシーサーモンロール、味噌汁、サーモン刺身を注文し、パートナーは豚バラ麺を注文。サービスは素晴らしく、盛り付けとクオリティは比類なきものでした。"
    }
  },
];

export function Reviews() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];
  const showTranslation = lang === "zh" || lang === "ja";

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
          <div className="flex justify-center items-center gap-4 mt-2">
            <a
              href="https://www.google.com/maps/place/Hungry+Ninja/@43.3701,-80.9825,17z"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-google-reviews"
              className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Google Maps <ExternalLink size={12} />
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://restaurantguru.com/Hungry-Ninja-Stratford-Ontario/reviews"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-restaurantguru"
              className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Restaurantguru <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => {
            const translationText = review.translation[lang as keyof ReviewTranslation] || review.translation.zh;

            return (
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

                {/* Original English — always visible */}
                <p className="text-white/90 italic flex-1 text-sm md:text-base leading-relaxed">
                  "{review.text}"
                </p>

                {/* Translation — only shown when lang is zh or ja */}
                {showTranslation && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-2">
                      {lang === "zh" ? "中文翻译" : "日本語訳"}
                    </p>
                    <p className="text-[#F5D0C8]/90 text-sm leading-relaxed">
                      {translationText}
                    </p>
                  </div>
                )}

                <p className="font-bold text-[#FAF8F4] text-sm mt-4">— {review.author}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
