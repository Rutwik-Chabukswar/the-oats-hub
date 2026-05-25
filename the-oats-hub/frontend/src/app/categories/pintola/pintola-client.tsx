"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { CinematicHeader } from "@/components/ui/cinematic-header";
import { ScrollReveal } from "@/components/storefront/scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

const products = [
  {
    name: "All Natural Peanut Butter",
    tagline: "100% Pure Roasted Peanuts.",
    ingredients: "Crafted exclusively from premium quality roasted peanuts. Zero added sugar, zero salt, and absolutely no hydrogenated oils. A clean, wholesome source of natural protein and healthy fats.",
    image: "/pintola_images/pintola_all_natural_1779725746050.png",
    price: "₹349"
  },
  {
    name: "All Natural Organic Peanut Butter",
    tagline: "Certified Organic Perfection.",
    ingredients: "Made entirely from certified organic peanuts sourced directly from sustainable farms. Unsweetened, unadulterated, and packed with pure organic goodness for the ultimate health-conscious diet.",
    image: "/pintola_images/pintola_organic_peanut_butter_1779725972733.png",
    price: "₹499"
  },
  {
    name: "High Protein Peanut Butter",
    tagline: "Fuel Your Performance.",
    ingredients: "A powerful blend of premium roasted peanuts and high-quality imported whey protein. Delivering 30g of protein per 100g to support muscle recovery and sustained energy.",
    image: "/pintola_images/pintola_high_protein_1779725708648.png",
    price: "₹549"
  },
  {
    name: "High Protein Dark Chocolate Peanut Butter",
    tagline: "Guilt-Free Indulgence.",
    ingredients: "Rich dark chocolate folded into our signature high-protein peanut butter base. Sweetened without refined sugars and fortified with whey protein for a luxurious, muscle-building treat.",
    image: "/pintola_images/pintola_dark_chocolate_1779725726722.png",
    price: "₹599"
  },
  {
    name: "High Protein Organic Jaggery Peanut Butter",
    tagline: "Traditional Sweetness, Modern Nutrition.",
    ingredients: "Infused with pure, unrefined organic jaggery for a deep, complex sweetness. Paired with our high-protein peanut butter for a healthy twist on a traditional Indian flavor profile.",
    image: "/pintola_images/pintola_jaggery_peanut_butter_1779725996484.png",
    price: "₹579"
  },
  {
    name: "Coconut Jaggery Performance Series",
    tagline: "Tropical Energy Boost.",
    ingredients: "A unique fusion of dry roasted peanuts, desiccated coconut, and raw organic jaggery. Designed for sustained performance with natural electrolytes and healthy MCTs from coconut.",
    image: "/pintola_images/pintola_coconut_jaggery_1779726016383.png",
    price: "₹629"
  },
  {
    name: "Almond Butter",
    tagline: "Premium California Almonds.",
    ingredients: "100% dry-roasted California almonds crushed to perfection. Naturally rich in Vitamin E, antioxidants, and essential minerals. No additives, just pure liquid gold.",
    image: "/pintola_images/pintola_almond_butter_1779726032836.png",
    price: "₹749"
  },
  {
    name: "Dark Chocolate Almond Butter",
    tagline: "The Ultimate Luxury Spread.",
    ingredients: "Silky premium almond butter blended with intense dark chocolate. A sophisticated, nutrient-dense spread rich in flavonoids, healthy monounsaturated fats, and refined flavor.",
    image: "/pintola_images/pintola_dark_chocolate_almond_butter_1779726068996.png",
    price: "₹849"
  },
  {
    name: "Cashew Butter",
    tagline: "Rich, Creamy, Decadent.",
    ingredients: "Made solely from premium, slow-roasted cashews. Unbelievably creamy and naturally sweet. A luxurious source of heart-healthy fats, magnesium, and plant-based protein.",
    image: "/pintola_images/pintola_cashew_butter_1779726084815.png",
    price: "₹799"
  },
  {
    name: "Chocolate Hazelnut Butter",
    tagline: "Better Than The Original.",
    ingredients: "A clean, health-forward take on classic chocolate hazelnut spreads. Made with over 50% real roasted hazelnuts, rich cocoa, and zero palm oil or refined sugars. Pure indulgence.",
    image: "/pintola_images/pintola_chocolate_hazelnut_butter_1779726099304.png",
    price: "₹899"
  },
  {
    name: "Jumbo Rolled Oats",
    tagline: "The Perfect Morning Foundation.",
    ingredients: "100% whole grain jumbo rolled oats. Extra thick and minimally processed to retain maximum fiber and complex carbohydrates. The cornerstone of a sustained-energy morning routine.",
    image: "/pintola_images/pintola_jumbo_rolled_oats_1779726115368.png",
    price: "₹299"
  },
  {
    name: "High Protein Dark Chocolate Oats",
    tagline: "Power Your Breakfast.",
    ingredients: "Premium rolled oats blended with rich dark chocolate chunks, whey protein isolate, and chia seeds. Formulated to provide over 20g of protein per serving for an effortless, muscle-building breakfast.",
    image: "/pintola_images/pintola_dark_chocolate_oats_1779726159824.png",
    price: "₹449"
  },
  {
    name: "Dark Chocolate & Cranberry Muesli",
    tagline: "Antioxidant Rich Crunch.",
    ingredients: "A vibrant blend of toasted oats, real dark chocolate curls, and tart dried cranberries. Fortified with nuts and seeds to provide a balanced macro profile and incredible texture.",
    image: "/pintola_images/pintola_cranberry_muesli_1779726176539.png",
    price: "₹499"
  },
  {
    name: "Choco Muesli",
    tagline: "Chocolatey Whole Grain Goodness.",
    ingredients: "A crunchy, chocolate-infused multi-grain base tossed with almonds and raisins. Naturally sweetened and baked to perfection for a delicious start to your day without the sugar crash.",
    image: "/pintola_images/pintola_choco_muesli_1779726191116.png",
    price: "₹429"
  },
  {
    name: "Organic Wholegrain Brown Rice Cakes",
    tagline: "Light, Crisp, Guilt-Free.",
    ingredients: "Puffed from 100% organic whole grain brown rice. Only 30 calories per cake. The perfect clean canvas for your favorite Pintola peanut or almond butters.",
    image: "/pintola_images/pintola_rice_cakes_1779726208455.png",
    price: "₹199"
  },
  {
    name: "Healthy Chikki",
    tagline: "Traditional Energy On-The-Go.",
    ingredients: "A healthy revival of the classic Indian snack. Made with premium roasted peanuts and unrefined raw jaggery. Packed with iron, protein, and authentic flavor in every crisp bite.",
    image: "/pintola_images/pintola_healthy_chikki_1779726232551.png",
    price: "₹249"
  }
];

export function PintolaShowcase() {
  const scrollToProduct = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#050403] min-h-screen text-brand-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none blur-[120px] bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.06)_0%,_transparent_60%)]" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 relative z-10 max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-brand-gold/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-brand-gold/80 font-medium">
              Featured Brand
            </span>
            <div className="h-[1px] w-12 bg-brand-gold/50" />
          </div>
          <CinematicHeader className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.05] text-brand-white">
            Pintola<br />
            <span className="italic text-brand-white/40 text-4xl md:text-6xl">The Gold Standard.</span>
          </CinematicHeader>
          <p className="mt-8 text-lg text-brand-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the ultimate collection of Pintola premium products. Crafted for those who demand uncompromising quality, pure ingredients, and extraordinary taste in their wellness journey.
          </p>
        </ScrollReveal>
      </section>

      {/* Product Grid */}
      <section className="pb-32 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col cursor-pointer"
              onClick={() => scrollToProduct(product.name)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-brand-white/[0.05] mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Quick View Button on Hover */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <button className="flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-brand-white transition-colors shadow-2xl">
                    <ShoppingBag className="h-4 w-4" />
                    Explore Details
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-serif text-xl text-brand-white leading-tight">
                    {product.name}
                  </h3>
                  <span className="text-brand-gold font-medium mt-1">
                    {product.price}
                  </span>
                </div>
                
                <p className="text-brand-white/40 text-xs tracking-widest uppercase font-medium mb-4">
                  {product.tagline}
                </p>
                
                <p className="text-sm text-brand-white/60 font-light leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {product.ingredients}
                </p>

                {/* Purchase Action */}
                <div className="mt-6 pt-4 border-t border-brand-white/10 flex items-center justify-between">
                  <span className="text-brand-gold text-sm font-medium group-hover:text-brand-white transition-colors flex items-center gap-1">
                    View Dedicated Section
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Product Sections */}
      <section className="bg-brand-black pb-32">
        {products.map((product, i) => {
          const reverse = i % 2 !== 0;
          const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <div id={slug} key={product.name} className="relative py-24 md:py-32 overflow-hidden border-t border-brand-white/[0.02]">
              <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-[1400px]">
                <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16 lg:gap-24`}>
                  
                  {/* Image Presentation */}
                  <div className="w-full lg:w-1/2 relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#0A0A0A]"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                      />
                    </motion.div>

                    {/* The "White Paper" Ingredients Structure */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute z-30 w-[85%] sm:w-2/3 lg:w-[320px] bg-[#FDFBF7] text-brand-black p-8 md:p-10 shadow-2xl rounded-sm ${reverse ? '-bottom-12 -left-6 md:-left-12' : '-bottom-12 -right-6 md:-right-12'}`}
                    >
                      <div className="h-[2px] w-12 bg-brand-gold mb-6" />
                      <h4 className="font-serif text-2xl tracking-tight mb-2">Ingredients</h4>
                      <p className="font-serif text-sm italic text-black/60 mb-6">Transparency in every jar.</p>
                      <p className="text-sm leading-relaxed font-medium text-black/80">
                        {product.ingredients}
                      </p>
                    </motion.div>
                  </div>

                  {/* Editorial Text */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center mt-16 lg:mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: reverse ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-8"
                    >
                      <span className="block font-serif text-6xl md:text-8xl text-brand-white/[0.04] leading-none select-none">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>

                      <div className="-mt-10 md:-mt-12">
                        <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-brand-white mb-4">
                          {product.name}
                        </h3>
                        <p className="text-xl md:text-2xl text-brand-gold font-light italic">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="text-brand-white/50 text-lg leading-relaxed font-light max-w-lg">
                        <p>Every batch is meticulously crafted to ensure the highest standard of nutrition without sacrificing flavor. Elevate your daily routine with the ultimate premium spread.</p>
                      </div>

                      <div className="flex items-center gap-6 pt-6">
                        <MagneticButton magneticPull={0.2}>
                          <button className="flex items-center gap-3 bg-brand-gold text-brand-black px-10 py-4 rounded-full text-sm font-bold tracking-[0.15em] uppercase hover:bg-brand-white transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95">
                            <ShoppingBag className="h-5 w-5" />
                            Purchase - {product.price}
                          </button>
                        </MagneticButton>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
