import Script from "next/script";
import "../../styles/marketing.css";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import { CTAPopupProvider } from "@/components/marketing/CTAPopup";
import MarketingBehaviors from "@/components/marketing/MarketingBehaviors";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fonts — same Google Fonts request as the original static site */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Google tag (gtag.js) — same measurement ID as the original site */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-N3CWJVFYFG"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "G-N3CWJVFYFG");
        `}
      </Script>

      <CTAPopupProvider>
        <MarketingBehaviors />
        <Header />
        {children}
        <Footer />
      </CTAPopupProvider>
    </>
  );
}
