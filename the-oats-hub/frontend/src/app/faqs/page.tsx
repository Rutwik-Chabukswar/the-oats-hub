import { Metadata } from "next";
import { EditorialHero } from "@/components/editorial/editorial-hero";
import { FAQAccordion } from "@/components/editorial/faq-accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | The Oats Hub",
  description: "Find answers about our premium ingredients, nutrition facts, delivery, and sourcing.",
};

const FAQ_DATA = [
  {
    question: "Are your ingredients completely natural?",
    answer: "Yes. We maintain an uncompromising commitment to clean-label nutrition. Every ingredient in our blends is sourced from nature, with absolutely no artificial sweeteners, synthetic fillers, or preservatives. We rely on the inherent quality of premium raw materials."
  },
  {
    question: "Where do you source your whey protein?",
    answer: "Our whey protein isolate is ultra-filtered and sourced from ethically raised, grass-fed cows. This ensures a superior amino acid profile, maximum bioavailability, and an incredibly clean taste without the chalkiness common in lower-tier proteins."
  },
  {
    question: "What is the shelf life of the oats?",
    answer: "Our premium oat blends are carefully packaged in airtight, oxygen-barrier pouches to preserve freshness. When stored in a cool, dry place away from direct sunlight, they maintain their peak nutritional profile and flavor for up to 6 months."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we focus on delivering the highest quality experience domestically to ensure our products arrive in perfect condition. We are actively working on expanding our premium cold-chain shipping logistics to international markets soon."
  },
  {
    question: "Are your products suitable for dietary restrictions?",
    answer: "Our oats are naturally gluten-free; however, they are processed in a facility that also handles nuts, dairy, and soy. We recommend checking the specific nutritional label on each product page for detailed allergen information. Our blends are inherently high-protein and vegetarian."
  }
];

export default function FAQPage() {
  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-32">
        <EditorialHero 
          badge="Support & Education"
          title="Frequently Asked Questions."
          subtitle="Clarity and transparency regarding our ingredients, processes, and delivery. Because trust is built on truth."
        />
        
        <div className="mt-12">
          <FAQAccordion items={FAQ_DATA} />
        </div>
      </div>
    </div>
  );
}
