import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'services', label: 'Services' },
  { id: 'team', label: 'Team', mobileLabel: 'Meet The Team' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

export function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      focusable="false"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452H16.893V14.89c0-1.327-.025-3.036-1.852-3.036-1.853 0-2.136 1.445-2.136 2.94v5.658H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.266 2.369 4.266 5.452v6.291zM5.337 7.433a2.063 2.063 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125zM6.91 20.452H3.764V9H6.91v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

export default function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const goToSection = (sectionId) => {
    closeMobileMenu();
    if (location.pathname === '/') {
      scrollToSection(sectionId);
      window.history.replaceState(null, '', `#${sectionId}`);
      return;
    }
    navigate({ pathname: '/', hash: sectionId });
  };

  const handleSectionClick = (event, sectionId) => {
    event.preventDefault();
    goToSection(sectionId);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo logo-frame">
          <img src="/images/logo-clean.png" alt="Up4Growth" className="logo-img" fetchPriority="high" decoding="async" />
        </Link>
        <ul className="nav-links">
          {navSections.slice(0, 3).map(({ id, label }) => (
            <li key={id}>
              <a href={`/#${id}`} className="nav-link" onClick={(event) => handleSectionClick(event, id)}>
                {label}
              </a>
            </li>
          ))}
          <li><Link to="/blog" className="nav-link">Blog</Link></li>
          {navSections.slice(3).map(({ id, label }) => (
            <li key={id}>
              <a href={`/#${id}`} className="nav-link" onClick={(event) => handleSectionClick(event, id)}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://www.linkedin.com/company/up4growth/"
              target="_blank"
              rel="noreferrer"
              className="nav-social-link"
              aria-label="Visit Up4Growth on LinkedIn"
              title="Up4Growth LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navSections.slice(0, 3).map(({ id, label, mobileLabel }) => (
          <a
            key={id}
            href={`/#${id}`}
            className="mobile-menu-link"
            onClick={(event) => handleSectionClick(event, id)}
          >
            {mobileLabel ?? label}
          </a>
        ))}
        <Link to="/blog" className="mobile-menu-link" onClick={closeMobileMenu}>Blog</Link>
        {navSections.slice(3).map(({ id, label, mobileLabel }) => (
          <a
            key={id}
            href={`/#${id}`}
            className="mobile-menu-link"
            onClick={(event) => handleSectionClick(event, id)}
          >
            {mobileLabel ?? label}
          </a>
        ))}
        <a href="https://www.linkedin.com/company/up4growth/" target="_blank" rel="noreferrer" className="mobile-menu-link" onClick={closeMobileMenu}>
          LinkedIn
        </a>
      </div>
    </nav>
  );
}
