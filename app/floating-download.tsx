"use client";

import { useEffect, useState } from "react";

const appStore = "https://apps.apple.com/us/app/slushiq/id6749187530";
const playStore = "https://play.google.com/store/apps/details?id=com.slushiq.app";

export default function FloatingDownload() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      if (!window.matchMedia("(max-width: 650px)").matches) return setVisible(false);
      const cta = document.querySelector(".site-download-cta");
      const ctaVisible = cta ? cta.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setVisible(window.scrollY > 220 && !ctaVisible);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <aside className={`floating-download ${visible ? "is-visible" : ""}`} aria-hidden={!visible} aria-label="Download SlushIQ"><b>Get SlushIQ</b><a href={appStore} target="_blank" rel="noreferrer" tabIndex={visible ? 0 : -1} data-analytics-event="app_store_click" data-analytics-placement="floating_download">iOS</a><a href={playStore} target="_blank" rel="noreferrer" tabIndex={visible ? 0 : -1} data-analytics-event="google_play_click" data-analytics-placement="floating_download">Android</a></aside>;
}
