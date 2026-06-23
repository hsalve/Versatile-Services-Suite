import { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedCounter } from "@/components/public/AnimatedCounter";
import { SectionHeader } from "@/components/public/SectionHeader";
import {
  HeroIllustration,
  HRIllustration,
  HousekeepingIllustration,
  TransportIllustration,
  GreenIllustration,
  FoodIllustration,
} from "@/components/public/Illustrations";

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    title: "Human Resources & Staffing",
    desc: "End-to-end recruitment, payroll, and workforce management. We source, screen, and deploy the right talent — fast.",
    href: "/services/human-resources",
    Illustration: HRIllustration,
  },
  {
    title: "Housekeeping Services",
    desc: "Professional deep-cleaning, sanitation, and facility upkeep — delivering spotless, hygienic workspaces every day.",
    href: "/services/housekeeping",
    Illustration: HousekeepingIllustration,
  },
  {
    title: "Transport & Logistics",
    desc: "Reliable employee transportation and goods logistics — covering 30+ companies and hundreds of routes across Pune.",
    href: "/services/transport",
    Illustration: TransportIllustration,
  },
  {
    title: "Green Environment",
    desc: "Landscaping, horticulture, and eco-friendly corporate green spaces — helping organizations grow sustainably.",
    href: "/services/green-environment",
    Illustration: GreenIllustration,
  },
  {
    title: "Food & Canteen Services",
    desc: "Nutritious, hygienic, and cost-effective cafeteria management — run by culinary professionals for your team's well-being.",
    href: "/services/food-canteen",
    Illustration: FoodIllustration,
  },
];

const stats = [
  { value: "30+", label: "Corporate Clients" },
  { value: "500+", label: "Employees Deployed" },
  { value: "15+", label: "Years Experience" },
  { value: "5", label: "Service Lines" },
];

const howWeWork = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "We understand your facility needs, workforce size, and operational challenges in a no-obligation call.",
  },
  {
    step: "02",
    title: "Custom Proposal",
    desc: "Our team crafts a tailored service plan with transparent pricing, timelines, and SLAs — within 24 hours.",
  },
  {
    step: "03",
    title: "Seamless Onboarding",
    desc: "We deploy trained, verified professionals with zero disruption to your day-to-day operations.",
  },
  {
    step: "04",
    title: "Ongoing Excellence",
    desc: "Regular audits, dedicated account managers, and continuous quality improvement keep standards high.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Pharma Industries Ltd.",
    role: "Operations Manager",
    initial: "R",
    text: "Versatile Services has been our trusted facility management partner for over 3 years. Their housekeeping team maintains our production floor to the highest hygiene standards.",
  },
  {
    name: "Meera Sharma",
    company: "Steel Corp Pvt. Ltd.",
    role: "HR Director",
    initial: "M",
    text: "The HR staffing solutions from Versatile have helped us scale our workforce efficiently. Their commitment to quality candidates is unmatched in Pune.",
  },
  {
    name: "Arun Patil",
    company: "Textile Manufacturing Co.",
    role: "General Manager",
    initial: "A",
    text: "Their transport logistics team ensures our goods reach destinations safely and on time. We've been using their services across Pune with consistently great results.",
  },
];

const industries = [
  "Pharmaceuticals", "Steel Manufacturing", "Textile", "Food Processing",
  "IT & Technology", "Automotive", "Construction", "Healthcare",
  "Logistics", "FMCG", "Hospitality", "Education",
];

const faqs = [
  {
    q: "What industries do you serve?",
    a: "We serve 12+ industries including pharmaceuticals, steel, automotive, IT, FMCG, hospitality, and more — with 30+ active corporate clients across Pune and MIDC.",
  },
  {
    q: "How quickly can you deploy staff?",
    a: "For standard requirements, we can deploy background-verified personnel within 48–72 hours. For specialized roles, we provide a custom timeline during proposal.",
  },
  {
    q: "Do you offer long-term contracts?",
    a: "Yes. We offer monthly, quarterly, and annual contracts tailored to your operational needs, with dedicated account management included.",
  },
  {
    q: "Are your employees trained and verified?",
    a: "All our staff go through rigorous background verification, role-specific training, and induction before deployment. Regular audits ensure standards are maintained.",
  },
  {
    q: "Can you handle multiple service lines for one client?",
    a: "Absolutely — we specialize in bundled solutions. Many of our clients use 3–5 service lines under one contract, which simplifies management and reduces cost.",
  },
];

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="flex flex-col">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 55%, #1e4480 100%)",
          minHeight: "580px",
        }}
      >
        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.07]" style={{ background: "#e8630a" }} />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: "white" }} />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full opacity-40" style={{ background: "#e8630a" }} />
        <div className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full opacity-20" style={{ background: "white" }} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative container mx-auto px-4 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
                style={{ background: "rgba(232,99,10,0.18)", color: "#f4a259", border: "1px solid rgba(232,99,10,0.3)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Pune's Trusted Facility Management Partner
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-6 leading-[1.1]"
              >
                Your Vision,{" "}
                <span style={{ color: "#f4a259" }}>Our Best Service</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg mb-8 leading-relaxed max-w-lg"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                Versatile Services delivers end-to-end facility management, workforce solutions, and logistics across Pune — so you can focus on growing your business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 mb-10"
              >
                <Link
                  href="/request-quote"
                  className="h-12 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-95"
                  style={{ background: "#e8630a", boxShadow: "0 4px 20px rgba(232,99,10,0.5)" }}
                >
                  Get a Free Quote
                  <svg className="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="h-12 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold transition-all hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(255,255,255,0.3)", color: "white" }}
                >
                  Explore Services
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-5"
              >
                {[
                  { icon: "✓", text: "Background-verified staff" },
                  { icon: "✓", text: "24/7 support" },
                  { icon: "✓", text: "Flexible contracts" },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "rgba(232,99,10,0.3)", color: "#f4a259" }}>
                      {t.icon}
                    </span>
                    {t.text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — illustration */}
            <motion.div
              style={{ y: heroY }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="hidden lg:flex items-center justify-center"
            >
              <HeroIllustration className="w-full max-w-[480px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─────────────────────────────────────────────────── */}
      <div style={{ background: "#f4f7fb", borderBottom: "1px solid #e4e8f0" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center justify-center py-10 px-4 text-center border-r border-gray-200 last:border-0"
                style={{ borderColor: "rgba(228,232,240,0.8)" }}
              >
                <span className="text-4xl md:text-5xl font-bold" style={{ color: "#1a3a6b" }}>
                  <AnimatedCounter value={s.value} />
                </span>
                <span className="text-xs mt-2 font-semibold uppercase tracking-widest" style={{ color: "#6b7a9c" }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SERVICES ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="What We Do"
            title="Comprehensive Facility Solutions"
            subtitle="Five specialized service lines, one reliable partner. End-to-end solutions tailored to every aspect of your operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {services.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
              >
                <Link href={s.href}>
                  <div
                    className="group flex flex-col h-full rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
                    style={{
                      border: "1.5px solid #e4e8f0",
                      boxShadow: "0 2px 8px rgba(26,58,107,0.04)",
                      background: "white",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(26,58,107,0.13)";
                      (e.currentTarget as HTMLElement).style.borderColor = "#1a3a6b";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(26,58,107,0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor = "#e4e8f0";
                    }}
                  >
                    <s.Illustration size={88} />
                    <h3 className="text-base font-bold mt-5 mb-2" style={{ color: "#1a3a6b" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "#6b7a9c" }}>{s.desc}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#e8630a" }}>
                      Learn more
                      <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* View all card */}
            <motion.div
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <Link href="/services">
                <div
                  className="group flex flex-col items-center justify-center h-full rounded-2xl p-7 cursor-pointer transition-all duration-300 min-h-[240px]"
                  style={{
                    border: "2px dashed #dde3ef",
                    background: "#f8faff",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1a3a6b";
                    (e.currentTarget as HTMLElement).style.background = "#eef2ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#dde3ef";
                    (e.currentTarget as HTMLElement).style.background = "#f8faff";
                  }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "#e8630a", color: "white" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-bold text-base text-center" style={{ color: "#1a3a6b" }}>View All Services</p>
                  <p className="text-sm mt-1 text-center" style={{ color: "#6b7a9c" }}>Explore complete offerings</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── HOW WE WORK ─────────────────────────────────────────────────── */}
      <section style={{ background: "#f4f7fb" }} className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Our Process"
            title="How We Work"
            subtitle="A streamlined 4-step process designed to get you results with zero friction."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 relative">
            {/* Connector line — desktop only */}
            <div
              className="hidden lg:block absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 opacity-20"
              style={{ background: "#1a3a6b" }}
            />

            {howWeWork.map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex flex-col items-center justify-center mb-5 z-10 relative font-bold"
                  style={{
                    background: i % 2 === 0 ? "#1a3a6b" : "white",
                    color: i % 2 === 0 ? "white" : "#1a3a6b",
                    border: i % 2 !== 0 ? "2px solid #e4e8f0" : "none",
                    boxShadow: "0 4px 20px rgba(26,58,107,0.15)",
                  }}
                >
                  <span className="text-xs font-semibold opacity-60">{step.step}</span>
                  <span className="text-lg leading-none">→</span>
                </div>
                <h4 className="font-bold text-base mb-2" style={{ color: "#1a3a6b" }}>{step.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7a9c" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/request-quote"
              className="h-11 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
              style={{ background: "#e8630a", boxShadow: "0 4px 14px rgba(232,99,10,0.4)" }}
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#e8630a" }}>Why Versatile</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: "#1a3a6b" }}>
                Built on Trust &<br />Driven by Excellence
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#6b7a9c" }}>
                For over 15 years, Versatile Services has been the facility management backbone for Pune's leading industries. We don't just provide services — we become an extension of your operations team.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Commitment-Driven Culture", desc: "We treat every client's facility as our own, delivering consistent quality with a sense of ownership." },
                  { title: "Trained & Verified Professionals", desc: "Every employee goes through background checks, role training, and regular performance audits." },
                  { title: "One-Stop Solution", desc: "From staffing to canteen, transport to landscaping — all under one contract, one account manager." },
                  { title: "Transparent Pricing", desc: "No hidden costs. Custom proposals with clear SLAs before any commitment." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#e8630a" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-0.5" style={{ color: "#1a3a6b" }}>{item.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: "#6b7a9c" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — success factors grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: "⚡", label: "Fast Deployment", sub: "48-72 hrs" },
                { icon: "🛡️", label: "Verified Staff", sub: "100% screened" },
                { icon: "📊", label: "Regular Audits", sub: "Monthly reports" },
                { icon: "🤝", label: "Dedicated Manager", sub: "Always reachable" },
                { icon: "🔁", label: "Flexible Terms", sub: "Monthly to annual" },
                { icon: "🌱", label: "Eco-Friendly", sub: "Sustainable ops" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 flex flex-col items-start"
                  style={{
                    background: i % 3 === 0 ? "#1a3a6b" : i % 3 === 1 ? "#f4f7fb" : "white",
                    border: i % 3 !== 0 ? "1.5px solid #e4e8f0" : "none",
                    color: i % 3 === 0 ? "white" : "#1a3a6b",
                  }}
                >
                  <span className="text-2xl mb-3">{item.icon}</span>
                  <p className="font-bold text-sm">{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: i % 3 === 0 ? "rgba(255,255,255,0.65)" : "#6b7a9c" }}>{item.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ──────────────────────────────────────────────────── */}
      <section style={{ background: "#f4f7fb" }} className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Trusted Across Sectors"
            subtitle="From pharmaceuticals to automotive — we understand the unique needs of each industry."
          />
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {industries.map((industry, i) => (
              <motion.span
                key={industry}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="px-5 py-2.5 rounded-full text-sm font-semibold cursor-default transition-all hover:-translate-y-0.5"
                style={{
                  background: "white",
                  border: "1.5px solid #e4e8f0",
                  color: "#1a3a6b",
                  boxShadow: "0 2px 6px rgba(26,58,107,0.05)",
                }}
                whileHover={{ borderColor: "#e8630a", color: "#e8630a" }}
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Client Stories"
            title="What Our Clients Say"
            subtitle="Don't take our word for it — hear from the businesses that trust Versatile Services."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="rounded-2xl p-7 flex flex-col"
                style={{ border: "1.5px solid #e4e8f0", background: "white", boxShadow: "0 2px 8px rgba(26,58,107,0.04)" }}
              >
                {/* Quote mark */}
                <div className="text-5xl leading-none font-serif mb-4" style={{ color: "#e8630a", opacity: 0.4 }}>"</div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#4b5679" }}>{t.text}</p>
                <div className="mt-6 pt-5 border-t flex items-center gap-3" style={{ borderColor: "#f0f2f8" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: "#1a3a6b" }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1a3a6b" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#6b7a9c" }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#f4f7fb" }} className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before getting started."
          />

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl overflow-hidden"
                style={{ border: "1.5px solid #e4e8f0", background: "white" }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm" style={{ color: "#1a3a6b" }}>{faq.q}</span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: openFaq === i ? "#e8630a" : "#eef2ff",
                      color: openFaq === i ? "white" : "#1a3a6b",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "#6b7a9c" }}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #e8630a 0%, #c9540a 100%)" }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-[0.08]" style={{ background: "white" }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[0.06]" style={{ background: "white" }} />

        <div className="relative container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to optimize your operations?
            </h2>
            <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.82)" }}>
              Partner with Versatile Services for seamless, reliable, and professional facility management across Pune. Get a tailored proposal within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="h-12 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold text-[#e8630a] bg-white transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
              >
                Contact Us Today
              </Link>
              <Link
                href="/request-quote"
                className="h-12 inline-flex items-center justify-center rounded-xl px-8 text-sm font-semibold text-white transition-all hover:bg-white/10 w-full sm:w-auto"
                style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
