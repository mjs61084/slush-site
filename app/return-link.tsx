"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export function ReturnLink({ href, returnHash, children }: { href: string; returnHash: string; children: ReactNode }) {
  const rememberSection = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}${returnHash}`);
  };

  return <Link href={href} onClick={rememberSection}>{children}</Link>;
}
