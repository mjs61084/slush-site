import type { Metadata } from "next";
import { GuideShell } from "../guide-shell";

const url = "https://slushiq.com/learn/why-11-8-brix";

export const metadata: Metadata = {
  title: "Why Does SlushIQ Target 11.8 Brix?",
  description: "Learn why SlushIQ uses 11.8 Brix as a practical target for SimpleLAB alcoholic batches and why it is not a universal rule for every frozen drink.",
  alternates: { canonical: url },
  openGraph: {
    title: "Why Does SlushIQ Target 11.8 Brix?",
    description: "The reasoning behind SlushIQ’s SimpleLAB target—and why sugar, alcohol, dilution, and machine behavior still belong in the same calculation.",
    url,
    type: "article",
  },
};

export default function BrixTargetGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Does SlushIQ Target 11.8 Brix?",
    description: metadata.description,
    author: { "@type": "Organization", name: "SlushIQ" },
    publisher: { "@type": "Organization", name: "SlushIQ" },
    mainEntityOfPage: url,
  };

  return <GuideShell
    kicker="THE 11.8 BRIX TARGET"
    title="A practical target."
    accent="Not a universal rule."
    intro="SimpleLAB aims for 11.8 Brix in alcoholic batches because it provides a useful middle ground for many home frozen-drink formulas when paired with SlushIQ’s 8–9% final-batch ABV range."
    lede="The number is a design target SlushIQ uses to build a balanced starting formula. It is not a claim that every drink, ingredient, or machine must operate at exactly 11.8 Brix."
    sectionHeading="Why SlushIQ chose 11.8"
    sections={[
      { title: "Sugar helps create a smooth, dispensable texture", body: "Dissolved sugar lowers the freezing point and helps keep the mixture from becoming a solid block of ice. It also adds body so the finished drink feels like slush instead of coarse ice and water." },
      { title: "Too much sugar can keep the batch too soft", body: "Sugar also resists freezing. When its concentration climbs too high—especially in a drink that already contains alcohol—the machine may struggle to form enough ice for a stable texture." },
      { title: "Alcohol is already doing part of the freeze suppression", body: "SimpleLAB alcoholic batches also target approximately 8–9% final-batch ABV. Because alcohol strongly lowers the freezing point, the sugar target must be considered alongside it rather than chosen independently." },
      { title: "11.8 is a repeatable starting point", body: "SlushIQ uses one consistent target in SimpleLAB so a mixer’s nutrition label can be translated into predictable amounts of mixer, water, and liquor. That consistency reduces guesswork while still respecting the complete batch." },
    ]}
    calloutTitle="11.8 Brix is a SlushIQ formula target—not a manufacturer requirement."
    calloutBody="Different machines, programs, ingredients, and desired textures can work at different concentrations. DesignLAB allows other freeze behaviors, and Brixley evaluates the batch already in the bowl instead of forcing every mixture to the same number."
    afterHeading="Why a refractometer may not read exactly 11.8"
    afterBody="A refractometer reports how light bends through the sample. In a finished cocktail, alcohol, acids, fruit solids, and other dissolved ingredients can affect that reading. SlushIQ’s target is based on the calculated recipe composition, so an alcoholic finished-drink reading should not automatically be interpreted as pure sugar percentage."
    safetyHeading="What should you do if 11.8 does not freeze correctly?"
    safetyBody="Check the complete recipe, final-batch ABV, ingredient brands, starting temperature, machine capacity, selected program, and operating time before changing the target. Record what is already in the bowl and make one measured adjustment. A single number cannot diagnose every frozen-drink problem."
    links={[
      { href: "/learn/what-is-brix", label: "What Brix means for frozen drinks" },
      { href: "/learn/alcohol-and-slush", label: "How alcohol changes the freeze" },
      { href: "/learn/fix-my-slush", label: "Why won’t my slush freeze?" },
    ]}
    schema={schema}
  />;
}
