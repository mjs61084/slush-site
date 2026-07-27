import type { Metadata } from "next";
import { GuideShell } from "../guide-shell";

const url = "https://slushiq.com/learn/ninja-slushi-foamy";
export const metadata: Metadata = {
  title: "Why Is My Ninja SLUSHi Foamy?",
  description: "Learn why Ninja SLUSHi frappés and milkshakes become foamy, how dairy and protein trap air, and what to check before changing the recipe.",
  alternates: { canonical: url },
  openGraph: { title: "Why Is My Ninja SLUSHi Foamy?", description: "Troubleshoot foamy frozen coffee, frappés, milkshakes, dairy, and non-dairy mixtures.", url, type: "article" },
};
export default function FoamyGuide() {
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: "Why Is My Ninja SLUSHi Foamy?", description: metadata.description, author: { "@type": "Organization", name: "SlushIQ" }, publisher: { "@type": "Organization", name: "SlushIQ" }, mainEntityOfPage: url };
  return <GuideShell kicker="FRAPPÉ + MILKSHAKE HELP" title="Frozen and fluffy" accent="are not the same texture."
    intro="The auger continuously moves the mixture while it freezes. Dairy proteins, coffee ingredients, stabilizers, and some non-dairy products can trap that air until a drink becomes light, bulky, or separated instead of smooth."
    lede="Foam is often an ingredient-and-time problem rather than a failure of the refrigeration system."
    sectionHeading="Four checks for a foamy batch" sections={[
      { title: "Use the intended program and an approved recipe", body: "Frappé and Milkshake programs are designed for different mixtures than the standard Slush program. Begin with your exact model’s inspiration guide before modifying dairy, fat, sugar, or serving size." },
      { title: "Look beyond the milk label", body: "Protein amount, fat, emulsifiers, gums, coffee creamer, protein powder, and stabilizers can all change how readily a mixture holds air. Two products with similar calories may churn very differently." },
      { title: "Watch the batch after it reaches serving texture", body: "Continued agitation can incorporate more air and change dairy texture. Dispense promptly according to the timing guidance for your machine instead of leaving a finished dairy batch circulating indefinitely." },
      { title: "Change one ingredient at a time", body: "Switching the milk, adding cream, changing temperature, and changing sugar simultaneously makes the cause impossible to identify. Save the original formula, then test one controlled adjustment." },
    ]} calloutTitle="Colder is not always the complete fix."
    calloutBody="A colder setting may thicken a mixture, but it cannot remove air that an ingredient readily stabilizes. Texture, ingredient composition, program choice, and circulation time must be considered together."
    afterHeading="Can oat milk or cream reduce foam?"
    afterBody="Some owners report better results with particular oat milks or added cream, but brand formulations vary and neither is a universal remedy. Use only ingredients allowed by your machine’s documentation, confirm dietary needs and allergens, and test a small compliant batch before scaling."
    safetyHeading="When separation is more than foam"
    safetyBody="Stop the machine before inspecting or removing parts. If a mixture develops unexpected solids, an unusual odor, leakage, or signs of curdling, do not serve it simply because it froze. Follow food-safety guidance and the cleaning instructions supplied with the machine."
    links={[{ href: "/learn/frozen-drink-recipes", label: "What makes a frozen drink recipe work?" }, { href: "/learn/fix-my-slush", label: "Why won’t my slush freeze?" }, { href: "/learn/ninja-slushi-errors", label: "Understand Ninja SLUSHi alerts" }]} schema={schema} />;
}
