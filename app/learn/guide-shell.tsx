import Link from "next/link";
import { ArticleCta, SiteFooter, SiteHeader } from "../site-chrome";

type GuideSection = { title: string; body: string };
type GuideLink = { href: string; label: string };

export function GuideShell({ kicker, title, accent, intro, lede, sectionHeading, sections, calloutTitle, calloutBody, afterHeading, afterBody, safetyHeading, safetyBody, links, schema }: {
  kicker: string; title: string; accent: string; intro: string; lede: string;
  sectionHeading: string; sections: GuideSection[]; calloutTitle: string; calloutBody: string;
  afterHeading: string; afterBody: string; safetyHeading?: string; safetyBody?: string;
  links: GuideLink[]; schema: object;
}) {
  return <><SiteHeader /><main className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="article-hero"><p className="section-kicker">{kicker}</p><h1>{title}<br /><em>{accent}</em></h1><p>{intro}</p></header>
    <div className="article-body"><article><p className="article-lede">{lede}</p><h2>{sectionHeading}</h2>
      {sections.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{section.title}</h3><p>{section.body}</p></div></section>)}
      <div className="callout"><b>{calloutTitle}</b><p>{calloutBody}</p></div>
      <h2>{afterHeading}</h2><p>{afterBody}</p>
      {safetyHeading && safetyBody && <><h2>{safetyHeading}</h2><p>{safetyBody}</p></>}
      <div className="next-reading"><span>KEEP LEARNING</span>{links.map(link => <Link href={link.href} key={link.href}>{link.label} →</Link>)}</div>
    </article><ArticleCta /></div>
  </main><SiteFooter /></>;
}
