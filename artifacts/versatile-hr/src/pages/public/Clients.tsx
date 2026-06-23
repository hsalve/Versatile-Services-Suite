import { Link } from "wouter";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/public/SectionHeader";
import { AnimatedCounter } from "@/components/public/AnimatedCounter";

const stats = [
  { value: "30+", label: "Companies Served", icon: "🏭" },
  { value: "15+", label: "Years of Experience", icon: "📅" },
  { value: "500+", label: "Employees Deployed", icon: "👥" },
  { value: "5", label: "Service Verticals", icon: "🔧" },
];

const industries = [
  { name: "Pharmaceuticals", icon: "💊" },
  { name: "Steel Manufacturing", icon: "⚙️" },
  { name: "Textile", icon: "🧵" },
  { name: "Food Processing", icon: "🏭" },
  { name: "IT & Technology", icon: "💻" },
  { name: "Automotive", icon: "🚗" },
  { name: "Construction", icon: "🏗️" },
  { name: "Hospitality", icon: "🏨" },
  { name: "Healthcare", icon: "🏥" },
  { name: "Education", icon: "🎓" },
  { name: "Logistics", icon: "🚛" },
  { name: "FMCG", icon: "🛒" },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Pharma Industries Ltd.",
    role: "Operations Manager",
    initial: "R",
    text: "Versatile Services has been our trusted facility management partner for over 3 years. Their housekeeping team maintains our production floor to the highest hygiene standards. We've never had a compliance issue since partnering with them.",
  },
  {
    name: "Meera Sharma",
    company: "Steel Corp Pvt. Ltd.",
    role: "HR Director",
    initial: "M",
    text: "The HR staffing solutions from Versatile have helped us scale our workforce efficiently. Their commitment to quality candidates is unmatched. They truly understand the nuances of skilled industrial staffing.",
  },
  {
    name: "Arun Patil",
    company: "Textile Manufacturing Co.",
    role: "General Manager",
    initial: "A",
    text: "Their transport logistics team ensures our goods reach destinations safely and on time. We've been using their services across Pune for over two years with consistently great results and zero delays.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Clients() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 60%, #1e4480 100%)", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.06]" style={{ background: "#e8630a" }} />
        <div className="relative container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
            style={{ background: "rgba(232,99,10,0.18)", color: "#f4a259", border: "1px solid rgba(232,99,10,0.3)" }}>
            Our Track Record
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Our Prestigious Associations
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg" style={{ color: "rgba(255,255,255,0.72)" }}>
            Trusted by leading organizations across industries in Pune and the MIDC corridor.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: "#f4f7fb", borderBottom: "1px solid #e4e8f0" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col items-center justify-center py-10 px-4 text-center border-r border-gray-200 last:border-0">
                <span className="text-3xl mb-2">{s.icon}</span>
                <span className="text-4xl font-bold" style={{ color: "#1a3a6b" }}>
                  <AnimatedCounter value={s.value} />
                </span>
                <span className="text-xs mt-1.5 font-semibold uppercase tracking-widest" style={{ color: "#6b7a9c" }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Sectors" title="Industries We Serve" subtitle="Our services are crafted for the operational demands of each unique industry." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {industries.map((industry, i) => (
              <motion.div key={industry.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col items-center text-center p-5 rounded-2xl cursor-default transition-all hover:-translate-y-1"
                style={{ background: "#f4f7fb", border: "1.5px solid #e4e8f0" }}
                whileHover={{ borderColor: "#1a3a6b", background: "#eef2ff" }}>
                <span className="text-3xl mb-3">{industry.icon}</span>
                <span className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: "#f4f7fb" }} className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Client Stories" title="What Our Clients Say" subtitle="Real feedback from the businesses that trust us every day." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-2xl p-7 flex flex-col bg-white"
                style={{ border: "1.5px solid #e4e8f0", boxShadow: "0 2px 8px rgba(26,58,107,0.04)" }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#e8630a"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#4b5679" }}>"{t.text}"</p>
                <div className="mt-6 pt-5 flex items-center gap-3" style={{ borderTop: "1px solid #f0f2f8" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: "#1a3a6b" }}>{t.initial}</div>
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

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #e8630a 0%, #c9540a 100%)" }}>
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-[0.07]" style={{ background: "white" }} />
        <div className="relative container mx-auto px-4 text-center max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Become Our Next Success Story</h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.82)" }}>Join the growing list of companies that trust Versatile Services.</p>
          <Link href="/request-quote"
            className="h-12 inline-flex items-center justify-center rounded-xl px-10 text-sm font-semibold text-[#e8630a] bg-white transition-all hover:scale-[1.03]"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
