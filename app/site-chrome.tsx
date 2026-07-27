import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { BrixleyImage } from "./marketing-image";

export function SiteWordmark() {
  return <span className="wordmark"><BrixleyImage alt="" sizes="46px" />Slush<span>IQ</span></span>;
}

export function SiteHeader() {
  return (
    <header className="site-header inner-header">
      <nav className="header-nav header-nav-primary" aria-label="Download SlushIQ"><a className="header-download ios" href="https://apps.apple.com/us/app/slushiq/id6749187530" target="_blank" rel="noreferrer" data-analytics-event="app_store_click" data-analytics-placement="header">Download on iOS</a><a className="header-download android" href="https://play.google.com/store/apps/details?id=com.slushiq.app" target="_blank" rel="noreferrer" data-analytics-event="google_play_click" data-analytics-placement="header">Download on Android</a></nav>
      <Link href="/" className="logo-link header-brand" aria-label="SlushIQ home"><SiteWordmark /></Link>
      <div className="header-nav header-nav-secondary"><Link href="/">Home</Link><Link href="/#features">Tools</Link><Link href="/labs">How it works</Link><Link href="/#learn">Learn</Link><Link href="/#faq">FAQ</Link></div>
      <MobileMenu />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer><div><SiteWordmark /><p>Frozen drink recipes and slush math.</p></div><div className="footer-links"><div><b>EXPLORE SLUSHIQ</b><Link href="/#features">Tools</Link><Link href="/recipes-and-library">Recipes &amp; My Library</Link><Link href="/labs">How It Works</Link><Link href="/#learn">Learn</Link><Link href="/#faq">FAQ</Link></div><div><b>CONNECT</b><a href="https://www.tiktok.com/@slushiqapp" target="_blank" rel="noreferrer">TikTok</a><a href="https://www.reddit.com/r/slushrecipes/" target="_blank" rel="noreferrer">Reddit community</a><Link href="/support">Support</Link></div><div><b>LEGAL</b><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div><p className="legal">© 2026 SlushIQ. SlushIQ is an independent product and is not affiliated with or endorsed by Ninja, Iceman, VEVOR, or GreenPan. All third-party product names and trademarks belong to their respective owners.</p></footer>
  );
}

export function DownloadCta({ id }: { id?: string }) {
  return (
    <section className="site-download-cta" id={id}>
      <div className="site-download-inner">
        <div className="site-download-top">
          <p className="section-kicker">READY FOR A BETTER BATCH?</p>
          <BrixleyImage alt="Brixley holding a frozen drink" sizes="(max-width: 650px) 82px, 140px" />
        </div>
        <h2>Recipes, slush math,<br /><em>and help when you need it.</em></h2>
        <p>Human-created recipes, frozen-drink calculations, and Brixley troubleshooting in one app. No subscription fees.</p>
        <div className="site-download-buttons">
          <a href="https://apps.apple.com/us/app/slushiq/id6749187530" target="_blank" rel="noreferrer" aria-label="Download SlushIQ on the App Store" data-analytics-event="app_store_click" data-analytics-placement="download_cta"><img src="/app-store-badge.svg" width="120" height="40" alt="Download on the App Store" /></a>
          <a href="https://play.google.com/store/apps/details?id=com.slushiq.app" target="_blank" rel="noreferrer" aria-label="Get SlushIQ on Google Play" data-analytics-event="google_play_click" data-analytics-placement="download_cta"><img src="/google-play-badge.png" width="478" height="142" alt="Get it on Google Play" /></a>
        </div>
      </div>
    </section>
  );
}

export function ArticleCta() {
  return <DownloadCta />;
}
