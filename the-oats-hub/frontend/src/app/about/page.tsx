import { Metadata } from "next";
import { EditorialHero } from "@/components/editorial/editorial-hero";

export const metadata: Metadata = {
  title: "About Us | The Oats Hub",
  description: "Discover the premium wellness mission behind The Oats Hub. We source the finest ingredients to create high-protein, clean-label nutrition.",
  openGraph: {
    title: "Our Story - The Oats Hub",
    description: "Discover the premium wellness mission behind The Oats Hub.",
  }
};

export default function AboutPage() {
  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <EditorialHero 
          badge="Our Philosophy"
          title="Engineered for Premium Wellness."
          subtitle="We believe that high-performance nutrition shouldn't compromise on taste, transparency, or quality. Every ingredient is selected with uncompromising intention."
        />
        
        <div className="max-w-4xl mx-auto pb-32">
          <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-muted mb-20">
            {/* Cinematic Placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2952&auto=format&fit=crop" 
              alt="Premium oats and ingredients"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-serif prose-headings:tracking-tight mx-auto">
            <h2>The New Standard of Nutrition</h2>
            <p>
              The wellness industry is crowded with artificial sweeteners, hidden fillers, and complex labels. We created The Oats Hub to strip away the noise. We focus on singular, powerful ingredients that your body understands and thrives on.
            </p>
            <p>
              By combining high-quality oats with premium whey protein, rich cocoa, and natural peanut butter, we’ve created a breakfast solution that genuinely powers your day.
            </p>

            <blockquote className="border-l-brand-gold text-2xl font-serif mt-12 mb-12 italic text-foreground">
              "We didn't just want to make a healthy breakfast. We wanted to make the best part of your morning effortless."
            </blockquote>

            <h2>Sourced with Integrity</h2>
            <p>
              We partner with sustainable farms and ethical suppliers. Our oats are non-GMO, our cocoa is ethically harvested, and our protein is ultra-filtered for maximum bioavailability. We believe that when you start with the best raw materials, you don't need artificial additives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
