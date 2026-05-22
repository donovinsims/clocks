import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookingButton } from "@/components/BookingModal";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="nav" data-state={scrolled ? "scrolled" : "rest"}>
      <div className="nav__inner">
        <Link className="nav__brand" to="/" aria-label="Clockout · home" onClick={close}>
          <span className="nav__brand-dot" aria-hidden="true" />
          <span>
            Clockout<span className="nav__brand-num">/IL</span>
          </span>
        </Link>
        <nav className="nav__links" aria-label="Primary">
          <Link to="/about">About</Link>
          <Link to="/agents">Agents</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/operator-os">Operator OS</Link>
        </nav>
        <BookingButton className="nav__cta nav__cta--desktop">Book free audit</BookingButton>
        <button
          type="button"
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__burger-bar" data-open={open} />
          <span className="nav__burger-bar" data-open={open} />
          <span className="nav__burger-bar" data-open={open} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className="nav__sheet"
        data-open={open}
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <nav className="nav__sheet-links" aria-label="Mobile primary">
          <Link to="/about" onClick={close}>About</Link>
          <Link to="/agents" onClick={close}>Agents</Link>
          <Link to="/blog" onClick={close}>Blog</Link>
          <Link to="/operator-os" onClick={close}>Operator OS</Link>
        </nav>
        <BookingButton className="cta cta--primary cta--lg nav__sheet-cta" onClick={close}>
          Book free audit
        </BookingButton>
      </div>
    </header>
  );
}
