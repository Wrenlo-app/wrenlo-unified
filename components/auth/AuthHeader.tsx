import Link from "next/link";

export default function AuthHeader() {
  return (
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
      </div>
    </nav>
  );
}
