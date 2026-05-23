import { Metadata } from "next";
import { IngredientStory } from "@/components/editorial/ingredient-story";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const titleSlug = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    title: `${titleSlug} | Premium Ingredients | The Oats Hub`,
    description: `Learn about the sourcing and nutritional benefits of our premium ${titleSlug}.`,
  };
}

export default async function IngredientPage({ params }: Props) {
  const resolvedParams = await params;
  const titleSlug = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Dummy Data switch based on slug could go here. For now, a generic template based on the slug.
  const isOats = resolvedParams.slug === "oats";
  
  const data = {
    name: titleSlug,
    heroImage: isOats 
      ? "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2000&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop",
    description: isOats 
      ? "Our foundation. Complex carbohydrates delivering sustained, crash-free energy for peak morning performance."
      : "Sourced globally for uncompromising quality. Every ingredient serves a distinct nutritional purpose.",
    benefits: [
      "Sustained Energy Release",
      "High in Beta-Glucan Fiber",
      "Promotes Heart Health",
      "Zero Artificial Additives"
    ],
    sourcing: "Harvested from sustainable, non-GMO farms in premium agricultural regions.",
    nutritionFacts: [
      { label: "Protein", value: "13g per 100g" },
      { label: "Dietary Fiber", value: "10g per 100g" },
      { label: "Iron", value: "24% DV" },
      { label: "Magnesium", value: "34% DV" }
    ]
  };

  return (
    <div className="flex-1 bg-background">
      <IngredientStory {...data} />
    </div>
  );
}
