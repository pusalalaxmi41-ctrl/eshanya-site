'use client';

import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { business, whatsappMessage } from '../../src/data/business';
import { productCategoryPlaceholders } from '../../src/data/products';

const navItems = [
  ['About', 'about'],
  ['Services', 'services'],
  ['Process', 'process'],
  ['Products', 'products'],
  ['Contact', 'contact'],
];

const pillars = [
  ['Dealer Network', 'Supporting businesses with sourcing and supply enquiries.'],
  ['Wholesale Supply', 'Structured support for quantity-led business requirements.'],
  ['Business Enquiries', 'A direct route to discuss availability and next steps.'],
  ['Trade Relationships', 'Communication shaped around lasting trust.'],
];

const process = [
  'Share Requirement',
  'Availability Check',
  'Quotation',
  'Order Confirmation',
  'Supply Coordination',
  'Business Support',
];

const why = [
  ['Direct Communication', 'A clear contact point for business enquiries and requirement follow-up.'],
  ['Business-Focused', 'Built around dealer and wholesaler conversations rather than retail browsing.'],
  ['Local Presence', 'Based in Villankurichi, Coimbatore with visible contact details.'],
  ['Relationship-Driven', 'Aligned with the brand promise: Global Connections • Lasting Trust.'],
];

const customerTypes = ['Dealers', 'Retailers', 'Businesses', 'Institutional Buyers'];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function LogoMark() {
  return (
    <div className="logo-wrap" aria-label={business.businessName}>
      <img src="/eshanya-logo.jpeg" alt="Eshanya Trade Links logo" />
      <div>
        <strong>ESHANYA</strong>
        <small>TRADE LINKS</small>
      </div>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function MediaPanel({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <motion.figure
      className={`media-panel ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt={alt} />
      <span className="media-glow" />
    </motion.figure>
  );
}

export default function TradingSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, 90]);

  const whatsappHref = useMemo(
    () => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
    [],
  );

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.18, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main id="home">
      <header className="site-nav">
        <button className="logo-button" onClick={() => scrollToId('home')} aria-label="Go to home">
          <LogoMark />
        </button>
        <nav aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollToId(id)}>
              {label}
            </button>
          ))}
        </nav>
        <button className="nav-cta" onClick={() => scrollToId('enquiry')}>
          Send Enquiry <ArrowUpRight size={16} />
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </header>

      {menuOpen && (
        <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
          <LogoMark />
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => {
                setMenuOpen(false);
                scrollToId(id);
              }}
            >
              {label} <ChevronRight size={18} />
            </button>
          ))}
        </motion.div>
      )}

      <section className="hero">
        <motion.video className="hero-video" src="/hero-trade-network.mp4" autoPlay muted loop playsInline style={{ scale: heroScale, y: heroY }} />
        <div className="hero-shade" />
        <motion.div className="hero-logo" initial={{ opacity: 0, y: -22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <img src="/eshanya-logo.jpeg" alt="Eshanya Trade Links logo" />
        </motion.div>
        <motion.div className="hero-content" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12 }}>
          <p className="eyebrow">Dealer & Wholesale Business · Coimbatore</p>
          <h1>
            Connecting Business.
            <span>Building Trust.</span>
          </h1>
          <p className="hero-lede">
            Eshanya Trade Links is a Coimbatore-based dealer and wholesaler focused on reliable business relationships, efficient supply and long-term customer trust.
          </p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => scrollToId('enquiry')}>Send an Enquiry <Send size={16} /></button>
            <button className="button glass" onClick={() => scrollToId('products')}>Request Catalogue <ArrowUpRight size={16} /></button>
          </div>
        </motion.div>
        <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
          <MessageCircle size={23} />
        </a>
      </section>

      <section className="stats-strip">
        {['Dealer / Wholesaler', business.city, '5.0 Rating', business.tagline].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="split-section section" id="about">
        <MediaPanel src="/glass-view.jpeg" alt="Premium glass frontage with trade route graphics" className="tall-media" />
        <Reveal className="editorial-copy">
          <p className="eyebrow">About Eshanya</p>
          <h2>Trade connections designed around clarity and trust.</h2>
          <p>
            Eshanya Trade Links operates as a dealer / wholesaler serving business requirements from Coimbatore. The website keeps the product story flexible until the confirmed catalogue is ready.
          </p>
          <p>
            Every section is built for enquiry conversion: clear contact details, a practical process, catalogue readiness and honest business positioning.
          </p>
        </Reveal>
      </section>

      <section className="gallery-section section">
        <MediaPanel src="/facade.jpeg" alt="Modern facade with gold and teal connection lines" />
        <MediaPanel src="/glazing-detail.jpeg" alt="Architectural glazing detail with route graphics" />
        <MediaPanel src="/building-exterior.jpeg" alt="Modern building exterior with metal frame details" />
      </section>

      <section className="section" id="services">
        <Reveal className="center-heading">
          <p className="eyebrow">What We Do</p>
          <h2>Business-first supply support.</h2>
        </Reveal>
        <div className="pillar-grid">
          {pillars.map(([title, copy], index) => (
            <Reveal className="pillar-card" key={title} delay={index * 0.06}>
              <span className="card-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="image-story" id="process">
        <img src="/process-timeline.jpeg" alt="Trading process visual timeline" />
        <div className="image-story-overlay">
          <p className="eyebrow">Trading Process</p>
          <h2>From requirement to supply coordination.</h2>
        </div>
      </section>

      <section className="timeline section">
        {process.map((step, index) => (
          <Reveal className="timeline-step" key={step} delay={index * 0.04}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </Reveal>
        ))}
      </section>

      <section className="catalogue-story" id="products">
        <img src="/catalogue-teaser.jpeg" alt="Product catalogue coming soon visual" />
        <div className="catalogue-panel">
          <p className="eyebrow">Our Product Range</p>
          <h2>Catalogue architecture is ready.</h2>
          <p>Our product catalogue is being organized. Contact Eshanya Trade Links for current product availability and wholesale enquiries.</p>
          <div className="placeholder-list">
            {productCategoryPlaceholders.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <button className="button primary" onClick={() => scrollToId('enquiry')}>Request Catalogue <ArrowUpRight size={16} /></button>
        </div>
      </section>

      <section className="section why-grid" id="why">
        <Reveal className="center-heading">
          <p className="eyebrow">Why Choose Eshanya</p>
          <h2>Professional communication, local clarity, lasting trust.</h2>
        </Reveal>
        {why.map(([title, copy], index) => (
          <Reveal className="why-block" key={title} delay={index * 0.06}>
            <ShieldCheck size={23} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </Reveal>
        ))}
      </section>

      <section className="customer-band section">
        <Reveal className="center-heading">
          <p className="eyebrow">Who We Work With</p>
          <h2>Made for practical business enquiries.</h2>
        </Reveal>
        <div className="customer-types">
          {customerTypes.map((type) => (
            <span key={type}><CheckCircle2 size={18} /> {type}</span>
          ))}
        </div>
      </section>

      <section className="enquiry-section" id="enquiry">
        <div className="section enquiry-layout">
          <Reveal>
            <p className="eyebrow">Get In Touch</p>
            <h2>Let&apos;s Build Something Reliable.</h2>
            <div className="contact-list">
              <p><MapPin /> {business.addressLines.join(', ')}</p>
              <p><Phone /> {business.phone}</p>
              <p><Mail /> {business.email}</p>
              <p><Building2 /> {business.openingHours}</p>
            </div>
          </Reveal>
          <form className="enquiry-form" onSubmit={handleSubmit}>
            {['Name', 'Company Name', 'Phone', 'Email', 'Product / Requirement', 'Quantity', 'City'].map((field) => (
              <label key={field}>
                <span>{field}</span>
                <input required={field !== 'Quantity'} type={field === 'Email' ? 'email' : 'text'} />
              </label>
            ))}
            <label className="full">
              <span>Message</span>
              <textarea rows={4} />
            </label>
            <button className="button primary full" type="submit">Send Enquiry <Send size={16} /></button>
            {submitted && <p className="form-note">Thanks. Please use call, WhatsApp or email to send this enquiry directly.</p>}
          </form>
        </div>
      </section>

      <section className="contact-section section" id="contact">
        <div className="trust-card">
          <Star />
          <strong>{business.rating} Google Rating</strong>
          <span>{business.reviewCount} review · Current listing information</span>
        </div>
        <div className="contact-card">
          <p className="eyebrow">Location & Contact</p>
          <h2>{business.businessName}</h2>
          <p>{business.contactPerson}</p>
          <p>{business.addressLines.join(', ')}</p>
          <div className="quick-actions">
            <a href={business.phoneHref}><Phone size={18} /> Call</a>
            <a href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
            <a href={business.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={18} /> Directions</a>
          </div>
        </div>
      </section>

      <footer>
        <div>
          <LogoMark />
          <p>{business.tagline}</p>
        </div>
        <span>{business.businessType} · {business.city}</span>
        <strong aria-hidden="true">ESHANYA</strong>
      </footer>
    </main>
  );
}
