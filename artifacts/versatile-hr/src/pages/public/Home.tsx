import { Link } from "wouter";

const services = [
  {
    title: "Human Resources & Staffing",
    desc: "End-to-end recruitment, payroll, and workforce management. We source, screen, and deploy the right talent — fast.",
    href: "/services/human-resources",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Housekeeping Services",
    desc: "Professional deep-cleaning, sanitation, and facility upkeep — delivering spotless, hygienic workspaces every day.",
    href: "/services/housekeeping",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Transport & Logistics",
    desc: "Reliable employee transportation and goods logistics — covering 30+ companies and hundreds of routes across Pune.",
    href: "/services/transport",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="3" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8h4l3 5v3h-7V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: "Green Environment",
    desc: "Landscaping, horticulture, and eco-friendly corporate green spaces — helping organizations grow sustainably.",
    href: "/services/green-environment",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.49a1 1 0 0 0 1.27 1.4L12 17l4.29 4.29a1 1 0 0 0 1.71-.71V15s3-3 3-7a8 8 0 0 0-3-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Food & Canteen Services",
    desc: "Nutritious, hygienic, and cost-effective cafeteria management — run by culinary professionals for your team's well-being.",
    href: "/services/food-canteen",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const stats = [
  { value: "30+", label: "Corporate Clients" },
  { value: "500+", label: "Employees Deployed" },
  { value: "15+", label: "Years Experience" },
  { value: "5", label: "Core Service Lines" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a3a6b 0%, #0f2347 60%, #1a3a6b 100%)",
          minHeight: "420px",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10"
          style={{ background: "#e8630a" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-5"
          style={{ background: "white" }}
        />

        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
            style={{ background: "rgba(232,99,10,0.18)", color: "#f4a259", border: "1px solid rgba(232,99,10,0.3)" }}
          >
            Pune's Trusted Facility Management Partner
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Your Vision,{" "}
            <span style={{ color: "#f4a259" }}>Our Best Service</span>
          </h1>

          <p className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            Versatile Services delivers end-to-end facility management, workforce solutions, and logistics — so you can focus on what matters most: growing your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/request-quote"
              className="h-12 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold text-white transition-all hover:scale-[1.04] active:scale-95 w-full sm:w-auto"
              style={{ background: "#e8630a", boxShadow: "0 4px 16px rgba(232,99,10,0.45)" }}
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="h-12 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold transition-all hover:bg-white/15 w-full sm:w-auto"
              style={{ border: "1.5px solid rgba(255,255,255,0.35)", color: "white" }}
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats strip ─────────────────────────────────────────────────── */}
      <div style={{ background: "#f4f7fb" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <span className="text-3xl font-bold" style={{ color: "#1a3a6b" }}>{s.value}</span>
                <span className="text-xs mt-1 font-medium uppercase tracking-wider" style={{ color: "#6b7a9c" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Services ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#e8630a" }}>What We Do</p>
            <h2 className="text-3xl font-bold" style={{ color: "#1a3a6b" }}>Comprehensive Facility Solutions</h2>
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "#6b7a9c" }}>
              Five specialized service lines, one reliable partner. Tailored solutions for every aspect of your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Link key={i} href={s.href}>
                <div
                  className="group flex flex-col h-full rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: "1.5px solid #e4e8f0",
                    boxShadow: "0 2px 8px rgba(26,58,107,0.04)",
                    background: "white",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 32px rgba(26,58,107,0.14)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#1a3a6b";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 2px 8px rgba(26,58,107,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#e4e8f0";
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors"
                    style={{ background: "#eef2ff", color: "#1a3a6b" }}
                  >
                    {s.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#1a3a6b" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#6b7a9c" }}>{s.desc}</p>
                  <div
                    className="mt-4 flex items-center gap-1 text-sm font-semibold"
                    style={{ color: "#e8630a" }}
                  >
                    Learn more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Us ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#f4f7fb" }} className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#e8630a" }}>Why Versatile</p>
            <h2 className="text-3xl font-bold" style={{ color: "#1a3a6b" }}>Built on Trust &amp; Excellence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Commitment-Driven",
                desc: "We treat every client's facility as our own — delivering consistent quality with a sense of ownership.",
                icon: "★",
              },
              {
                title: "Experienced Team",
                desc: "Trained, background-verified professionals across all service lines, with 15+ years of domain expertise.",
                icon: "◈",
              },
              {
                title: "One-Stop Solution",
                desc: "From staffing to canteen, transport to landscaping — all your facility needs under one roof.",
                icon: "◉",
              },
            ].map((w) => (
              <div
                key={w.title}
                className="rounded-2xl p-6 text-center"
                style={{ background: "white", border: "1.5px solid #e4e8f0" }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center text-xl font-bold mb-4"
                  style={{ background: "#1a3a6b", color: "#f4a259" }}
                >
                  {w.icon}
                </div>
                <h4 className="font-bold text-base mb-2" style={{ color: "#1a3a6b" }}>{w.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7a9c" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #e8630a 0%, #d45a08 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to optimize your operations?
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
            Partner with Versatile Services for seamless, reliable, and professional facility management across Pune.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="h-12 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold text-[#e8630a] bg-white transition-all hover:scale-[1.04] active:scale-95"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
            >
              Contact Us Today
            </Link>
            <Link
              href="/request-quote"
              className="h-12 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold text-white transition-all hover:bg-white/15"
              style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
