"use client";

import Link from "next/link";
import { useState } from "react";

const appStore = "https://apps.apple.com/us/app/slushiq/id6749187530";
const playStore = "https://play.google.com/store/apps/details?id=com.slushiq.app";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className={`mobile-menu ${open ? "is-open" : ""}`}>
      <button
        className="mobile-menu-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-site-menu"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav id="mobile-site-menu" className="mobile-menu-panel" aria-label="Mobile navigation">
        <div className="mobile-menu-heading"><span>EXPLORE SLUSHIQ</span><b>Where do you want to start?</b></div>
        <div className="mobile-menu-grid">
          <Link href="/#features" onClick={close}><span>01</span><b>Tools</b><small>Build, save, or fix a batch</small></Link>
          <Link href="/labs" onClick={close}><span>02</span><b>How it works</b><small>See the SlushIQ workflow</small></Link>
          <Link href="/#learn" onClick={close}><span>03</span><b>Learn</b><small>Understand the slush science</small></Link>
          <Link href="/#faq" onClick={close}><span>04</span><b>FAQ</b><small>Get a quick answer</small></Link>
        </div>
        <p className="mobile-menu-download-label">GET THE APP</p>
        <div className="mobile-menu-downloads">
          <a href={appStore} target="_blank" rel="noreferrer" onClick={close} aria-label="Download SlushIQ on the App Store"><img src="/app-store-badge.svg" alt="Download on the App Store" /></a>
          <a href={playStore} target="_blank" rel="noreferrer" onClick={close} aria-label="Get SlushIQ on Google Play"><img src="/google-play-badge.png" alt="Get it on Google Play" /></a>
        </div>
      </nav>
      {open && <button className="mobile-menu-scrim" type="button" aria-label="Close menu" onClick={close} />}
    </div>
  );
}
