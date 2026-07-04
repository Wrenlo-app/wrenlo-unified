import "../../styles/marketing.css";
import "../../styles/auth.css";
import AuthHeader from "@/components/auth/AuthHeader";
import Footer from "@/components/marketing/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Same font as the marketing site, so the login page doesn't fall
          back to a mismatched system font. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <AuthHeader />
      {children}
      <Footer />
    </>
  );
}
