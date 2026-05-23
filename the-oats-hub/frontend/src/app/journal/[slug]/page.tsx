import { Metadata } from "next";
import { ArticleLayout } from "@/components/editorial/article-layout";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const titleSlug = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    title: `${titleSlug} | The Journal | The Oats Hub`,
    description: `Read our latest insights on ${titleSlug}.`,
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const titleSlug = resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="flex-1 bg-background">
      {/* Article Hero */}
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-12 text-center max-w-4xl">
        <span className="uppercase tracking-widest text-xs font-semibold text-brand-gold mb-6 block">Nutrition Science</span>
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight mb-8">
          {titleSlug}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">The Oats Hub Editorial</span>
          <span>•</span>
          <span>October 12, 2023</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 md:px-6 mb-16">
        <div className="w-full aspect-[21/9] md:aspect-[2.5/1] bg-muted rounded-[2rem] overflow-hidden max-w-6xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=2000&auto=format&fit=crop" 
            alt={titleSlug}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <ArticleLayout>
        <p className="lead text-xl md:text-2xl font-light text-muted-foreground mb-10">
          Why starting your day with premium nutrition changes your metabolic trajectory and cognitive focus for the next 12 hours.
        </p>

        <h2>The Foundation of Performance</h2>
        <p>
          We often underestimate the profound impact our first meal has on the rest of our day. The quality of your morning nutrition dictates your energy curve, your satiety signals, and your cognitive sharpness. This is where the combination of complex carbohydrates and high-quality protein becomes critical.
        </p>

        <p>
          Unlike refined sugars or simple carbohydrates that cause a rapid glucose spike followed by an inevitable crash, complex carbohydrates—like those found in premium oats—provide a steady, sustained release of energy. They contain beta-glucan, a soluble fiber that slows digestion and promotes a feeling of fullness.
        </p>

        <blockquote className="border-l-brand-gold text-2xl font-serif mt-12 mb-12 italic text-foreground border-l-4 pl-6">
          "A high-protein breakfast doesn't just build muscle; it builds metabolic resilience for the entire day."
        </blockquote>

        <h2>The Protein Synergy</h2>
        <p>
          Pairing these complex carbohydrates with a premium whey protein isolate creates a synergistic effect. Protein further slows the absorption of glucose, flattening the blood sugar curve. Moreover, it provides the essential amino acids necessary for muscle repair and neurotransmitter synthesis.
        </p>
        
        <h3>Why Clean Ingredients Matter</h3>
        <p>
          The benefits of this synergy are completely negated if your breakfast is packed with artificial sweeteners, inflammatory seed oils, or hidden fillers. That's why we insist on absolute transparency. When you consume real, unadulterated ingredients, your body doesn't have to work overtime to process synthetic chemicals.
        </p>

        <hr className="my-12 border-border/50" />

        <div className="bg-muted/30 rounded-3xl p-8 text-center">
          <h4 className="font-serif text-2xl mb-4 tracking-tight">Ready to optimize your morning?</h4>
          <p className="text-muted-foreground mb-6">Explore our premium, high-protein oat blends crafted for sustained energy.</p>
          <a href="/products" className="inline-flex h-12 items-center justify-center rounded-full bg-brand-gold px-8 text-sm font-medium text-brand-black hover:bg-brand-gold/90 transition-colors shadow-premium">
            Shop Premium Blends
          </a>
        </div>
      </ArticleLayout>
    </div>
  );
}
