"use client";

import { useEffect, useState } from "react";

type Platform = "ios" | "android" | "unknown";

export function StorePicker({ appStore, playStore }: { appStore: string; playStore: string }) {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isIPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    if (/iPhone|iPad|iPod/i.test(ua) || isIPadOS) setPlatform("ios");
    else if (/Android/i.test(ua)) setPlatform("android");
  }, []);

  const detectedUrl = platform === "ios" ? appStore : platform === "android" ? playStore : null;
  const detectedLabel = platform === "ios" ? "Get for iPhone" : platform === "android" ? "Get for Android" : "Get the app";

  return <div className="smart-store-picker">
    {detectedUrl ? <a className="smart-store-primary" href={detectedUrl} target="_blank" rel="noreferrer">{detectedLabel} <span>↗</span></a> : null}
    <details className={`store-picker ${detectedUrl ? "has-detected" : ""}`}>
      <summary aria-label={detectedUrl ? "Choose a different app store" : "Choose an app store"}>{detectedUrl ? <span>⌄</span> : <>Get the app <span>⌄</span></>}</summary>
      <div className="store-picker-menu"><p>{detectedUrl ? "Choose another device" : "Choose your device"}</p><a href={appStore} target="_blank" rel="noreferrer"><img src="/app-store-badge.svg" alt="Download on the App Store" /></a><a href={playStore} target="_blank" rel="noreferrer"><img src="/google-play-badge.png" alt="Get it on Google Play" /></a></div>
    </details>
  </div>;
}
