import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        :root {
          --ink: #0B0F19;
          --cream: #FAF8F4;
          --amber: #D97706;
          --amber-mid: #F59E0B;
        }
        .nf-page { font-family: 'DM Sans', system-ui, sans-serif; }
        .nf-nav {
          border-bottom: 1px solid rgba(250,248,244,.06);
          background: var(--ink);
          padding: 18px 5%;
        }
        .nf-nav a {
          color: var(--cream);
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          text-decoration: none;
        }
        .nf-nav a span { color: var(--amber-mid); }
        .not-found {
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 100px 5%;
          background: var(--ink);
        }
        .big-num {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(100px, 18vw, 180px);
          line-height: 1;
          color: rgba(250,248,244,.05);
          letter-spacing: -.04em;
          margin-bottom: -20px;
        }
        .nf-icon { font-size: 40px; margin-bottom: 20px; }
        .nf-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 5vw, 52px);
          color: var(--cream);
          line-height: 1.05;
          letter-spacing: -.02em;
          margin-bottom: 16px;
        }
        .nf-title em { font-style: italic; color: var(--amber-mid); }
        .nf-sub {
          font-size: 16px;
          color: rgba(250,248,244,.4);
          font-weight: 300;
          max-width: 400px;
          line-height: 1.7;
          margin: 0 auto 36px;
        }
        .nf-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .nf-btn {
          padding: 12px 24px;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all .15s;
          cursor: pointer;
          border: none;
          display: inline-block;
        }
        .nf-btn-primary { background: var(--amber); color: var(--cream); }
        .nf-btn-primary:hover { background: var(--amber-mid); }
        .nf-btn-outline {
          background: transparent;
          color: rgba(250,248,244,.4);
          border: 1px solid rgba(250,248,244,.1);
        }
        .nf-btn-outline:hover { color: var(--cream); border-color: rgba(250,248,244,.3); }
      `}</style>

      <div className="nf-page">
        <nav className="nf-nav">
          <Link href="/">
            Wren<span>lo</span>
          </Link>
        </nav>

        <div className="not-found">
          <div className="big-num">404</div>
          <div className="nf-icon">🔧</div>
          <h1 className="nf-title">
            This page needs
            <br />a <em>wrench.</em>
          </h1>
          <p className="nf-sub">
            Looks like this page doesn&apos;t exist — or maybe it moved. Either way, we&apos;ve
            got you covered.
          </p>
          <div className="nf-actions">
            <Link href="/" className="nf-btn nf-btn-primary">
              ← Back to Wrenlo
            </Link>
            <Link href="/survey" className="nf-btn nf-btn-outline">
              Take the survey
            </Link>
            <a href="mailto:hello@wrenlo.co" className="nf-btn nf-btn-outline">
              Email us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
