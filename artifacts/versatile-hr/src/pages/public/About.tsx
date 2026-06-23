import { Link } from "wouter";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/public/SectionHeader";

const values = [
  {
    title: "Customer Satisfaction",
    desc: "Everything we do is driven by our commitment to exceeding client expectations at every touchpoint.",
    icon: "★",
    color: "#e8630a",
  },
  {
    title: "Utmost Convenience",
    desc: "We streamline operations so our clients can focus on what they do best, while we handle the rest.",
    icon: "◈",
    color: "#1a3a6b",
  },
  {
    title: "Commitment-Driven Culture",
    desc: "Commitment is our strongest personality trait — to each other, our clients, and the industry we serve.",
    icon: "◉",
    color: "#e8630a",
  },
];

const milestones = [
  { year: "2008", title: "Founded", desc: "Versatile Services established in MIDC, Chakan, Pune with a vision to transform local facility management." },
  { year: "2012", title: "Transport Wing", desc: "Launched Transport & Logistics division to serve manufacturing corridors across Pune." },
  { year: "2016", title: "30+ Clients", desc: "Reached milestone of 30 active corporate clients across pharma, steel, and textile sectors." },
  { year: "2020", title: "Digital Payroll", desc: "Integrated digital HR & payroll systems for transparent, efficient employee management." },
  { year: "2024", title: "500+ Deployed", desc: "Over 500 background-verified professionals deployed across Pune's leading industries." },
];

const successFactors = [
  "Energetic & Enthusiastic",
  "Committed to Commitments",
  "Resourceful & Responsive",
  "Reputation for Excellence",
  "Customer Comfort First",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 60%, #1e4480 100%)",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.06]" style={{ background: "#e8630a" }} />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
            style={{ background: "rgba(232,99,10,0.18)", color: "#f4a259", border: "1px solid rgba(232,99,10,0.3)" }}
          >
            Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
          >
            About Versatile Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Founded with the intention of making a name in Pune's facility management market — through top-notch services and an unwavering focus on customer satisfaction.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#e8630a" }}>Company Mission</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: "#1a3a6b" }}>
                Everything We Do Is Motivated by Transformation
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#6b7a9c" }}>
                Commitment is one of the strongest personality traits in our organization. We are dedicated to each other, our clients, our staff, and our industry. The best teams and their members all share the quality of commitment.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#6b7a9c" }}>
                Our business was founded with the intention of making a name for itself in the local market by offering top-notch goods and services. With a primary focus on customer satisfaction, the organization wants to establish new standards for the sector.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/services"
                  className="h-11 inline-flex items-center justify-center rounded-xl px-7 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
                  style={{ background: "#1a3a6b" }}
                >
                  Our Services
                </Link>
                <Link
                  href="/contact"
                  className="h-11 inline-flex items-center justify-center rounded-xl px-7 text-sm font-semibold transition-colors"
                  style={{ border: "1.5px solid #1a3a6b", color: "#1a3a6b" }}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ border: "1.5px solid #e4e8f0", background: "white" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                    style={{ background: v.color, color: "white" }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: "#1a3a6b" }}>{v.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#6b7a9c" }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "#f4f7fb" }} className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Our Journey" title="15+ Years of Excellence" subtitle="From a local startup to Pune's most trusted facility partner." />

          <div className="relative mt-14 max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 opacity-20" style={{ background: "#1a3a6b" }} />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative flex gap-6 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:gap-0`}
              >
                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-32px)] p-5 rounded-2xl ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                  style={{ background: "white", border: "1.5px solid #e4e8f0", boxShadow: "0 2px 8px rgba(26,58,107,0.05)" }}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#e8630a" }}>{m.year}</span>
                  <h4 className="font-bold text-base mt-1 mb-1.5" style={{ color: "#1a3a6b" }}>{m.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7a9c" }}>{m.desc}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-6 md:left-[calc(50%-10px)] top-5 w-5 h-5 rounded-full border-4 border-white z-10"
                  style={{ background: i % 2 === 0 ? "#1a3a6b" : "#e8630a", boxShadow: "0 0 0 2px " + (i % 2 === 0 ? "#1a3a6b" : "#e8630a") + "33" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Factors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Our DNA" title="Success Factors That Define Us" subtitle="The principles that drive our operations and define our character." />
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {successFactors.map((f, i) => (
              <motion.div
                key={f}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="px-6 py-3 rounded-full font-semibold text-sm"
                style={{
                  background: i % 2 === 0 ? "#1a3a6b" : "#e8630a",
                  color: "white",
                  boxShadow: `0 4px 14px ${i % 2 === 0 ? "rgba(26,58,107,0.25)" : "rgba(232,99,10,0.25)"}`,
                }}
              >
                {f}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #e8630a 0%, #c9540a 100%)" }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-[0.07]" style={{ background: "white" }} />
        <div className="relative container mx-auto px-4 text-center max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Work Together?</h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.82)" }}>Let's discuss how Versatile Services can support your business operations.</p>
          <Link
            href="/request-quote"
            className="h-12 inline-flex items-center justify-center rounded-xl px-10 text-sm font-semibold text-[#e8630a] bg-white transition-all hover:scale-[1.03]"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
