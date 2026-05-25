"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { CinematicHeader } from "@/components/ui/cinematic-header";
import { ScrollReveal } from "@/components/storefront/scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

const placeholderImg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="100%" height="100%" fill="%230A0A0A"/><text x="50%" y="50%" font-family="serif" font-size="24" fill="%23C9A84C" text-anchor="middle" dy=".3em">Image Available Soon</text></svg>`;

const products = [
  {
    name: "Daily Greens Superfood Powder",
    tagline: "Alkalize, Detoxify, Energize.",
    ingredients: "A concentrated blend of organic wheatgrass, spirulina, moringa, matcha, and ashwagandha. Cold-pressed to retain bioactive enzymes for ultimate cellular vitality.",
    image: placeholderImg,
    price: "₹1299"
  },
  {
    name: "Ashwagandha Root Extract (KSM-66)",
    tagline: "Master Your Stress.",
    ingredients: "Pure KSM-66 full-spectrum Ashwagandha root extract. Clinically proven to reduce cortisol, improve sleep architecture, and enhance natural endurance.",
    image: placeholderImg,
    price: "₹899"
  },
  {
    name: "Pure Himalayan Shilajit Resin",
    tagline: "The Destroyer of Weakness.",
    ingredients: "100% pure, gold-grade Shilajit resin sourced from >16,000 ft in the Himalayas. Rich in fulvic acid and 84+ trace minerals for profound energy and rejuvenation.",
    image: placeholderImg,
    price: "₹1899"
  },
  {
    name: "Organic Raw Wild Honey",
    tagline: "Unprocessed Liquid Gold.",
    ingredients: "Raw, unfiltered honey sourced directly from wild forest hives. Retains all natural pollen, propolis, and antibacterial properties. No added sugars.",
    image: placeholderImg,
    price: "₹499"
  },
  {
    name: "Ceremonial Grade Matcha",
    tagline: "Zen In A Cup.",
    ingredients: "First-harvest, stone-ground organic matcha green tea from Uji, Japan. Delivers a sustained flow of L-theanine and clean caffeine for calm, focused energy.",
    image: placeholderImg,
    price: "₹1499"
  },
  {
    name: "Lion's Mane Mushroom Extract",
    tagline: "Neurogenesis & Focus.",
    ingredients: "Dual-extracted organic Lion's Mane mushroom fruiting body. Contains potent hericenones and erinacines to support cognitive function, memory, and nerve health.",
    image: placeholderImg,
    price: "₹1199"
  },
  {
    name: "Reishi Mushroom Elixir",
    tagline: "The Mushroom of Immortality.",
    ingredients: "Pure organic Reishi mushroom extract. An ancient adaptogen used to modulate the immune system, lower stress, and promote deep, restorative sleep.",
    image: placeholderImg,
    price: "₹1099"
  },
  {
    name: "Plant-Based Vegan Collagen Builder",
    tagline: "Radiate From Within.",
    ingredients: "A bioavailable blend of Acai berry, Sea Buckthorn, Bamboo silica, and Vitamin C from Amla. Stimulates the body's natural collagen production without animal products.",
    image: placeholderImg,
    price: "₹1399"
  },
  {
    name: "Organic Maca Root Powder",
    tagline: "Peruvian Vitality.",
    ingredients: "Gelatinized organic yellow, red, and black Maca root powder. A powerful adaptogen used for centuries to enhance stamina, mood, and hormonal balance.",
    image: placeholderImg,
    price: "₹799"
  },
  {
    name: "Spirulina & Chlorella Tablets",
    tagline: "Complete Plant Protein.",
    ingredients: "50/50 blend of broken-cell-wall Chlorella and pure Spirulina. A convenient way to consume heavy-metal detoxifiers and the most nutrient-dense greens on earth.",
    image: placeholderImg,
    price: "₹699"
  },
  {
    name: "Turmeric Curcumin & Black Pepper",
    tagline: "Nature's Anti-Inflammatory.",
    ingredients: "High-potency organic turmeric extract standardized to 95% curcuminoids, paired with piperine (black pepper extract) for 2000% increased absorption.",
    image: placeholderImg,
    price: "₹849"
  },
  {
    name: "Organic Moringa Leaf Powder",
    tagline: "The Miracle Tree.",
    ingredients: "Shade-dried, finely milled organic Moringa oleifera leaves. Contains 90 nutrients, 46 antioxidants, and abundant iron for natural immunity and energy.",
    image: placeholderImg,
    price: "₹449"
  },
  {
    name: "Cold-Pressed Black Seed Oil",
    tagline: "Ancient Panacea.",
    ingredients: "100% pure, cold-pressed Nigella Sativa oil. Highly concentrated in Thymoquinone (TQ) to support robust immune response and respiratory health.",
    image: placeholderImg,
    price: "₹999"
  },
  {
    name: "Hibiscus & Rose Herbal Tea",
    tagline: "Botanical Beauty.",
    ingredients: "A loose-leaf infusion of organic Egyptian hibiscus calyces and Indian rose petals. Naturally caffeine-free, tart, refreshing, and loaded with Vitamin C.",
    image: placeholderImg,
    price: "₹549"
  },
  {
    name: "Vegan Omega-3 Algae Oil",
    tagline: "Heart & Brain Health.",
    ingredients: "Pure DHA and EPA extracted directly from marine microalgae. All the cognitive and cardiovascular benefits of fish oil, sourced sustainably without the fish.",
    image: placeholderImg,
    price: "₹1599"
  },
  {
    name: "Organic Hemp Seed Hearts",
    tagline: "The Perfect Ratio.",
    ingredients: "Shelled organic hemp seeds. Offering a complete amino acid profile and the optimal 3:1 ratio of Omega-6 to Omega-3 essential fatty acids.",
    image: placeholderImg,
    price: "₹899"
  }
];

export function OrganicCosmosShowcase() {
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none blur-[120px] bg-[radial-gradient(circle_at_center,_rgba(120,160,100,0.06)_0%,_transparent_60%)]" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 relative z-10 max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-[#78A064]/50" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#78A064]/80 font-medium">
              Featured Brand
            </span>
            <div className="h-[1px] w-12 bg-[#78A064]/50" />
          </div>
          <CinematicHeader className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.05] text-brand-white">
            Organic Cosmos<br />
            <span className="italic text-brand-white/40 text-4xl md:text-6xl">Pure Botanical Alchemy.</span>
          </CinematicHeader>
          <p className="mt-8 text-lg text-brand-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the ultimate collection of Organic Cosmos premium wellness products. Responsibly sourced adaptogens, superfoods, and elixirs designed to optimize your mind, body, and spirit.
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
                  <button className="flex items-center gap-2 bg-[#78A064] text-brand-black px-6 py-3 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-brand-white transition-colors shadow-2xl">
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
                  <span className="text-[#78A064] font-medium mt-1">
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
                  <span className="text-[#78A064] text-sm font-medium group-hover:text-brand-white transition-colors flex items-center gap-1">
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
                      <div className="h-[2px] w-12 bg-[#78A064] mb-6" />
                      <h4 className="font-serif text-2xl tracking-tight mb-2">Botanicals</h4>
                      <p className="font-serif text-sm italic text-black/60 mb-6">Transparency in every dose.</p>
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
                        <p className="text-xl md:text-2xl text-[#78A064] font-light italic">
                          {product.tagline}
                        </p>
                      </div>

                      <div className="text-brand-white/50 text-lg leading-relaxed font-light max-w-lg">
                        <p>Earth's most potent botanicals, ethically sourced and scientifically formulated to elevate your daily vitality.</p>
                      </div>

                      <div className="flex items-center gap-6 pt-6">
                        <MagneticButton magneticPull={0.2}>
                          <button className="flex items-center gap-3 bg-[#78A064] text-brand-black px-10 py-4 rounded-full text-sm font-bold tracking-[0.15em] uppercase hover:bg-brand-white transition-all shadow-[0_0_30px_rgba(120,160,100,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95">
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
