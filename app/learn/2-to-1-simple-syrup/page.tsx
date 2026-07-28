import type { Metadata } from "next";
import { GuideShell } from "../guide-shell";

const url = "https://slushiq.com/learn/2-to-1-simple-syrup";

export const metadata: Metadata = {
  title: "How to Make 2:1 Simple Syrup for Slush Recipes",
  description: "Learn how to make 2:1 rich simple syrup, why SlushIQ recipes use it, how it reduces added water, and how to store it safely.",
  alternates: { canonical: url },
  openGraph: {
    title: "How to Make 2:1 Simple Syrup",
    description: "Why SlushIQ standardizes on rich simple syrup—and how to make, measure, refrigerate, and replace it correctly.",
    url,
    type: "article",
  },
};

export default function RichSimpleSyrupGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Make 2:1 Simple Syrup for Slush Recipes",
    description: metadata.description,
    totalTime: "PT15M",
    supply: [
      { "@type": "HowToSupply", name: "2 cups granulated sugar" },
      { "@type": "HowToSupply", name: "1 cup water" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Saucepan" },
      { "@type": "HowToTool", name: "Spoon or whisk" },
      { "@type": "HowToTool", name: "Clean covered bottle or jar" },
    ],
    step: [
      { "@type": "HowToStep", name: "Combine", text: "Combine two parts granulated sugar with one part water." },
      { "@type": "HowToStep", name: "Warm", text: "Warm gently while stirring until the sugar is completely dissolved. Do not intentionally boil or reduce the syrup." },
      { "@type": "HowToStep", name: "Cool", text: "Remove from the heat and let the syrup cool." },
      { "@type": "HowToStep", name: "Store", text: "Transfer to a clean covered container, label the date, and refrigerate at 40 degrees Fahrenheit or below." },
    ],
    author: { "@type": "Organization", name: "SlushIQ" },
    publisher: { "@type": "Organization", name: "SlushIQ" },
    mainEntityOfPage: url,
  };

  return <GuideShell
    kicker="RICH SIMPLE SYRUP"
    title="More sugar."
    accent="Less added water."
    intro="SlushIQ recipes use 2:1 simple syrup—often called rich simple syrup—because it delivers the sugar a frozen-drink formula needs without bringing as much extra water into the bowl."
    lede="For the standard SlushIQ version, combine two parts granulated sugar with one part water: 2 cups sugar and 1 cup water. Keep the ratio consistent so the recipe’s sugar, dilution, and total volume stay predictable."
    sectionHeading="How to make it"
    sections={[
      { title: "Measure two parts sugar to one part water", body: "Use 2 cups granulated sugar and 1 cup water for a convenient home batch. Use the same measuring method for both ingredients; do not casually switch between a volume-based batch and a weight-based batch because they are not identical." },
      { title: "Warm gently and stir", body: "Combine the sugar and water in a saucepan. Warm over low to medium heat, stirring until the liquid looks clear and no granules remain. It does not need a hard boil." },
      { title: "Do not reduce it", body: "Prolonged boiling evaporates water and makes the syrup stronger than the intended 2:1 formula. Remove it from the heat as soon as the sugar is dissolved. If a noticeable amount of water boils away, make a fresh batch rather than guessing at the concentration." },
      { title: "Cool, bottle, and label", body: "Let the syrup cool, then pour it into a clean, covered bottle or jar. Mark the preparation date and refrigerate promptly. A squeeze bottle is convenient, but it should be thoroughly cleaned before each new batch." },
    ]}
    calloutTitle="Why every SlushIQ recipe uses the same syrup"
    calloutBody="Standardizing the syrup removes a hidden variable. Compared with 1:1 syrup, 2:1 syrup supplies more sugar with less accompanying water. That gives a recipe designer tighter control over sweetness, Brix, dilution, flavor intensity, and final batch volume."
    afterHeading="Can I substitute 1:1 simple syrup?"
    afterBody="Not in the same amount. A pour of 1:1 syrup contains more water and less sugar than the same pour of 2:1 syrup, so a direct swap dilutes the drink and changes its freeze behavior. The entire formula must be recalculated. Granulated sugar is not a direct volume-for-volume substitute either; it changes both the sugar contribution and the liquid volume."
    safetyHeading="Refrigeration and shelf life"
    safetyBody="Homemade syrup is not the same as a commercially processed shelf-stable product. Keep it covered in a refrigerator at 40°F (4°C) or below and, as a conservative home guideline, make only what you expect to use within about one month. Use it sooner if the bottle or utensils were not perfectly clean. Discard the entire batch if you notice mold, cloudiness that was not present when made, bubbling, an unusual odor, or a changed flavor—do not skim mold from syrup. Syrups containing fruit, herbs, spices, or other fresh ingredients are different products and should be made in smaller batches and used sooner."
    links={[
      { href: "/learn/what-is-brix", label: "What Brix means for frozen drinks" },
      { href: "/learn/frozen-drink-recipes", label: "What makes a frozen drink recipe work?" },
      { href: "/learn/how-to-scale-slush-recipes", label: "How to scale a slush machine recipe" },
    ]}
    schema={schema}
  />;
}
