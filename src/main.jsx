
import { useState } from "react";
import { createRoot } from "react-dom/client";

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0d0f14;
    --surface:   #141720;
    --border:    rgba(255,255,255,0.08);
    --accent:    #e8ff47;
    --text:      #f0f2f5;
    --muted:     #7a7f8e;
    --nav-h:     64px;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  /* ── Navbar ── */
  nav.navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    height: var(--nav-h);
    background: rgba(13,15,20,0.75);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 2rem;
    gap: 2rem;
  }

  /* Brand */
  .navbar__brand {
    font-family: 'Syne', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: -0.5px;
    white-space: nowrap;
    text-decoration: none;
  }

  /* Desktop links */
  .navbar__links {
    display: flex;
    gap: 0.25rem;
    list-style: none;
    flex: 1;
  }

  .navbar__links a {
    display: block;
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s, background 0.2s;
  }

  .navbar__links a:hover,
  .navbar__links a.active {
    color: var(--text);
    background: rgba(255,255,255,0.06);
  }

  .navbar__links a.active {
    color: var(--accent);
  }

  /* Search */
  .navbar__search {
    position: relative;
    margin-left: auto;
  }

  .navbar__search input {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    padding: 0.45rem 1rem 0.45rem 2.2rem;
    width: 200px;
    outline: none;
    transition: border-color 0.2s, width 0.3s;
  }

  .navbar__search input::placeholder { color: var(--muted); }
  .navbar__search input:focus {
    border-color: var(--accent);
    width: 260px;
  }

  .navbar__search svg {
    position: absolute;
    left: 0.65rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
  }

  /* CTA button */
  .navbar__cta {
    background: var(--accent);
    color: #0d0f14;
    border: none;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.5rem 1.1rem;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.2s, transform 0.15s;
  }
  .navbar__cta:hover { opacity: 0.85; transform: translateY(-1px); }

  /* Hamburger */
  .navbar__hamburger {
    display: none;
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    margin-left: auto;
    padding: 0.25rem;
  }

  /* Mobile drawer */
  .navbar__drawer {
    display: none;
    flex-direction: column;
    gap: 0.25rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 1.5rem;
  }

  .navbar__drawer a {
    padding: 0.6rem 0.5rem;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.95rem;
    border-radius: 6px;
    transition: color 0.2s;
  }
  .navbar__drawer a:hover { color: var(--accent); }
  .navbar__drawer.open { display: flex; }

  /* ── Responsive ── */
  @media (max-width: 700px) {
    .navbar__links,
    .navbar__search,
    .navbar__cta { display: none; }
    .navbar__hamburger { display: block; }
  }

  /* ── Main Content ── */
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--nav-h));
    text-align: center;
    padding: 4rem 2rem;
    gap: 1.25rem;
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -2px;
  }

  .hero h1 span { color: var(--accent); }

  .hero p {
    color: var(--muted);
    font-size: 1.1rem;
    max-width: 480px;
    line-height: 1.7;
  }
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",     href: "#", active: true },
  { label: "About",    href: "#" },
  { label: "Projects", href: "#" },
  { label: "Blog",     href: "#" },
  { label: "Contact",  href: "#" },
];

// ── MyAwesomeNavbar Component ─────────────────────────────────────────────────
function MyAwesomeNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        {/* Brand */}
        <a href="#" className="navbar__brand">MyAwesomeNavbar</a>

        {/* Desktop links */}
        <ul className="navbar__links">
          {NAV_LINKS.map(({ label, href, active }) => (
            <li key={label}>
              <a href={href} className={active ? "active" : ""}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="navbar__search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="search" placeholder="Search…" aria-label="Search" className="form-control" />
        </div>

        {/* CTA */}
        <button className="navbar__cta">Get Started</button>

        {/* Hamburger (mobile) */}
        <button
          className="navbar__hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${open ? "open" : ""}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href}>{label}</a>
        ))}
      </div>
    </>
  );
}

// ── MainContent Component (Challenge) ─────────────────────────────────────────
function MainContent() {
  return (
    <main className="hero">
      <h1>React is <span>great!</span></h1>
      <p>
        You've built your first custom React component. Now the world is yours —
        one component at a time.
      </p>
    </main>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <style>{styles}</style>
      <MyAwesomeNavbar />
      <MainContent />
    </>
  );
}

// ── Mount ─────────────────────────────────────────────────────────────────────
const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <App />
  </div>
);
