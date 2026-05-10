import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const BUSINESS = {
  name: "Corporate Cleaning Group",
  tagline: "Reliable, professional office cleaning that makes your workplace shine.",
  email: "info@corporatecleaninggroup.com.au",
  phone: "+61 416 589 495",
  whatsapp: "+61416589495",
  location: "Brisbane QLD, Australia",
  mapQuery: "Brisbane QLD Australia",
};

const phoneHref = `tel:${BUSINESS.phone.replace(/\s+/g, "")}`;
const whatsAppUrl = `https://wa.me/61416589495`;
const bookingMessage = encodeURIComponent("Hi Corporate Cleaning Group, I want to book office cleaning.");
const emailBookingSubject = encodeURIComponent("Office Cleaning Booking Enquiry");
const emailBookingBody = encodeURIComponent("Hi Corporate Cleaning Group, I would like to book office cleaning. My preferred date and cleaning needs are:");
const cleaningMessage = encodeURIComponent("Hi Corporate Cleaning Group, I need office cleaning.");
const quoteMessage = encodeURIComponent("Hi Corporate Cleaning Group, I would like to get a free quote. My preferred date and cleaning needs are:");

const photos = {
  hero: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
  cleaner: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1200&q=80",
  office: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  supplies: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
  blog: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  corridor: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
  meeting: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
};

const trustSignals = [
  { title: "Fully insured", detail: "Professional cleaning with business confidence.", icon: "🛡️" },
  { title: "ABN registered", detail: "Registered Australian business.", icon: "✅" },
  { title: "Police checked staff", detail: "Trustworthy cleaners for your workplace.", icon: "👮" },
  { title: "Serving Brisbane businesses", detail: "Local commercial cleaning support.", icon: "📍" },
];

const LOGO_SRC = "/logo.png";

const services = [
  { title: "Office cleaning", detail: "Daily, weekly or scheduled cleaning for professional workspaces.", icon: "🏢" },
  { title: "Reception and lobby cleaning", detail: "Make the first impression clean, fresh and welcoming.", icon: "✨" },
  { title: "Workstation and desk cleaning", detail: "Desk, chair and surface cleaning for staff areas.", icon: "💻" },
  { title: "Kitchen and lunchroom cleaning", detail: "Benches, sinks, tables and shared food areas refreshed.", icon: "☕" },
  { title: "Bathroom and washroom cleaning", detail: "Professional washroom cleaning with hygiene-focused detail.", icon: "🧼" },
  { title: "Bins emptied and liners replaced", detail: "Waste areas kept tidy, hygienic and odour-controlled.", icon: "🗑️" },
  { title: "Vacuuming and mopping", detail: "Floors maintained for a polished business presentation.", icon: "🧹" },
  { title: "High-touch point disinfection", detail: "Door handles, switches and shared surfaces sanitised.", icon: "🛡️" },
  { title: "Carpet steam cleaning", detail: "Deep steam cleaning to remove stains, dirt and allergens from carpets.", icon: "🧽" },
  { title: "Sofa & chair steam cleaning", detail: "Professional upholstery steam cleaning for sofas and office chairs.", icon: "🛋️" },
];

const packages = [
  {
    name: "Standard Office Clean",
    price: "$55",
    unit: "per hour",
    minimum: "$165 minimum booking",
    description: "Best for offices that already have cleaning chemicals and equipment available on site.",
    features: ["General office cleaning", "Kitchen and bathroom refresh", "Vacuuming and mopping", "Client provides chemicals and equipment"],
  },
  {
    name: "Premium Office Clean",
    price: "$65",
    unit: "per hour",
    minimum: "$165 minimum booking",
    description: "Same professional office cleaning service, but we bring our own chemicals and cleaning equipment, so your company does not need to provide anything.",
    features: ["Everything in Standard", "We bring cleaning chemicals", "We bring cleaning equipment", "No supplies required from your company"],
    highlight: true,
  },
];

const reviews = [
  {
    name: "Sarah M.",
    role: "Office Manager",
    text: "Very professional and reliable. Our office looks fresh every week, and communication is excellent.",
  },
  {
    name: "David R.",
    role: "Small Business Owner",
    text: "Easy booking, clear pricing and great attention to detail. Highly recommend for commercial cleaning.",
  },
  {
    name: "Amina K.",
    role: "Practice Coordinator",
    text: "They understand business cleaning standards and always leave the workplace looking clean and organised.",
  },
];

const initialPosts = [
  {
    id: 1,
    title: "Why Regular Office Cleaning Improves Workplace Productivity",
    date: "Today",
    category: "Office Cleaning",
    image: photos.office,
    excerpt: "A clean workplace helps staff feel comfortable, reduces distractions and creates a professional first impression for visitors and clients.",
    likes: 12,
    dislikes: 1,
  },
  {
    id: 2,
    title: "What Is Included in Professional Commercial Cleaning?",
    date: "Yesterday",
    category: "Commercial Cleaning",
    image: photos.cleaner,
    excerpt: "Professional cleaning can include floors, bathrooms, kitchens, desks, bins, dusting, sanitising and regular maintenance cleaning.",
    likes: 8,
    dislikes: 0,
  },
  {
    id: 3,
    title: "How Often Should an Office Be Cleaned?",
    date: "This Week",
    category: "Cleaning Tips",
    image: photos.supplies,
    excerpt: "Most offices benefit from weekly or multiple weekly cleaning depending on staff numbers, foot traffic, kitchen use and customer visits.",
    likes: 15,
    dislikes: 2,
  },
];

const buttonBase = "inline-flex items-center justify-center rounded-full px-6 py-3 font-bold transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2";
const primaryButton = `${buttonBase} bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-900/20 hover:bg-emerald-400`;
const darkButton = `${buttonBase} bg-slate-950 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800`;
const outlineButton = `${buttonBase} border border-slate-300 bg-white/90 text-slate-950 hover:bg-white`;

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

function scrollToSection(id) {
  if (typeof window === "undefined") return;
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function ImageBlock({ src, alt, className = "", style }) {
  return (
    <div className={`overflow-hidden bg-slate-200 ${className}`} style={style}>
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const items = [
    { label: "Home", value: "home" },
    { label: "Services", value: "services" },
    { label: "Pricing", value: "pricing" },
    { label: "Reviews", value: "reviews" },
    { label: "Contact", value: "contact" },
    { label: "Blog", value: "blog" },
  ];

  const handleClick = (value) => {
    setOpen(false);

    if (value === "blog") {
      setPage("blog");
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setPage("home");
    setTimeout(() => scrollToSection(value), 0);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => handleClick("home")} className="flex items-center gap-3" aria-label="Go to home section">
          <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white p-1 shadow-lg shadow-emerald-950/30">
            <img src={LOGO_SRC} alt="Corporate Cleaning Group logo" className="h-full w-full object-contain" />
          </div>
          <div className="text-left">
            <p className="text-base font-extrabold tracking-tight sm:text-lg">{BUSINESS.name}</p>
            <p className="hidden text-xs font-medium text-slate-300 sm:block">Clean spaces. Better business.</p>
          </div>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleClick(item.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${page === item.value ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={phoneHref} className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
            ☎ Call Now
          </a>
          <a href={`${whatsAppUrl}?text=${quoteMessage}`} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300">
            Get Free Quote
          </a>
        </div>

        <button type="button" className="rounded-xl p-2 text-2xl hover:bg-white/10 lg:hidden" onClick={() => setOpen((current) => !current)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {items.map((item) => (
              <button key={item.value} type="button" onClick={() => handleClick(item.value)} className="rounded-xl px-4 py-3 text-left font-semibold text-slate-200 hover:bg-white/10">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ setPage }) {
  const scrollY = useScrollY();

  const goToPricing = (event) => {
    event.preventDefault();
    setPage("home");
    setTimeout(() => scrollToSection("pricing"), 0);
  };

  return (
    <section id="home" className="relative isolate min-h-[92vh] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-20">
        <img
          src={photos.hero}
          alt="Modern clean office workspace"
          className="h-[115%] w-full object-cover opacity-45"
          style={{ transform: `translateY(${scrollY * 0.18}px) scale(1.08)` }}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.35),transparent_35%),linear-gradient(120deg,rgba(2,6,23,0.95),rgba(15,23,42,0.72),rgba(2,6,23,0.9))]" />
      <div className="absolute left-8 top-28 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl" style={{ transform: `translateY(${scrollY * 0.28}px)` }} />
      <div className="absolute bottom-16 right-8 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" style={{ transform: `translateY(${-scrollY * 0.16}px)` }} />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-100 shadow-2xl backdrop-blur">
            🛡️ Minimum booking clearly from $165
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl xl:text-7xl">
            Make your office look so clean clients trust you instantly.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            {BUSINESS.tagline} Professional office cleaning from $55/hr, or $65/hr when we bring our own chemicals and equipment. Book by phone, email, WhatsApp or the message form.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`${whatsAppUrl}?text=${quoteMessage}`} target="_blank" rel="noreferrer" className={primaryButton}>
              Get Free Quote in 2 Minutes
            </a>
            <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToSection("contact"); }} className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20">
              Book by Phone, Email or Message
            </a>
            <a href="#pricing" onClick={goToPricing} className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20">
              View Pricing
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <p className="text-3xl font-black text-emerald-300">$55</p>
              <p className="text-xs font-semibold text-slate-300">Standard/hr</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <p className="text-3xl font-black text-emerald-300">$65</p>
              <p className="text-xs font-semibold text-slate-300">Premium/hr</p>
            </div>
            <div className="rounded-3xl bg-white p-5 text-slate-950 shadow-2xl">
              <p className="text-3xl font-black">$165</p>
              <p className="text-xs font-semibold text-slate-500">Minimum</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[34rem]" style={{ transform: `translateY(${-scrollY * 0.08}px)` }}>
          <ImageBlock src={photos.cleaner} alt="Professional cleaner preparing office cleaning" className="absolute right-0 top-0 h-80 w-[78%] rounded-[2.5rem] shadow-2xl ring-1 ring-white/20" />
          <ImageBlock src={photos.office} alt="Clean office meeting area" className="absolute bottom-0 left-0 h-72 w-[72%] rounded-[2.5rem] shadow-2xl ring-1 ring-white/20" />
          <div className="absolute left-10 top-48 max-w-xs rounded-[2rem] border border-white/20 bg-white/90 p-5 text-slate-950 shadow-2xl backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Included</p>
            <div className="mt-3 grid gap-2 text-sm font-bold">
              <span>✓ Desk & surface cleaning</span>
              <span>✓ Kitchen & bathroom refresh</span>
              <span>✓ Vacuuming & mopping</span>
              <span>✓ High-touch sanitising</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((signal) => (
            <div key={signal.title} className="flex items-start gap-3 rounded-3xl bg-white/10 p-4">
              <span className="text-2xl">{signal.icon}</span>
              <div>
                <p className="font-black text-white">{signal.title}</p>
                <p className="mt-1 text-sm leading-5 text-slate-300">{signal.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  const scrollY = useScrollY();

  return (
    <main>
      <Hero setPage={setPage} />

      <section id="services" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-emerald-100 blur-3xl" style={{ transform: `translateY(${-scrollY * 0.04}px)` }} />
        <div className="absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-cyan-100 blur-3xl" style={{ transform: `translateY(${scrollY * 0.03}px)` }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-bold uppercase tracking-[0.25em] text-emerald-600">Services Included</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">A cleaner, healthier and more professional workplace.</h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">Our service is designed for offices, corporate spaces, small businesses and shared commercial workplaces. Every clean focuses on presentation, hygiene and reliability.</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-3xl transition group-hover:bg-slate-950">{service.icon}</div>
                <h3 className="text-lg font-black text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-30" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <img src={photos.supplies} alt="Cleaning supplies" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-[0.25em] text-emerald-300">Why Choose Us</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Built for businesses that care about presentation.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Fully insured", "ABN registered", "Police checked staff", "Serving Brisbane businesses", "Clear hourly pricing", "Get free quote in 2 minutes"].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-5 font-bold backdrop-blur">✓ {item}</div>
            ))}
          </div>
        </div>
      </section>

            <section id="pricing" className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4 py-24 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.25em] text-emerald-600">Clear Pricing</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Simple hourly packages with a $165 minimum booking.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Choose the package that matches your cleaning needs and contact us directly to book.</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`h-full rounded-[2.3rem] p-8 shadow-2xl transition hover:-translate-y-2 ${pkg.highlight ? "bg-slate-950 text-white" : "bg-white text-slate-950 ring-1 ring-slate-200"}`}>
              {pkg.highlight && <div className="mb-5 inline-flex rounded-full bg-emerald-300 px-4 py-2 text-sm font-black text-slate-950">Most Professional Choice</div>}
              <h3 className="text-2xl font-black">{pkg.name}</h3>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-6xl font-black">{pkg.price}</span>
                <span className={`pb-2 text-lg font-bold ${pkg.highlight ? "text-slate-300" : "text-slate-500"}`}>{pkg.unit}</span>
              </div>
              <p className="mt-3 text-lg font-black text-emerald-500">{pkg.minimum}</p>
              <p className={`mt-5 leading-7 ${pkg.highlight ? "text-slate-300" : "text-slate-600"}`}>{pkg.description}</p>
              <div className="mt-8 grid gap-3">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="text-emerald-500">✓</span>
                    <span className="font-semibold">{feature}</span>
                  </div>
                ))}
              </div>
              <a href={`${whatsAppUrl}?text=${bookingMessage}`} target="_blank" rel="noreferrer" className={`${pkg.highlight ? primaryButton : darkButton} mt-8 w-full`}>
                Contact Us to Book
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-[0.25em] text-emerald-600">Reviews</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Designed to build trust before customers even call.</h2>
            </div>
            <div className="rounded-full bg-amber-50 px-5 py-3 text-2xl text-amber-400" aria-label="Five star rating">★★★★★</div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.name} className="h-full rounded-[2rem] bg-slate-50 p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 text-xl text-amber-400" aria-label="Five star rating">★★★★★</div>
                <p className="text-lg leading-8 text-slate-700">“{review.text}”</p>
                <div className="mt-6">
                  <p className="font-black text-slate-950">{review.name}</p>
                  <p className="text-sm font-semibold text-slate-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}

function ContactSection() {
  const scrollY = useScrollY();
  const [form, setForm] = useState({ name: "", contact: "", package: "Standard Office Clean - $55/hr", message: "" });

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent("Office Cleaning Enquiry");
    const body = encodeURIComponent(`Name: ${form.name}\nContact: ${form.contact}\nPackage: ${form.package}\nMessage: ${form.message}`);
    if (typeof window !== "undefined") {
      window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-20" style={{ transform: `translateY(${-scrollY * 0.03}px)` }}>
        <img src={photos.blog} alt="Premium office interior" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-slate-950/85" />
      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <div>
          <p className="font-bold uppercase tracking-[0.25em] text-emerald-300">Contact Us</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Ready to book your office cleaning?</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">Book by phone, email, WhatsApp, or send your preferred date and cleaning needs through the message form.</p>
          <a href={`${whatsAppUrl}?text=${quoteMessage}`} target="_blank" rel="noreferrer" className={`${primaryButton} mt-8`}>
            Get Free Quote in 2 Minutes
          </a>

          <div className="mt-8 grid gap-4">
            <a href={phoneHref} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-sm backdrop-blur">
              <span className="text-2xl text-emerald-300">☎</span>
              <div>
                <p className="font-black">Phone</p>
                <p className="text-slate-300">{BUSINESS.phone}</p>
              </div>
            </a>
            <a href={`mailto:${BUSINESS.email}?subject=${emailBookingSubject}&body=${emailBookingBody}`} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-sm backdrop-blur">
              <span className="text-2xl text-emerald-300">✉</span>
              <div>
                <p className="font-black">Email</p>
                <p className="text-slate-300">{BUSINESS.email}</p>
              </div>
            </a>
            <a href={`${whatsAppUrl}?text=${cleaningMessage}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-sm backdrop-blur">
              <span className="text-2xl text-emerald-300">💬</span>
              <div>
                <p className="font-black">WhatsApp</p>
                <p className="text-slate-300">Click to chat live</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-sm backdrop-blur">
              <span className="text-2xl text-emerald-300">📍</span>
              <div>
                <p className="font-black">Location</p>
                <p className="text-slate-300">{BUSINESS.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl sm:p-8">
            <h3 className="text-2xl font-black">Book or send a message</h3>
            <form className="mt-6 grid gap-4" onSubmit={submitForm}>
              <input value={form.name} onChange={(event) => updateField("name", event.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 outline-none focus:border-emerald-500" placeholder="Your name" />
              <input value={form.contact} onChange={(event) => updateField("contact", event.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 outline-none focus:border-emerald-500" placeholder="Phone or email" />
              <select value={form.package} onChange={(event) => updateField("package", event.target.value)} className="rounded-2xl border border-slate-200 px-4 py-4 outline-none focus:border-emerald-500">
                <option>Standard Office Clean - $55/hr</option>
                <option>Premium Office Clean - $65/hr including chemicals and equipment</option>
                <option>Not sure yet</option>
              </select>
              <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} className="min-h-32 rounded-2xl border border-slate-200 px-4 py-4 outline-none focus:border-emerald-500" placeholder="Tell us your preferred date and cleaning needs" />
              <button type="submit" className={darkButton}>➤ Send Booking Enquiry</button>
            </form>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-white/20">
            <iframe title="Business location map" src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&output=embed`} className="h-80 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPage() {
  const scrollY = useScrollY();
  const [posts, setPosts] = useState(initialPosts);
  const totalLikes = useMemo(() => posts.reduce((sum, post) => sum + post.likes, 0), [posts]);

  const reactToPost = (id, type) => {
    setPosts((current) => current.map((post) => (post.id === id ? { ...post, [type]: post[type] + 1 } : post)));
  };

  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-30" style={{ transform: `translateY(${scrollY * 0.12}px) scale(1.05)` }}>
          <img src={photos.blog} alt="Office interior for cleaning blog" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="font-bold uppercase tracking-[0.25em] text-emerald-300">Cleaning Blog</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Daily cleaning updates, tips and service information.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">Helpful cleaning posts, service updates and workplace hygiene tips for Brisbane businesses.</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 font-bold backdrop-blur">👍 {totalLikes} total likes across posts</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
          <h2 className="text-3xl font-black text-slate-900">
            Latest Cleaning Updates & Tips
            </h2>
            <p className="mt-3 text-slate-600">
              Stay updated with our cleaning services, tips, and professional advice.
            </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <ImageBlock src={post.image} alt={post.title} className="h-56 w-full" />
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-emerald-700">{post.category}</span>
                  <span className="text-sm font-semibold text-slate-500">{post.date}</span>
                </div>
                <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">{post.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{post.excerpt}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button type="button" className={outlineButton} onClick={() => reactToPost(post.id, "likes")}>👍 {post.likes}</button>
                  <button type="button" className={outlineButton} onClick={() => reactToPost(post.id, "dislikes")}>👎 {post.dislikes}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function WhatsAppPopup() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(22rem,calc(100vw-2rem))] rounded-[2rem] bg-white p-5 shadow-2xl ring-1 ring-slate-200">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-xl text-emerald-700">💬</div>
            <div>
              <h3 className="font-black text-slate-950">Need office cleaning?</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">Chat on WhatsApp, or use phone, email and the message form to book.</p>
            </div>
          </div>
          <a href={`${whatsAppUrl}?text=${cleaningMessage}`} target="_blank" rel="noreferrer" className={`${darkButton} mt-4 w-full`}>Start WhatsApp Chat</a>
        </div>
      )}
      <button type="button" onClick={() => setOpen((current) => !current)} className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-3xl text-slate-950 shadow-2xl shadow-emerald-900/30 transition hover:scale-105 hover:bg-emerald-400" aria-label="Open WhatsApp chat popup" aria-expanded={open}>
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}

function Footer({ setPage }) {
  const goHome = () => {
    setPage("home");
    setTimeout(() => scrollToSection("home"), 0);
  };

  const goBlog = () => {
    setPage("blog");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white p-1">
              <img src={LOGO_SRC} alt="Corporate Cleaning Group logo" className="h-full w-full object-contain" />
            </div>
            <p className="text-xl font-black">{BUSINESS.name}</p>
          </div>
          <p className="mt-2 text-sm text-slate-400">Professional office cleaning with clear pricing from $165 minimum booking.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={goHome} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20">Home</button>
          <button type="button" onClick={goBlog} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20">Blog</button>
          <a href={`mailto:${BUSINESS.email}`} className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400">Email Us</a>
        </div>
      </div>
    </footer>
  );
}

function CorporateCleaningGroupWebsite() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar page={page} setPage={setPage} />
      {page === "home" ? <HomePage setPage={setPage} /> : <BlogPage />}
      <Footer setPage={setPage} />
      <WhatsAppPopup />
    </div>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <CorporateCleaningGroupWebsite />
    </React.StrictMode>
  );
}

export default CorporateCleaningGroupWebsite;
