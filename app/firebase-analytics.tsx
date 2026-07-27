"use client";

import { useEffect, useState } from "react";
import type { Analytics } from "firebase/analytics";

const consentKey = "slushiq-analytics-consent";
let analyticsInstance: Analytics | null = null;

const firebaseConfig = {
  apiKey: "AIzaSyAJ_av-H-ya2ohPOx0SYO56Mc2J9CJjAWQ",
  authDomain: "slushiq-d4c10.firebaseapp.com",
  projectId: "slushiq-d4c10",
  storageBucket: "slushiq-d4c10.firebasestorage.app",
  messagingSenderId: "543261503299",
  appId: "1:543261503299:web:59351219b612fd351689f6",
  measurementId: "G-BT17HY1TF0",
};

async function startAnalytics() {
  if (analyticsInstance) return analyticsInstance;
  const [{ getApps, initializeApp }, { getAnalytics, isSupported }] = await Promise.all([
    import("firebase/app"),
    import("firebase/analytics"),
  ]);
  if (!(await isSupported())) return null;
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  analyticsInstance = getAnalytics(app);
  return analyticsInstance;
}

export default function FirebaseAnalytics() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(consentKey);
    if (saved === "accepted" || saved === "declined") setConsent(saved);
    if (saved === "accepted") void startAnalytics();
  }, []);

  useEffect(() => {
    const trackClick = async (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      const eventName = target?.dataset.analyticsEvent;
      if (!eventName || consent !== "accepted") return;
      const analytics = await startAnalytics();
      if (!analytics) return;
      const { logEvent } = await import("firebase/analytics");
      logEvent(analytics, eventName, { placement: target.dataset.analyticsPlacement ?? "unknown" });
    };
    const trackSubmit = async (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      const eventName = form?.dataset.analyticsEvent;
      if (!eventName || consent !== "accepted") return;
      const analytics = await startAnalytics();
      if (!analytics) return;
      const { logEvent } = await import("firebase/analytics");
      logEvent(analytics, eventName);
    };
    document.addEventListener("click", trackClick);
    document.addEventListener("submit", trackSubmit);
    return () => {
      document.removeEventListener("click", trackClick);
      document.removeEventListener("submit", trackSubmit);
    };
  }, [consent]);

  if (consent !== null) return null;

  const choose = (value: "accepted" | "declined") => {
    window.localStorage.setItem(consentKey, value);
    setConsent(value);
    if (value === "accepted") void startAnalytics();
  };

  return (
    <aside className="analytics-consent" aria-label="Analytics preferences">
      <p><b>Help improve SlushIQ</b><span>Allow anonymous analytics so we can understand which guides and download links are useful. No advertising or sale of personal information.</span></p>
      <div><button type="button" onClick={() => choose("declined")}>Not now</button><button type="button" onClick={() => choose("accepted")}>Allow analytics</button></div>
    </aside>
  );
}
