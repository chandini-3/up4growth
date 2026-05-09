import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Users, Target, BookOpen, Quote, Shield, Zap, Heart, ExternalLink, Mail, Briefcase, Trophy, Menu, X, Calendar, Clock, MapPin, Link as LinkIcon, CheckCircle2, Star } from 'lucide-react';
import './index.css';

function LinkedInIcon() {
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

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const revealRefs = useRef([]);
  const emailSubject = 'Request for Details on Up4Growth Programs';
  const emailBody = `Hello Up4Growth Team,\n\nI recently came across Up4Growth and I'm interested in understanding more about your coaching programs and workshops.\n\nCould you please share further details on your offerings and how I can get started?\n\nThank you, and I look forward to your response.\n\nBest regards,\n[Your Name]`;
  const mailtoLink = `mailto:contact@up4growth.ch?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    let timer;
    if (showPopup) {
      document.body.style.overflow = 'hidden';
      timer = setTimeout(() => {
        closePopup();
      }, 60000);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      if (timer) clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [showPopup]);

  useEffect(() => {
    const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!gaMeasurementId || typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaMeasurementId, { anonymize_ip: true });

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    gaScript.setAttribute('data-ga4', 'true');
    document.head.appendChild(gaScript);

    return () => {
      gaScript.remove();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="layout">
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content banner-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-x" onClick={closePopup}>
              <X size={24} />
            </button>
            <div className="banner-popup-inner">
              <div className="banner-left">
              <p className="banner-italic-top">Invest in yourself.<br/>Connect. Grow. Thrive.</p>
              
              <div className="banner-badge">
                <span className="badge-highlight">CAREER NETWORKING</span> 
                <span className="badge-script">Event</span>
              </div>
              
              <h1 className="banner-title">
                <span className="title-dark">OWN YOUR</span><br/>
                <span className="title-pink">CAREER</span>
              </h1>
              
              <div className="banner-subtitle">
                <span>TAKE CHARGE OF YOUR</span><br/>
                <span>PROFESSIONAL GROWTH</span>
              </div>

              <p className="banner-desc">
                An engaging workshop + networking<br/>
                experience to <span className="text-pink">inspire your next move</span><br/>
                and <span className="text-pink">expand your network.</span>
              </p>

              <div className="banner-details">
                <div className="detail-col sep">
                  <Calendar className="icon-pink" size={28} />
                  <div>
                    <strong>FRIDAY</strong><br/>
                    5TH JUNE 2026
                  </div>
                </div>
                <div className="detail-col sep">
                  <Clock className="icon-pink" size={28} />
                  <div>15:30 - 19:00 CET</div>
                </div>
                <div className="detail-col">
                  <MapPin className="icon-pink" size={28} />
                  <div>
                    <strong>Memox | Basel SBB</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="banner-right">

              <div className="right-register-box" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', marginBottom: '10px'}}>
                <h3 style={{fontSize: '20px', margin: 0, color: '#fff'}}>Reserve Your Spot Now!</h3>
                <a 
                  href="https://eventfrog.ch/en/p/courses-seminars/coaching/own-your-career-workshop-networking-event-basel-7455238459688538552.html" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-primary"
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    fontSize: '16px',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#e53935',
                    color: '#fff',
                    fontWeight: 600,
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  Register Now
                </a>
              </div>

              <hr className="divider" style={{ marginTop: '5px' }} />

              <div className="right-gain">
                <div className="gain-title" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div className="icon-circle bg-pink"><Star size={16} fill="white" color="white" /></div>
                  <h3 style={{margin:0}}>What You'll Experience</h3>
                </div>
                <ul className="gain-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 0 0 10px', margin: '20px 0 0 0', listStyleType: 'none' }}>
                  <li style={{marginBottom: 0, fontSize: '15px', display: 'flex', alignItems: 'flex-start'}}><span style={{fontSize: '20px', marginRight: '12px', lineHeight: '1.2'}}>✨</span> <span style={{lineHeight: '1.4'}}>Networking with like-minded professionals</span></li>
                  <li style={{marginBottom: 0, fontSize: '15px', display: 'flex', alignItems: 'flex-start'}}><span style={{fontSize: '20px', marginRight: '12px', lineHeight: '1.2'}}>🎲</span> <span style={{lineHeight: '1.4'}}>Engaging games to break the ice and build real connections</span></li>
                  <li style={{marginBottom: 0, fontSize: '15px', display: 'flex', alignItems: 'flex-start'}}><span style={{fontSize: '20px', marginRight: '12px', lineHeight: '1.2'}}>🧠</span> <span style={{lineHeight: '1.4'}}>Interactive workshop on owning your career and growth</span></li>
                  <li style={{marginBottom: 0, fontSize: '15px', display: 'flex', alignItems: 'flex-start'}}><span style={{fontSize: '20px', marginRight: '12px', lineHeight: '1.2'}}>🍹</span> <span style={{lineHeight: '1.4'}}>Drinks & Delicious food</span></li>
                  <li style={{marginBottom: 0, fontSize: '15px', display: 'flex', alignItems: 'flex-start'}}><span style={{fontSize: '20px', marginRight: '12px', lineHeight: '1.2'}}>🎧</span> <span style={{lineHeight: '1.4'}}>Music & DJ to keep the energy high</span></li>
                  <li style={{marginBottom: 0, fontSize: '15px', display: 'flex', alignItems: 'flex-start'}}><span style={{fontSize: '20px', marginRight: '12px', lineHeight: '1.2'}}>📍</span> <span style={{lineHeight: '1.4'}}>Great location designed for engaging workshops</span></li>
                </ul>
              </div>

              <div style={{height: '20px'}}></div> {/* Added spacing at the bottom so the popup breathes */}
              
            </div>
            </div>
          </div>
        </div>
      )}
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#home" className="logo logo-frame">
            <img src="/images/logo-clean.png" alt="Up4Growth" className="logo-img" fetchPriority="high" decoding="async" />
          </a>
          <ul className="nav-links">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#expertise" className="nav-link">Expertise</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#team" className="nav-link">Team</a></li>
            <li><a href="#blog" className="nav-link">Blog</a></li>
            <li><a href="#testimonials" className="nav-link">Testimonials</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
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
          <a href="#home" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#expertise" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Expertise</a>
          <a href="#services" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#team" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Meet The Team</a>
          <a href="#blog" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Blog</a>
          <a href="#testimonials" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <a href="#contact" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="https://www.linkedin.com/company/up4growth/" target="_blank" rel="noreferrer" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
            LinkedIn
          </a>
        </div>
      </nav>

      <main>
      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <p className="hero-values">
              CLARITY · INTENTION · INSPIRATION
            </p>
            <h1 className="hero-title">
              Growth by design, not by default.
            </h1>
            <p className="hero-description">
              We create space for clear thinking, conscious choices and visible progress.
            </p>
            <div className="hero-actions">
              <a href="#expertise" className="btn btn-primary">
                View Expertise <ArrowRight size={18} />
              </a>
              <a href="https://calendly.com/gade" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ background: '#fff' }}>
                GET IN TOUCH
              </a>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="hero-image-container">
            <img 
              src="/images/hero.png" 
              alt="Corporate Growth" 
              className="hero-image" 
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </header>

      {/* Expertise Section */}
      <section className="section" id="expertise" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="section-tag">Broad Impact</span>
            <h2 className="section-title">Areas of Expertise</h2>
          </div>

          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              { title: 'Career Development', icon: <Briefcase size={32} />, desc: 'Guidance to identify key skills, gain confidence, and create clear roadmaps for professional advancement.' },
              { title: 'Leadership', icon: <Trophy size={32} />, desc: 'Enhancing leadership qualities, strategic thinking, and the ability to inspire and empower teams.' },
              { title: 'Productivity', icon: <Zap size={32} />, desc: 'Cultivating focus, balance, and sustainable high performance in the modern workplace.' },
              { title: 'Wellbeing', icon: <Heart size={32} />, desc: 'Promoting mental clarity and resilience as the foundation for optimal performance.' }
            ].map((exp, i) => (
              <div key={i} className="service-card reveal" ref={addToRefs} style={{ transitionDelay: `${i * 0.1}s`, textAlign: 'center' }}>
                <div className="service-icon-box" style={{ margin: '0 auto 2rem' }}>{exp.icon}</div>
                <h3 className="service-title" style={{ fontSize: '1.5rem' }}>{exp.title}</h3>
                <p className="service-desc">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="section-tag">How we help</span>
            <h2 className="section-title">Our Services</h2>
          </div>

          <div className="services-grid">
            <div className="service-card reveal" ref={addToRefs}>
              <div className="service-icon-box"><Users size={32} /></div>
              <h3 className="service-title">Corporate Workshops</h3>
              <p className="service-desc">
                Interactive, high-impact sessions designed to enhance leadership, teamwork, and productivity. We help organizations nurture growth-oriented cultures through experiential learning.
              </p>
            </div>
            
            <div className="service-card reveal" ref={addToRefs} style={{ transitionDelay: '0.1s' }}>
              <div className="service-icon-box"><Target size={32} /></div>
              <h3 className="service-title">One-on-One Coaching</h3>
              <p className="service-desc">
                Personalized coaching sessions focused on self-awareness, goal setting, and performance improvement. We empower professionals to reach their full potential.
              </p>
            </div>

            <div className="service-card reveal" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
              <div className="service-icon-box"><BookOpen size={32} /></div>
              <h3 className="service-title">Productivity Programs</h3>
              <p className="service-desc">
                Our Productivity Programs are designed to help professionals cultivate focus, balance, and sustainable high performance in their workdays.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="why-choose-block reveal" ref={addToRefs}>
            <span className="section-tag why-choose-tag">Why Choose Us</span>
            <h3 className="why-choose-title">Practical guidance built for real impact</h3>
            <div className="why-choose-grid">
              {[
                'Practical, action-oriented approach',
                'Personalized coaching and support',
                'Simple and clear growth frameworks',
                'Focused on measurable outcomes'
              ].map((item, i) => (
                <div
                  key={item}
                  className="why-choose-item"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section" id="team">
        <div className="container">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title">Meet The Team</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1.5rem auto' }}>
              At Up4Growth, we believe growth begins with self-awareness and purposeful action. We are dedicated to creating spaces where individuals and teams can explore, learn, and thrive.
            </p>
          </div>

          <div className="team-grid" style={{ maxWidth: '1280px' }}>
            <div className="team-card reveal" ref={addToRefs}>
              <div className="team-img-container">
                <img src="/images/Madhu Gade.jpg" alt="Madhu Gade" className="team-img" loading="lazy" decoding="async" />
              </div>
              <div className="team-info">
                <span className="team-role">Certified Coach & Corporate Trainer</span>
                <h3 className="team-name">Madhu Gade</h3>
                <ul style={{ listStyle: 'none', padding: '0', margin: '1rem 0', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                  <li>• Coached 80+ individuals worldwide</li>
                  <li>• Empowered 1,000+ participants through workshops</li>
                  <li>• 20+ years of experience in Data & Analytics</li>
                </ul>
                <a href="https://www.linkedin.com/company/up4growth/" target="_blank" rel="noreferrer" className="nav-link" style={{ color: '#0077B5', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ExternalLink size={18} /> LinkedIn
                </a>
              </div>
            </div>

            <div className="team-card reveal" ref={addToRefs} style={{ transitionDelay: '0.1s' }}>
              <div className="team-img-container">
                <img src="/images/Etienne Claverie.png" alt="Etienne Claverie" className="team-img" loading="lazy" decoding="async" />
              </div>
              <div className="team-info">
                <span className="team-role">Certified Facilitator & Agile Coach</span>
                <h3 className="team-name">Etienne Claverie</h3>
                <ul style={{ listStyle: 'none', padding: '0', margin: '1rem 0', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                  <li>• Facilitated 50+ workshops worldwide</li>
                  <li>• 15 years in Agro-industries</li>
                  <li>• PhD in Applied Mathematics</li>
                </ul>
                <a href="https://www.linkedin.com/company/up4growth/" target="_blank" rel="noreferrer" className="nav-link" style={{ color: '#0077B5', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ExternalLink size={18} /> LinkedIn
                </a>
              </div>
            </div>

            <div className="team-card reveal" ref={addToRefs} style={{ transitionDelay: '0.2s', gridColumn: '1 / -1' }}>
              <div className="team-img-container">
                <img src="/images/Chandini%20Majji.jpg" alt="Chandini Majji" className="team-img" loading="lazy" decoding="async" />
              </div>
              <div className="team-info">
                <span className="team-role">Software Engineering Intern - Data, Digital & AI</span>
                <h3 className="team-name">Chandini Majji</h3>
                <ul style={{ listStyle: 'none', padding: '0', margin: '1rem 0', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                  <li>• Contribute to building and improving digital and AI-enabled solutions</li>
                  <li>• Work with data to support insights and functionality</li>
                  <li>• Gain hands-on experience through real projects and guided mentorship</li>
                </ul>
                <a href="https://www.linkedin.com/in/chandini-majji-651b7728b/" target="_blank" rel="noreferrer" className="nav-link" style={{ color: '#0077B5', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ExternalLink size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                text: "Madhu’s coaching was pivotal in my transition from CRM Manager to Digital Business Operations Manager, helping me identify key skills, gain confidence, and embrace digital transformation. His practical, forward-thinking guidance gave me a clear roadmap to excel and drive innovation in my new role.",
                author: "Zahida Sultana",
                role: "Digital Business Operations Manager"
              },
              {
                text: "I highly recommend Madhu Gade. His workshops and one-on-one coaching sessions helped me clarify my career goals, create actionable plans, and unlock my full potential through his guidance and support.",
                author: "Krisztina Gelbmann",
                role: "Administrative Assistant"
              },
              {
                text: "Your workshop reminded me of lessons I’d learned before, like “being truly in the moment” and not rushing. The daily rush had pulled me away from them, but your guidance helped me get back on track. Thank you!",
                author: "Julia Stärk",
                role: "Scientist"
              },
              {
                text: "It’s been a great experience coaching with Madhu. He guided me to reflect on my life and career goals, and the Life Wheel exercise was incredibly helpful. His guidance gave me clear direction. Thank you, Madhu!",
                author: "Donglan Tian",
                role: "Head of CP Biological Research"
              }
            ].map((t, i) => (
              <div key={i} className="testimonial-card reveal" ref={addToRefs} style={{ borderBottom: `4px solid ${i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)'}` }}>
                <Quote size={32} style={{ marginBottom: '1.5rem', opacity: 0.1 }} />
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.7' }}>
                  "{t.text}"
                </p>
                <div style={{ fontWeight: '700' }}>– {t.author}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section" id="newsletters" style={{ background: '#111', color: '#fff' }}>
        <div className="container">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="section-tag" style={{ color: '#fff', opacity: 0.7 }}>Newsletter</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Anyone Who Wants To Grow!</h2>
            <p style={{ opacity: 0.8, marginTop: '1rem' }}>Our Up4Growth coach & trainer newsletters are available on LinkedIn & Medium.</p>
          </div>

          <div className="newsletter-grid">
            <div className="reveal" ref={addToRefs} style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <ExternalLink size={34} style={{ color: '#0077B5' }} />
                <h3 className="service-title" style={{ color: '#fff', margin: 0 }}>LinkedIn Newsletter</h3>
              </div>
              <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Stay updated with professional insights, growth strategies, and success stories from Up4Growth coaches.</p>
              <a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7238170764301017088" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ background: '#0077B5' }}>Read on LinkedIn</a>
            </div>

            <div className="reveal" ref={addToRefs} style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', transitionDelay: '0.1s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <ExternalLink size={34} />
                <h3 className="service-title" style={{ color: '#fff', margin: 0 }}>Medium Newsletter</h3>
              </div>
              <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Dive deeper into thought-provoking articles, productivity tips, and personal growth content written by our coaches.</p>
              <a href="https://medium.com/@gade.madhu" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ border: '1px solid #fff', color: '#fff' }}>Read on Medium</a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section (SEO Content) */}
      <section className="section" id="blog" style={{ background: '#f9fafb' }}>
        <div className="container">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="section-tag">Insights & Resources</span>
            <h2 className="section-title">Latest Articles & Career Advice</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '1.5rem auto' }}>
              Explore deep insights into career networking, leadership, and professional growth.
            </p>
          </div>

          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {[
              { 
                title: 'The Ultimate Guide to Career Networking in Switzerland', 
                category: 'Networking',
                desc: 'Networking is an art. Discover how to effectively build professional connections and accelerate your career across Switzerland.',
                link: '/blog/networking-strategies-switzerland/'
              },
              { 
                title: 'How to Lead with Impact: Leadership Workshops in Basel', 
                category: 'Leadership',
                desc: 'Effective leadership requires intention. Learn actionable takeaways from our latest Basel leadership workshops to lead teams successfully.',
                link: '#'
              },
              { 
                title: '5 Strategies to Maximize Professional Growth Programs', 
                category: 'Career Growth',
                desc: 'Are you getting the most out of your growth programs? Discover 5 ways to apply workshop learnings into long-term habits.',
                link: '#'
              },
              { 
                title: 'Navigating the European Startup Scene: Tips for Networking', 
                category: 'Startups',
                desc: 'The startup ecosystem across Europe is dynamic but crowded. Here is how to stand out and build a supportive European network.',
                link: '#'
              },
              { 
                title: 'The Power of Intentional Career Choices', 
                category: 'Career Design',
                desc: 'Growth by design, not default. Exploring how small, conscious steps can radically shift your professional trajectory.',
                link: '#'
              }
            ].map((blog, i) => (
              <div key={i} className="service-card reveal" ref={addToRefs} style={{ transitionDelay: `${i * 0.1}s`, textAlign: 'left', padding: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{blog.category}</span>
                <h3 className="service-title" style={{ fontSize: '1.3rem', margin: '1rem 0' }}>{blog.title}</h3>
                <p className="service-desc" style={{ marginBottom: '1.5rem' }}>{blog.desc}</p>
                <a href={blog.link} style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Read Article <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section cta-section" id="contact">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-text reveal" ref={addToRefs}>
              <span className="section-tag" style={{ color: '#fff', textAlign: 'left' }}>Contact Us</span>
              <h2>Start your journey with us today.</h2>
              <p>
                Schedule a meeting today with our coaches explore to collaboration opportunities.
              </p>
            </div>
            <div className="reveal text-center cta-action" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
              <a href="https://calendly.com/gade" target="_blank" rel="noreferrer" className="btn btn-primary cta-button" style={{ backgroundColor: '#fff', color: 'var(--color-text-primary)' }}>
                <Mail /> Get in Touch
              </a>
              <p style={{ marginTop: '1rem', opacity: 0.6 }}>Free 30-minute discovery call</p>
              <p style={{ marginTop: '1rem', opacity: 0.9 }}>
                Email: <a href={mailtoLink} style={{ color: '#fff', textDecoration: 'underline' }}>contact@up4growth.ch</a>
              </p>
              <p style={{ marginTop: '0.75rem', opacity: 0.9 }}>
                <a href="https://www.linkedin.com/company/up4growth/" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><LinkedInIcon /> Up4Growth</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom-bar">
            <span>&copy; 2026 Up4Growth</span>
            <span className="footer-divider">|</span>
            <a href="/data-protection.html" className="footer-bottom-link">Data Protection</a>
            <span className="footer-divider">|</span>
            <a href="/imprint.html" className="footer-bottom-link">Imprint</a>
            <span className="footer-divider">|</span>
            <a href="/terms-and-conditions.html" className="footer-bottom-link">Terms and Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
