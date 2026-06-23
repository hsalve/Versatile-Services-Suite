import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/public/SectionHeader";
import {
  HRIllustration,
  HousekeepingIllustration,
  TransportIllustration,
  GreenIllustration,
  FoodIllustration,
} from "@/components/public/Illustrations";

const services = [
  {
    id: "human-resources",
    title: "Human Resources & Staffing",
    Illustration: HRIllustration,
    shortDesc: "Skilled and unskilled labor, management staffing, and HR solutions.",
    description: "Versatile offers a spectrum of services including Recruitment Solutions, Staffing Solutions, Professional Staffing, Recruitment Process Outsourcing, and Executive Search. We provide skilled labor, unskilled labor, management, housekeeping, and security staffing.",
    offerings: ["Recruitment Solutions", "Staffing Solutions", "Professional Staffing", "Recruitment Process Outsourcing", "Executive Search", "Skilled Labor Placement", "Unskilled Labor Placement", "Security Staffing"],
    benefits: ["Faster hiring cycles", "Background-verified candidates", "Dedicated HR account manager", "Compliance-ready documentation"],
    process: ["Requirement gathering", "Candidate sourcing & screening", "Interview & selection support", "Onboarding & compliance", "Ongoing performance tracking"],
  },
  {
    id: "housekeeping",
    title: "Housekeeping Services",
    Illustration: HousekeepingIllustration,
    shortDesc: "Professional facility maintenance for offices and industrial sheds.",
    description: "Our wide range of housekeeping services, which include maintenance of offices and industrial sheds, are tailored to the requirements of industries. We use a methodical technique to make the workplace tidy and clean.",
    offerings: ["Office Housekeeping", "Industrial Shed Maintenance", "Yearly Contract Services", "Employee Seminars", "Hygiene Management", "Methodical Cleaning Techniques"],
    benefits: ["Hygiene audits included", "Trained & uniformed staff", "Eco-friendly cleaning agents", "Flexible scheduling"],
    process: ["Site assessment", "Custom cleaning plan", "Staff deployment & induction", "Daily quality checks", "Monthly hygiene audit report"],
  },
  {
    id: "transport",
    title: "Transport & Logistics",
    Illustration: TransportIllustration,
    shortDesc: "Domestic and international transport services for industries across Pune.",
    description: "Backed by our team of expert professionals, we are a prominent service provider of Domestic Transport Services. We ensure that the products reach the destination without any damage and within stipulated time period. Our sister firm Transport Company renders services to 30+ companies in Pune.",
    offerings: ["Domestic Transport Services", "International Logistics", "Pharmaceutical Transport", "Steel & Textile Transport", "Cargo Handling", "Ticketing & Visa Services"],
    benefits: ["GPS-tracked vehicles", "On-time delivery guarantee", "Specialized vehicle types", "Damage-free logistics"],
    process: ["Route planning & optimization", "Vehicle assignment", "Driver briefing & safety check", "Real-time tracking", "Proof of delivery & billing"],
  },
  {
    id: "green-environment",
    title: "Green Environment Services",
    Illustration: GreenIllustration,
    shortDesc: "Landscaping, gardening, and green environment management.",
    description: "Our services offer landscaping for gardens and assist contractors in offering sufficient plantation knowledge to have a well-maintained garden. We offer skilled gardening staff who are knowledgeable about preparing the landscape for gardening.",
    offerings: ["Landscaping Design", "Garden Maintenance", "Skilled Gardening Staff", "Water Treatment", "Pesticide Control", "Plantation Advisory"],
    benefits: ["Expert horticulture team", "Seasonal planning included", "Eco-friendly pesticides", "Corporate green compliance"],
    process: ["Site survey & design", "Plant selection & sourcing", "Installation & planting", "Regular maintenance visits", "Seasonal refresh planning"],
  },
  {
    id: "food-canteen",
    title: "Food & Canteen Services",
    Illustration: FoodIllustration,
    shortDesc: "Hygienic canteen management with vegetarian and healthy meal options.",
    description: "We provide complete food and canteen management services ensuring hygiene, nutritional balance, and employee satisfaction. Our services include vegetarian meals, healthy diet options, and full canteen management.",
    offerings: ["Canteen Management", "Vegetarian Meal Plans", "Healthy Diet Options", "Hygiene Standards", "Staff Catering", "Corporate Meal Services"],
    benefits: ["FSSAI-compliant kitchen", "Nutritionist-designed menus", "Zero-compromise hygiene", "Cost-effective bulk pricing"],
    process: ["Kitchen setup & standards audit", "Menu planning with client", "Trained culinary staff deployment", "Daily hygiene checklist", "Monthly satisfaction survey"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

function ServiceDetail({ service }: { service: typeof services[0] }) {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 60%, #1e4480 100%)", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.06]" style={{ background: "#e8630a" }} />
        <div className="relative container mx-auto px-4 max-w-4xl">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            All Services
          </Link>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <service.Illustration size={100} />
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">{service.title}</motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg" style={{ color: "rgba(255,255,255,0.72)" }}>{service.shortDesc}</motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* About + Offerings */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a3a6b" }}>About This Service</h2>
                <p className="leading-relaxed" style={{ color: "#6b7a9c" }}>{service.description}</p>
              </motion.div>

              {/* Key Benefits */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: "#1a3a6b" }}>Key Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "#f4f7fb", border: "1px solid #e4e8f0" }}>
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#e8630a" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className="text-sm font-medium" style={{ color: "#1a3a6b" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Process */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: "#1a3a6b" }}>Our Process</h3>
                <div className="space-y-3">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                        style={{ background: i % 2 === 0 ? "#1a3a6b" : "#e8630a" }}>
                        {i + 1}
                      </div>
                      <div className="h-px flex-1" style={{ background: "#e4e8f0" }} />
                      <span className="text-sm font-medium" style={{ color: "#4b5679" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 h-12 rounded-xl px-8 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
                style={{ background: "#e8630a", boxShadow: "0 4px 14px rgba(232,99,10,0.4)" }}
              >
                Request a Quote for This Service
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-2xl p-6" style={{ background: "#f4f7fb", border: "1.5px solid #e4e8f0" }}>
                <h4 className="font-bold text-base mb-4" style={{ color: "#1a3a6b" }}>What We Offer</h4>
                <ul className="space-y-2.5">
                  {service.offerings.map(o => (
                    <li key={o} className="flex items-start gap-2.5 text-sm" style={{ color: "#4b5679" }}>
                      <span className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold" style={{ background: "#e8630a", color: "white" }}>✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#1a3a6b" }}>
                <h4 className="font-bold text-base text-white mb-2">Need Custom Terms?</h4>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Tell us your requirements and we'll tailor a package for your business.</p>
                <Link href="/contact" className="w-full h-10 flex items-center justify-center rounded-xl text-sm font-semibold text-white border transition-colors hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section style={{ background: "#f4f7fb" }} className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Also from Versatile" title="Related Services" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-5xl mx-auto">
            {services.filter(s => s.id !== service.id).slice(0, 4).map((s, i) => (
              <motion.div key={s.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link href={`/services/${s.id}`}>
                  <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white transition-all hover:-translate-y-1"
                    style={{ border: "1.5px solid #e4e8f0", boxShadow: "0 2px 6px rgba(26,58,107,0.04)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1a3a6b"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(26,58,107,0.12)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e4e8f0"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 6px rgba(26,58,107,0.04)"; }}>
                    <s.Illustration size={64} />
                    <p className="font-semibold text-sm mt-3" style={{ color: "#1a3a6b" }}>{s.title}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Services() {
  const params = useParams<{ id?: string }>();
  const serviceId = params?.id;

  if (serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) {
      return (
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#1a3a6b" }}>Service Not Found</h1>
          <Link href="/services"
            className="h-10 inline-flex items-center justify-center rounded-xl px-6 text-sm font-semibold text-white"
            style={{ background: "#1a3a6b" }}>
            Back to Services
          </Link>
        </div>
      );
    }
    return <ServiceDetail service={service} />;
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 60%, #1e4480 100%)", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.06]" style={{ background: "#e8630a" }} />
        <div className="relative container mx-auto px-4 max-w-3xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#f4a259" }}>
            What We Offer
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Our Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg" style={{ color: "rgba(255,255,255,0.72)" }}>
            Comprehensive facility management solutions tailored to your organization's unique needs — all under one roof.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <motion.div key={service.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}>
                <Link href={`/services/${service.id}`}>
                  <div
                    className="group flex flex-col h-full rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 bg-white"
                    style={{ border: "1.5px solid #e4e8f0", boxShadow: "0 2px 8px rgba(26,58,107,0.04)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(26,58,107,0.13)"; (e.currentTarget as HTMLElement).style.borderColor = "#1a3a6b"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(26,58,107,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "#e4e8f0"; }}
                  >
                    <service.Illustration size={90} />
                    <h3 className="text-base font-bold mt-5 mb-2" style={{ color: "#1a3a6b" }}>{service.title}</h3>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#6b7a9c" }}>{service.shortDesc}</p>
                    <ul className="space-y-1 mb-5">
                      {service.offerings.slice(0, 3).map(o => (
                        <li key={o} className="flex items-center gap-2 text-xs" style={{ color: "#6b7a9c" }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#e8630a" }} />
                          {o}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#e8630a" }}>
                      Learn More
                      <svg className="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#f4f7fb", borderTop: "1px solid #e4e8f0" }}>
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#1a3a6b" }}>Need a Custom Solution?</h2>
          <p className="text-sm mb-7" style={{ color: "#6b7a9c" }}>Tell us your requirements and we'll tailor a bundled package for your business.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/request-quote"
              className="h-11 inline-flex items-center justify-center rounded-xl px-7 text-sm font-semibold text-white"
              style={{ background: "#e8630a", boxShadow: "0 4px 14px rgba(232,99,10,0.35)" }}>
              Request a Quote
            </Link>
            <Link href="/contact"
              className="h-11 inline-flex items-center justify-center rounded-xl px-7 text-sm font-semibold"
              style={{ border: "1.5px solid #1a3a6b", color: "#1a3a6b" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
