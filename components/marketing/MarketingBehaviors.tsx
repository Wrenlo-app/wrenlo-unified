"use client";

import { useEffect } from "react";

/**
 * Ported from wrenlo-web/wrenlo.js — only the two behaviors that are
 * global to every marketing page (scroll reveal + smooth anchor scroll).
 * FAQ accordion, scenario tabs, billing toggle, and survey handling live
 * in wrenlo.js too, but aren't used on the Home page, so they aren't
 * ported here — they'll be added to their respective page components
 * in later rounds of Sprint 2 (About/Pricing/Survey) if needed.
 */
export default function MarketingBehaviors() {
  useEffect(() => {
    // Scroll reveal: matches original `.reveal` / `.reveal.visible` classes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Smooth scroll for same-page anchor links
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    document.addEventListener("click", handleClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
