import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Wrenlo AI</div>
            <p className="footer-brand-desc">
              AI front desk and lead recovery for U.S. home service contractors. Built to
              capture the revenue that walks out the door after hours.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Pages</div>
            <div className="footer-links">
              <Link className="footer-link" href="/product">Product</Link>
              <Link className="footer-link" href="/pricing">Pricing</Link>
              <Link className="footer-link" href="/why-us">Why Wrenlo</Link>
              <Link className="footer-link" href="/our-story">Our Story</Link>
              <Link className="footer-link" href="/survey">Survey</Link>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Trades</div>
            <div className="footer-links">
              <Link className="footer-link" href="/hvac">HVAC</Link>
              <Link className="footer-link" href="/plumbing">Plumbing</Link>
              <Link className="footer-link" href="/electrical">Electrical</Link>
              <Link className="footer-link" href="/roofing">Roofing</Link>
              <Link className="footer-link" href="/garage-door">Garage Door</Link>
              <Link className="footer-link" href="/pest-control">Pest Control</Link>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <Link className="footer-link" href="/our-story">Our Story</Link>
              <a className="footer-link" href="mailto:hello@wrenlo.co">Contact Us</a>
              <Link className="footer-link" href="/privacy">Privacy Policy</Link>
              <Link className="footer-link" href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Wrenlo AI · wrenlo.co</span>
          <span className="footer-copy">Built for contractors who are done missing jobs</span>
        </div>
      </div>
    </footer>
  );
}
