import { Metadata } from "next";
import { PintolaShowcase } from "./pintola-client";

export const metadata: Metadata = {
  title: "Pintola Premium Collection | The Oats Hub",
  description: "Discover the ultimate collection of Pintola premium products. High protein, organic, and natural ingredients.",
};

export default function PintolaPage() {
  return <PintolaShowcase />;
}
