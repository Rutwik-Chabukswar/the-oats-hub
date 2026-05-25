import { Metadata } from "next";
import { OrganicCosmosShowcase } from "./organic-cosmos-client";

export const metadata: Metadata = {
  title: "Organic Cosmos | The Oats Hub",
  description: "Discover pure, plant-based superfoods, adaptogens, and wellness blends by Organic Cosmos.",
};

export default function OrganicCosmosPage() {
  return <OrganicCosmosShowcase />;
}
