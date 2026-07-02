"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCTAPopup } from "./CTAPopup";

const NAV_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/why-us", label: "Why Wrenlo" },
  { href: "/our-story", label: "Our Story" },
  { href: "/survey", label: "Survey" },
];

export default function Header() {
  const pathname = usePathname();
  const { openPopup } = useCTAPopup();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      <div className="ann-bar">
        🎁 Win $100 Amazon gift card —{" "}
        <Link href="/survey">take our 5-min founding survey</Link>
      </div>

      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8C3 5.24 5.24 3 8 3s5 2.24 5 5"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M8 8l3-3"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="8" r="1.4" fill="white" />
              </svg>
            </div>
            Wrenlo
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${isActive(link.href) ? " active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-ctas">
            <button className="btn btn-ghost" onClick={() => openPopup("Free Audit")}>
              Free Audit
            </button>
            <button className="btn btn-primary" onClick={() => openPopup("Book Pilot Call")}>
              Book Pilot Call
            </button>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)}>
          ✕
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="mobile-menu-ctas">
          <button
            className="btn btn-ghost btn-full"
            onClick={() => {
              setMenuOpen(false);
              openPopup("Free Missed-Call Audit");
            }}
          >
            Free Missed-Call Audit
          </button>
          <button
            className="btn btn-primary btn-full"
            onClick={() => {
              setMenuOpen(false);
              openPopup("Book Pilot Call");
            }}
          >
            Book Pilot Call
          </button>
        </div>
      </div>
    </>
  );
}
