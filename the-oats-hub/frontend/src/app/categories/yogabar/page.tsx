import { Metadata } from "next";
import { YogabarShowcase } from "./yogabar-client";

export const metadata: Metadata = {
  title: "Yogabar Premium Collection | The Oats Hub",
  description: "Discover the ultimate collection of Yogabar premium products. High protein, clean label, and natural ingredients.",
};

export default function YogabarPage() {
  return <YogabarShowcase />;
}
