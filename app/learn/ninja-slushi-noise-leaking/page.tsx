import type { Metadata } from "next";
import { GuideShell } from "../guide-shell";

const url = "https://slushiq.com/learn/ninja-slushi-noise-leaking";
export const metadata: Metadata = {
  title: "Ninja SLUSHi Noise, Clicking & Leaking Guide",
  description: "Learn what to check when a Ninja SLUSHi squeaks, clicks, or appears to leak—and when to stop the machine and contact official support.",
  alternates: { canonical: url },
  openGraph: { title: "Ninja SLUSHi Noise, Clicking & Leaking Guide", description: "A safety-first checklist for unusual sounds, residue, condensation, seals, and damaged parts.", url, type: "article" },
};
export default function NoiseGuide() {
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: "Ninja SLUSHi Noise, Clicking and Leaking Guide", description: metadata.description, author: { "@type": "Organization", name: "SlushIQ" }, publisher: { "@type": "Organization", name: "SlushIQ" }, mainEntityOfPage: url };
  return <GuideShell kicker="MACHINE TROUBLESHOOTING" title="A new sound is" accent="worth a careful check."
    intro="Compressors, fans, and augers make normal operating sounds, but persistent squeaking, clicking, grinding, or unexpected liquid deserves a safety-first inspection using the instructions for your exact model."
    lede="Turn the machine off and unplug it before cleaning, reassembling, or examining removable components."
    sectionHeading="A safe inspection sequence" sections={[
      { title: "Identify when the sound happens", body: "Note whether it begins during rinse, only as the mixture thickens, when the vessel is nearly empty, or immediately after assembly. Record a short video without placing hands near moving components." },
      { title: "Clean approved removable parts completely", body: "Sticky residue can remain around contact points and moving assemblies. Follow the official washing procedure, use only permitted tools and cleaners, and dry components as directed before reassembly." },
      { title: "Check seating, seals, and visible condition", body: "Using the owner’s guide, verify that the vessel, auger, spout pieces, drip tray, condensation catch, and accessible seals are installed correctly. Do not force a component into position." },
      { title: "Distinguish condensation from an unexpected leak", body: "The machine includes parts intended to collect condensation and drips. Liquid emerging from the base, electrical area, a displaced seal, or a cracked component is different and should not be dismissed as normal condensation." },
    ]} calloutTitle="Do not run through a grinding or damaging sound."
    calloutBody="If a removable component is cracked, warped, rubbing, or will not seat normally, continuing operation may worsen the damage. Replacement parts and warranty decisions should come from Ninja."
    afterHeading="What owner observations can—and cannot—tell you"
    afterBody="Owners sometimes trace squeaks to sugar residue, incomplete drying, auger seating, or a displaced rear seal. Those reports can suggest what to describe, but they do not diagnose your machine. Confirm every cleaning and assembly step with official documentation."
    safetyHeading="Stop and contact official support when"
    safetyBody="Unplug the machine for grinding, electrical problems, a burning smell, repeated clicking with visible damage, unexpected leakage near the base, or any condition the owner’s guide identifies as unsafe. Do not remove fixed covers or attempt an internal repair."
    links={[{ href: "/learn/ninja-slushi-errors", label: "Ninja SLUSHi alerts and troubleshooting" }, { href: "/learn/fix-my-slush", label: "Separate machine trouble from mixture trouble" }, { href: "/support", label: "SlushIQ app support" }]} schema={schema} />;
}
