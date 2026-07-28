import type { Metadata } from "next";
import { GuideShell } from "../guide-shell";

const url = "https://slushiq.com/learn/how-to-scale-slush-recipes";
export const metadata: Metadata = {
  title: "How to Scale a Slush Machine Recipe",
  description: "Scale a home slush machine recipe without changing sugar, alcohol, dilution, or machine capacity balance.",
  alternates: { canonical: url },
  openGraph: { title: "How to Scale a Slush Machine Recipe", description: "Learn how to resize a frozen-drink batch while preserving its complete formula.", url, type: "article" },
};
export default function ScalingGuide() {
  const schema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Scale a Slush Machine Recipe", description: metadata.description, totalTime: "PT10M", mainEntityOfPage: url, step: [
    { "@type": "HowToStep", name: "Choose the final batch size", text: "Confirm the permitted minimum and maximum for the exact machine." },
    { "@type": "HowToStep", name: "Calculate a scale factor", text: "Divide the desired final volume by the original final volume." },
    { "@type": "HowToStep", name: "Scale every ingredient", text: "Multiply every original ingredient by the same scale factor." },
    { "@type": "HowToStep", name: "Verify the complete batch", text: "Recheck final volume, sugar, alcohol, and practical measurements." },
  ] };
  return <GuideShell kicker="RECIPE SCALING" title="Make more—or less—" accent="without changing the drink."
    intro="A frozen-drink recipe is a complete ratio. Scaling works when every ingredient changes together and the resulting volume remains inside the permitted range for your exact machine."
    lede="Do not scale from the vessel’s advertised size alone. Usable fill limits and minimum batch requirements can differ from total vessel capacity."
    sectionHeading="The reliable four-step method" sections={[
      { title: "Choose a permitted final batch size", body: "Check the owner’s guide for your exact model and leave room for safe operation. Capacity figures from another model or competing machine may not apply." },
      { title: "Calculate one scale factor", body: "Divide the desired final volume by the original recipe’s final volume. For example, moving from 40 ounces to 60 ounces uses a scale factor of 1.5." },
      { title: "Multiply every ingredient by that factor", body: "Scale water, juice, soda, syrup, spirits, liqueurs, purées, and minor additions together. Increasing only the alcohol or mixer produces a different recipe." },
      { title: "Verify measurements and the final formula", body: "Round only to a quantity you can measure consistently, then confirm total volume, estimated sugar, final-batch alcohol, and ingredient restrictions before pouring." },
    ]} calloutTitle="The machine model is part of the recipe."
    calloutBody="A mathematically correct scale can still be unusable when it falls below a minimum, exceeds a maximum, or uses ingredients that the machine’s instructions prohibit."
    afterHeading="Why party batches sometimes fail"
    afterBody="People often enlarge the base mixer and then add spirits by taste, or top off a partly frozen batch without recording the addition. That changes final ABV, sugar concentration, dilution, and available capacity. Build the complete party formula before the first pour."
    safetyHeading="The easiest way to preserve a successful batch"
    safetyBody="Record the exact original recipe, brands, units, machine, program, temperature setting, and final yield. SlushIQ’s My Library can keep a successful recipe and rescale every ingredient together for the next batch."
    links={[{ href: "/learn/slush-machine-calculator", label: "How a slush machine calculator works" }, { href: "/learn/frozen-drink-recipes", label: "What makes a frozen drink recipe work?" }, { href: "/recipes-and-library", label: "Recipes and My Library" }]} schema={schema} />;
}
