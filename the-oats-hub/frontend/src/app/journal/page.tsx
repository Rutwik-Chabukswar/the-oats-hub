import { Metadata } from "next";
import { EditorialHero } from "@/components/editorial/editorial-hero";
import { JournalCard } from "@/components/editorial/journal-card";

export const metadata: Metadata = {
  title: "The Journal | Premium Wellness Insights | The Oats Hub",
  description: "Explore our collection of articles on nutrition science, ingredient transparency, and sustainable wellness.",
};

const DUMMY_ARTICLES = [
  {
    title: "The Science of High-Protein Breakfasts",
    excerpt: "Why starting your day with 30g of protein changes your metabolic trajectory and cognitive focus for the next 12 hours.",
    category: "Nutrition Science",
    date: "October 12, 2023",
    slug: "science-of-high-protein-breakfasts",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Decoding Clean Labels: What Are You Really Eating?",
    excerpt: "A deep dive into the hidden additives in modern wellness foods, and why we believe in an uncompromising ingredient list.",
    category: "Ingredient Transparency",
    date: "September 28, 2023",
    slug: "decoding-clean-labels",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Oats: The Unsung Hero of Sustained Energy",
    excerpt: "Exploring the complex carbohydrates and beta-glucan fiber in premium oats that provide stable, long-lasting energy.",
    category: "Wellness Education",
    date: "September 15, 2023",
    slug: "oats-unsung-hero",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function JournalPage() {
  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 md:px-6 pb-32">
        <EditorialHero 
          badge="The Journal"
          title="Insights for a Better Morning."
          subtitle="A curated publication exploring nutrition science, clean ingredients, and the pursuit of optimal daily performance."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12">
          {DUMMY_ARTICLES.map((article, index) => (
            <JournalCard key={article.slug} {...article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
