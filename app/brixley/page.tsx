import type { Metadata } from "next";
import { DownloadCta, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Meet Brixley | AI Slush Troubleshooting Assistant",
  description: "Meet Brixley, SlushIQ’s AI-assisted frozen drink troubleshooter. Review a complete slush batch and get a practical, measured adjustment.",
  alternates: { canonical: "https://www.slushiq.com/brixley" },
};

export default function BrixleyPage() {
  return <><SiteHeader /><main className="brixley-page">
    <section className="brixley-hero">
      <div><p className="section-kicker">MEET BRIXLEY</p><h1>Your batch went sideways.<br /><em>Brixley finds the next move.</em></h1><p>Brixley combines a guided AI conversation with SlushIQ’s frozen-drink math. Tell Brixley exactly what went into the bowl, review the complete mix, and get a practical adjustment you can measure and pour.</p><a href="#walkthrough" className="text-cta">See how it works <span>↓</span></a></div>
      <img src="/brixley.png" alt="Brixley, the SlushIQ AI frozen drink assistant" />
    </section>

    <section className="brixley-balance single" id="walkthrough">
      <div className="brixley-balance-copy"><p className="section-kicker">THE WHOLE BATCH MATTERS</p><h2>Conversation in.<br /><em>Freeze balance out.</em></h2><p>Brixley walks through the ingredients and amounts already in your machine. SlushIQ then evaluates sugar, alcohol, dilution, and total volume together instead of guessing from a single ingredient.</p><div className="brixley-metrics"><div><b>SUGAR</b><span>Every source counted</span></div><div><b>ALCOHOL</b><span>Final-batch ABV</span></div><div><b>VOLUME</b><span>The complete bowl</span></div></div></div>
    </section>

    <section className="brixley-walkthrough">
      <div className="brixley-page-heading"><p className="section-kicker">A GUIDED RESCUE</p><h2>Three steps.<br /><em>One measured fix.</em></h2></div>
      <div className="brixley-page-flow" aria-label="Brixley troubleshooting walkthrough">
        <figure><img src="/brixley-flow-start.png" alt="Brixley collecting an ingredient and amount" /><figcaption><span>01</span><b>Tell Brixley what went in</b><small>Work through each ingredient, amount, and the information Brixley needs to evaluate it.</small></figcaption></figure>
        <figure><img src="/brixley-flow-review.png" alt="Brixley reviewing the complete frozen drink mix" /><figcaption><span>02</span><b>Review the complete mix</b><small>Confirm the batch before the freeze analysis begins.</small></figcaption></figure>
        <figure><img src="/brixley-flow-fix.png" alt="Brixley recommending a measured fix for a slush batch" /><figcaption><span>03</span><b>Get a measured next step</b><small>Add a specific adjustment instead of pouring and hoping.</small></figcaption></figure>
      </div>
    </section>

    <section className="brixley-uses"><div><p className="section-kicker">WHEN TO ASK BRIXLEY</p><h2>Built for the batch<br /><em>already in the bowl.</em></h2></div><ul><li><b>Not freezing?</b><span>Check whether sugar, alcohol, or dilution is holding it back.</span></li><li><b>Freezing too hard?</b><span>Find a measured adjustment for a smoother serving texture.</span></li><li><b>Unsure what changed?</b><span>Reconstruct the complete mix before adding anything else.</span></li></ul></section>

    <DownloadCta />
  </main><SiteFooter /></>;
}
