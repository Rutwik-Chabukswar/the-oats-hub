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
    name: "Almond Fudge (20g Protein)",
    tagline: "Dense, Fudgy, Uncompromising.",
    ingredients: "Premium whey protein blend, whole almonds, cocoa powder, dates, and prebiotics. Delivering 20g of clean protein per bar without the artificial aftertaste.",
    image: "/yogabar_images/1. Protein Bars (20g)- Almond Fudge.jpeg",
    price: "₹120"
  },
  {
    name: "Double Chocolate (20g Protein)",
    tagline: "For The Serious Athlete.",
    ingredients: "Intense dark chocolate, whey protein isolate, cocoa nibs, and almond butter. A guilt-free dessert replacement packed with 20g of slow and fast-digesting proteins.",
    image: "/yogabar_images/2. Protein Bars (20g)- Double Chocolate.jpeg",
    price: "₹120"
  },
  {
    name: "Hazelnut Toffee (20g Protein)",
    tagline: "Luxurious Recovery.",
    ingredients: "Roasted Turkish hazelnuts, natural toffee extract, whey protein, and prebiotic fiber. A sophisticated flavor profile designed for elite muscle recovery.",
    image: "/yogabar_images/3. Protein Bars (20g)- Hazelnut Toffee.jpeg",
    price: "₹120"
  },
  {
    name: "Choco Peanut Butter Power Up",
    tagline: "Classic Fuel, Elevated.",
    ingredients: "Real peanut butter, dark chocolate chunks, whey and soy protein isolate. The timeless power combination offering 20g protein and sustained energy.",
    image: "/yogabar_images/4. Protein Bars (20g)- Choco Peanut Butter.png",
    price: "₹120"
  },
  {
    name: "Coffee Rush Power Up",
    tagline: "Pre-Workout Perfection.",
    ingredients: "Infused with real Arabica coffee beans, premium whey protein, almonds, and dark cocoa. Designed to deliver a natural caffeine kick along with 20g of protein.",
    image: placeholderImg,
    price: "₹120"
  },
  {
    name: "Vanilla Almond (10g Protein)",
    tagline: "Light & Elegant.",
    ingredients: "Natural Madagascar vanilla extract, crunchy almonds, and a clean whey blend. A lighter 10g protein snack perfect for between meals.",
    image: placeholderImg,
    price: "₹60"
  },
  {
    name: "Cashew Orange (10g Protein)",
    tagline: "Zesty & Refreshing.",
    ingredients: "Real dried orange peel, roasted cashews, and dates. A bright, citrusy 10g protein bar that feels like a tropical escape.",
    image: placeholderImg,
    price: "₹60"
  },
  {
    name: "Chocolate Chunk Nut",
    tagline: "Crunchy & Satisfying.",
    ingredients: "Massive dark chocolate chunks, whole peanuts, almonds, and whey. A textured 10g protein bar for serious chocolate lovers.",
    image: placeholderImg,
    price: "₹60"
  },
  {
    name: "Nuts & Seeds",
    tagline: "Nature's Multivitamin.",
    ingredients: "Pumpkin seeds, flax seeds, chia seeds, almonds, and cashews bound with natural honey. 10g protein and abundant Omega-3s.",
    image: placeholderImg,
    price: "₹60"
  },
  {
    name: "Apple Cinnamon",
    tagline: "Warm & Comforting.",
    ingredients: "Real dried apple bits, Ceylon cinnamon, oats, and almonds. A comforting 10g protein snack that tastes like autumn.",
    image: placeholderImg,
    price: "₹60"
  },
  {
    name: "Blueberry Pie",
    tagline: "Antioxidant Rich.",
    ingredients: "Wild dried blueberries, cashews, almonds, and natural berry extracts. 10g protein loaded with free-radical fighting antioxidants.",
    image: placeholderImg,
    price: "₹60"
  },
  {
    name: "Apricot & Fig",
    tagline: "Mediterranean Elegance.",
    ingredients: "Turkish apricots, dried figs, walnuts, and almonds. A naturally sweet 10g protein bar packed with dietary fiber.",
    image: placeholderImg,
    price: "₹60"
  },
  {
    name: "Almond & Coconut",
    tagline: "Tropical Recovery.",
    ingredients: "Desiccated coconut, whole almonds, and whey protein. A 10g protein bar offering healthy MCTs and island flavor.",
    image: placeholderImg,
    price: "₹60"
  },
  {
    name: "Chocolate Chunk Energy Bar",
    tagline: "Sustained Multigrain Energy.",
    ingredients: "Complex carbohydrates from whole grains, rolled oats, millet, and dark chocolate chunks. Designed for sustained endurance without the sugar crash.",
    image: placeholderImg,
    price: "₹50"
  },
  {
    name: "Variety Pack Energy Bars",
    tagline: "Discover Your Favorite.",
    ingredients: "An assorted collection of our best-selling multigrain energy bars. The perfect entry point into the Yogabar ecosystem.",
    image: placeholderImg,
    price: "₹299"
  },
  {
    name: "High Protein Choco Almond Muesli",
    tagline: "The Breakfast of Champions.",
    ingredients: "Toasted oats, premium almonds, dark chocolate, and soy protein isolate. Delivers a massive protein hit to start your morning right.",
    image: placeholderImg,
    price: "₹349"
  },
  {
    name: "High Protein Cranberry Muesli",
    tagline: "Tart, Crunchy, Powerful.",
    ingredients: "High protein muesli base tossed with tart dried cranberries, pumpkin seeds, and almonds. A bright and powerful breakfast.",
    image: placeholderImg,
    price: "₹349"
  },
  {
    name: "Dark Chocolate Muesli",
    tagline: "Morning Indulgence.",
    ingredients: "Rich cocoa-dusted oats, chocolate chunks, and nuts. A luxurious, high-fiber breakfast that feels like dessert.",
    image: placeholderImg,
    price: "₹299"
  },
  {
    name: "High Protein Oats Dark Chocolate",
    tagline: "26g Protein Per Serving.",
    ingredients: "Our highest protein offering. Premium rolled oats blended with whey isolate and dark chocolate. The ultimate muscle-building breakfast.",
    image: placeholderImg,
    price: "₹499"
  },
  {
    name: "High Protein Oats Kesar Pista",
    tagline: "Royal Indian Flavor.",
    ingredients: "High protein oats infused with real saffron (kesar) and crushed pistachios. Traditional Indian dessert flavors transformed into performance nutrition.",
    image: placeholderImg,
    price: "₹499"
  },
  {
    name: "Premium Steel Cut Oats",
    tagline: "Unprocessed Perfection.",
    ingredients: "100% whole grain steel-cut oats. The least processed oat option, resulting in a nutty texture and low glycemic index.",
    image: placeholderImg,
    price: "₹199"
  },
  {
    name: "Gluten Free Oats",
    tagline: "Certified Pure.",
    ingredients: "100% certified gluten-free rolled oats. Processed in a dedicated facility to ensure zero cross-contamination for sensitive stomachs.",
    image: placeholderImg,
    price: "₹249"
  },
  {
    name: "100% Peanut Butter Creamy",
    tagline: "Silky Smooth.",
    ingredients: "Just roasted peanuts. No sugar, no salt, no palm oil. Ultra-creamy texture perfect for smoothies, toast, or straight from the jar.",
    image: placeholderImg,
    price: "₹349"
  },
  {
    name: "100% Peanut Butter Crunchy",
    tagline: "Unbeatable Texture.",
    ingredients: "100% roasted peanuts with generous crushed peanut chunks folded in. Zero additives for the purest crunch possible.",
    image: placeholderImg,
    price: "₹349"
  },
  {
    name: "Premium Grade Whey Protein",
    tagline: "Maximum Bioavailability.",
    ingredients: "100% pure whey protein concentrate and isolate blend. Rapidly absorbing, easy to digest, and essential for post-workout recovery.",
    image: placeholderImg,
    price: "₹1499"
  },
  {
    name: "Premium Dry Fruits & Seeds",
    tagline: "Nature's Powerhouse.",
    ingredients: "A hand-selected mix of premium almonds, walnuts, cashews, pumpkin seeds, and sunflower seeds. The ultimate clean snack.",
    image: placeholderImg,
    price: "₹399"
  }
];

export function YogabarShowcase() {
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
            Yogabar<br />
            <span className="italic text-brand-white/40 text-4xl md:text-6xl">Clean Nutrition.</span>
          </CinematicHeader>
          <p className="mt-8 text-lg text-brand-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the ultimate collection of Yogabar premium products. Crafted for those who demand uncompromising quality, pure ingredients, and extraordinary taste in their wellness journey.
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
                      <p className="font-serif text-sm italic text-black/60 mb-6">Transparency in every bite.</p>
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
                        <p>Crafted to fuel your body with the cleanest nutrition possible. Experience the uncompromising quality and taste of Yogabar.</p>
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
