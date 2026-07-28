import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

const categories = [
  {
    index: "01",
    kicker: "START HERE",
    title: "Getting started",
    description: "Understand what a home frozen-drink machine needs before you fill the bowl.",
    guides: [
      { href: "/learn/frozen-drink-recipes", label: "What makes a frozen drink recipe work?", note: "The foundations of sugar, alcohol, dilution, temperature, and batch size." },
      { href: "/learn/slush-machine-calculator", label: "How a slush machine calculator works", note: "See what useful batch-level calculations account for." },
      { href: "/learn/how-to-scale-slush-recipes", label: "How to scale a slush machine recipe", note: "Resize every ingredient together without changing the formula." },
    ],
  },
  {
    index: "02",
    kicker: "MIXTURE SCIENCE",
    title: "Know what controls the freeze",
    description: "Learn why a drink’s sugar, alcohol, and dissolved ingredients change its texture.",
    guides: [
      { href: "/learn/what-is-brix", label: "What Brix means for frozen drinks", note: "Use Brix as one part of the answer—not a universal target." },
      { href: "/learn/why-11-8-brix", label: "Why SlushIQ targets 11.8 Brix", note: "The reasoning behind SimpleLAB’s alcoholic-batch starting point." },
      { href: "/learn/2-to-1-simple-syrup", label: "How to make 2:1 simple syrup", note: "Why SlushIQ uses rich syrup for more sugar with less added water." },
      { href: "/learn/alcohol-and-slush", label: "How alcohol changes the freeze", note: "Understand final-batch ABV and why strong mixtures stay liquid." },
      { href: "/learn/sugar-free-ninja-slushi", label: "Sugar-free slush machine guide", note: "Why diet drinks, allulose, and intense sweeteners behave differently." },
    ],
  },
  {
    index: "03",
    kicker: "TROUBLESHOOTING",
    title: "Fix the batch in front of you",
    description: "Start with the symptom, preserve the recipe, and make one informed adjustment.",
    guides: [
      { href: "/learn/fix-my-slush", label: "Why won’t my slush freeze?", note: "Work through liquid, overly hard, and icy results." },
      { href: "/learn/ninja-slushi-foamy", label: "Why is my frozen drink foamy?", note: "Troubleshoot frappés, milkshakes, dairy, and stabilized foam." },
      { href: "/learn/ninja-slushi-errors", label: "Slush machine alerts and warnings", note: "Separate formula alerts from repeated machine behavior." },
    ],
  },
  {
    index: "04",
    kicker: "MACHINE HELP",
    title: "Know when it is not the recipe",
    description: "Use a safety-first checklist for unusual equipment behavior.",
    guides: [
      { href: "/learn/ninja-slushi-noise-leaking", label: "Noise, clicking, and leaking guide", note: "Check residue, assembly, condensation, and visible damage safely." },
    ],
  },
];

export const metadata: Metadata = {
  title: "Slush Machine Guides & Troubleshooting",
  description: "Explore SlushIQ guides for home frozen-drink machines: Brix, 2:1 simple syrup, sugar-free slush, alcohol, recipe scaling, foam, alerts, and troubleshooting.",
  alternates: { canonical: "https://slushiq.com/learn" },
  openGraph: {
    title: "SlushIQ Learning Center",
    description: "Slush science, recipe-building fundamentals, and practical machine troubleshooting in plain English.",
    url: "https://slushiq.com/learn",
    type: "website",
  },
};

export default function LearnPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SlushIQ Learning Center",
    description: metadata.description,
    url: "https://slushiq.com/learn",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categories.flatMap(category => category.guides).map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.label,
        url: `https://slushiq.com${guide.href}`,
      })),
    },
  };

  return <><SiteHeader /><main className="learn-library">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="learn-library-hero">
      <p className="section-kicker">SLUSHIQ LEARNING CENTER</p>
      <h1>Better batches start<br /><em>with the “why.”</em></h1>
      <p>Clear explanations for building, balancing, scaling, and troubleshooting frozen drinks in home slush machines.</p>
      <nav aria-label="Learning center categories">
        {categories.map(category => <a href={`#category-${category.index}`} key={category.index}>{category.kicker}</a>)}
      </nav>
    </header>
    <div className="learn-library-groups">
      {categories.map(category => <section id={`category-${category.index}`} className="learn-library-group" key={category.index}>
        <header><span>{category.index}</span><div><p className="section-kicker">{category.kicker}</p><h2>{category.title}</h2><p>{category.description}</p></div></header>
        <div className="learn-library-list">
          {category.guides.map((guide, index) => <Link href={guide.href} key={guide.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{guide.label}</h3><p>{guide.note}</p></div><i>→</i>
          </Link>)}
        </div>
      </section>)}
    </div>
  </main><SiteFooter /></>;
}
