import { PremiumHero } from "@/components/storefront/premium-hero";
import { BrandPhilosophy } from "@/components/storefront/brand-philosophy";
import { ProductShowcase } from "@/components/storefront/product-showcase";
import { CinematicIngredientShowcase } from "@/components/storefront/cinematic-ingredient-showcase";
import { WhyChooseUs } from "@/components/storefront/why-choose-us";
import { ProductBenefits } from "@/components/storefront/product-benefits";
import { TrustSection } from "@/components/storefront/trust-section";
import { PremiumCTA } from "@/components/storefront/premium-cta";
import { PremiumFooter } from "@/components/storefront/premium-footer";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic Hero — Full viewport, emotional hook */}
      <PremiumHero />

      {/* 2. Brand Philosophy — Clean ingredients, premium quality, wellness-first */}
      <BrandPhilosophy />

      {/* 3. Featured Products — Curated product grid with staggered reveal */}
      <ProductShowcase />


      {/* 5. Cinematic Ingredient Showcase — Luxury editorial magazine spread */}
      <CinematicIngredientShowcase />

      {/* 6. Why Choose Us — Trust pillars with hover elevation */}
      <WhyChooseUs />

      {/* 7. Product Benefits — Bento-grid nutrition features */}
      <ProductBenefits />

      {/* 8. Trust + Testimonials — Social proof and stats */}
      <TrustSection />

      {/* 9. Premium CTA — Final conversion push */}
      <PremiumCTA />

      {/* 10. Luxury Footer — Editorial brand closing */}
      <PremiumFooter />
    </>
  );
}
