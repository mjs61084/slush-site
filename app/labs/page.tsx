import type { Metadata } from "next";
import Link from "next/link";
import { DownloadCta, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "SimpleLAB, DesignLAB & Brixley | SlushIQ Tools",
  description: "Compare SlushIQ’s frozen drink tools: convert a store-bought mixer with SimpleLAB, build a custom slush recipe in DesignLAB, or troubleshoot a batch with Brixley.",
  alternates: { canonical: "https://www.slushiq.com/labs" },
};

const tools = [
  { index: "01", name: "SimpleLAB", kicker: "START WITH A MIXER", headline: <>Nutrition label in.<br /><em>Freeze-ready batch out.</em></>, image: "/app-simplelab.png", alt: "SimpleLAB slush machine calculator using mixer nutrition label information", copy: "Enter the serving size and sugar from a store-bought mixer’s nutrition label, choose your batch size, and select alcoholic or non-alcoholic. SimpleLAB calculates the mixer and water you need, plus liquor when the batch includes alcohol.", points: ["Alcoholic and non-alcoholic batches", "Uses the mixer’s serving size and sugar", "Targets 11.8 Brix and 8–9% final-batch ABV for alcoholic batches"] },
  { index: "02", name: "DesignLAB", kicker: "BUILD FROM SCRATCH", headline: <>Your flavors.<br /><em>Your freeze behavior.</em></>, image: "/app-designlab.png", alt: "DesignLAB custom frozen drink recipe builder with Auto-Balance", copy: "Add ingredients one at a time while DesignLAB tracks sugar, alcohol, dilution, total volume, Brix, and final-batch ABV. Choose how you want the drink to freeze, or use Auto-Balance when you want help moving the recipe into a workable range.", points: ["Build custom alcoholic or non-alcoholic recipes", "See the balance change with every ingredient", "Use Auto-Balance without giving up creative control"] },
  { index: "03", name: "Brixley", kicker: "FIX WHAT IS IN THE BOWL", headline: <>A guided conversation.<br /><em>A measured next step.</em></>, image: "/app-brixley.png", alt: "Brixley AI slush troubleshooting assistant", copy: "Tell Brixley what went into the machine and what the batch is doing. Brixley combines an AI-guided conversation with SlushIQ’s freeze math to review the complete mix and recommend a practical adjustment.", points: ["Troubleshoot batches that will not freeze", "Review sugar, alcohol, dilution, and volume together", "Get an adjustment you can measure and pour"] },
];

export default function LabsPage() {
  return <><SiteHeader /><main className="labs-page">
    <section className="labs-hero"><p className="section-kicker">SLUSHIQ LABS</p><h1>Pick the job.<br /><em>Open the right workspace.</em></h1><p>SimpleLAB converts a store-bought mixer. DesignLAB builds a frozen drink from scratch. Brixley helps rescue a batch already in the bowl. All three use SlushIQ’s complete-batch approach to sugar, alcohol, dilution, and volume.</p><div className="labs-jump">{tools.map(tool => <a href={`#${tool.name.toLowerCase()}`} key={tool.name}><span>{tool.index}</span>{tool.name}</a>)}</div></section>
    <section className="labs-balance">
      <div><p className="section-kicker">HOW THE LABS USE TARGETS</p><h2>One target.<br /><em>The whole batch in context.</em></h2><p>SimpleLAB uses the mixer’s nutrition label and complete batch size to calculate a freeze-ready formula. For alcoholic batches, SlushIQ aims for 11.8 Brix and 8–9% final-batch ABV. DesignLAB lets you choose a different freeze behavior, while Brixley evaluates the mixture already in your bowl rather than forcing every drink toward one number.</p></div>
      <div className="labs-target"><small>EXAMPLE SIMPLELAB TARGET</small><strong>11.8</strong><span>BRIX</span><p>Alcoholic batches also target 8–9% final-batch ABV.</p></div>
    </section>
    <div className="labs-tool-list">{tools.map((tool, index) => <section className={`labs-tool ${index % 2 ? "reverse" : ""}`} id={tool.name.toLowerCase()} key={tool.name}><article><span>{tool.index} / {tool.kicker}</span><h2>{tool.headline}</h2><p>{tool.copy}</p><ul>{tool.points.map(point => <li key={point}>{point}</li>)}</ul>{tool.name === "Brixley" && <Link className="text-cta" href="/brixley">See the Brixley walkthrough <span>→</span></Link>}</article><div className="labs-tool-screen"><img src={tool.image} alt={tool.alt} /></div></section>)}</div>
    <DownloadCta />
  </main><SiteFooter /></>;
}
