import type { Metadata } from "next";
import { GuideShell } from "../guide-shell";

const url = "https://slushiq.com/learn/ninja-slushi-errors";
export const metadata: Metadata = {
  title: "Ninja SLUSHi Alerts & Troubleshooting Guide",
  description: "Understand common Ninja SLUSHi sugar and alcohol alerts, what mixture problems to check, and when to stop troubleshooting and contact Ninja.",
  alternates: { canonical: url },
  openGraph: { title: "Ninja SLUSHi Alerts & Troubleshooting Guide", description: "A practical guide to mixture alerts, liquid batches, hard freeze, and repeated machine warnings.", url, type: "article" },
};
export default function ErrorGuide() {
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: "Ninja SLUSHi Alerts and Troubleshooting Guide", description: metadata.description, author: { "@type": "Organization", name: "SlushIQ" }, publisher: { "@type": "Organization", name: "SlushIQ" }, mainEntityOfPage: url };
  return <GuideShell kicker="NINJA SLUSHi ALERTS" title="Read the signal." accent="Then check the whole batch."
    intro="A warning can point to mixture balance, temperature, assembly, or a condition requiring official support. The display alone cannot tell you the exact correction without the recipe and model instructions."
    lede="Do not respond to every alert by pouring in more sugar, water, or alcohol. Identify the warning and preserve the original recipe first."
    sectionHeading="What to check before changing anything" sections={[
      { title: "Write down the exact alert and model", body: "Alert wording, lights, sounds, and supported ranges can differ by machine. Record the model number and consult its owner’s guide rather than relying on advice for a different SLUSHi version." },
      { title: "Capture every ingredient and amount", body: "Include the complete batch, brands, nutrition labels, spirit proof, syrups, water, and anything added after the machine started. Hidden sugar and alcohol are common sources of confusion." },
      { title: "Separate a formula problem from an assembly problem", body: "If one unusual recipe triggers an alert, investigate that mixture. If several known-compatible mixtures or a prescribed rinse process produce the same warning, stop repeatedly modifying recipes and consult official troubleshooting." },
      { title: "Test only when the official guide permits it", body: "Use the machine’s documented troubleshooting or rinse procedure. Do not operate it with prohibited ingredients, bypass sensors, reach into moving parts, or continue running it when components appear damaged." },
    ]} calloutTitle="A repeated warning across unrelated mixtures deserves attention."
    calloutBody="When a documented recipe or official diagnostic process produces the same unexpected behavior, more recipe adjustments may conceal rather than solve the issue."
    afterHeading="Liquid, too hard, and alerting are different symptoms"
    afterBody="A liquid batch may contain too much dissolved sugar or alcohol, may still be cooling, or may be outside the machine’s instructions. A hard or icy batch may have too few dissolved solids. An alert that persists independently of the mixture may require cleaning, reassembly, or manufacturer support."
    safetyHeading="When to contact Ninja"
    safetyBody="Unplug the machine and use official support if an alert persists with documented recipes, the unit leaks from an unexpected location, a component is cracked, the power system behaves abnormally, or there is a burning smell or concerning mechanical sound. Have the model, serial number, purchase information, alert, and troubleshooting steps ready."
    links={[{ href: "/learn/fix-my-slush", label: "Why won’t my slush freeze?" }, { href: "/learn/ninja-slushi-noise-leaking", label: "Noise, clicking, and leaking guide" }, { href: "/support", label: "SlushIQ app support" }]} schema={schema} />;
}
