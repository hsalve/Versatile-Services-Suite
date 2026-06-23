import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const openings = [
  { title: "Facility Supervisor", dept: "Operations", type: "Full Time", location: "Pune", icon: "🏭" },
  { title: "HR Executive", dept: "Human Resources", type: "Full Time", location: "Pune", icon: "👥" },
  { title: "Transport Coordinator", dept: "Logistics", type: "Full Time", location: "Pune", icon: "🚛" },
  { title: "Housekeeping Supervisor", dept: "Housekeeping", type: "Full Time", location: "Chakan, Pune", icon: "🏢" },
  { title: "Canteen Manager", dept: "Food Services", type: "Full Time", location: "Pune", icon: "🍽️" },
  { title: "Security Guard", dept: "Security", type: "Full Time", location: "Multiple Locations", icon: "🛡️" },
];

const perks = [
  { icon: "🚀", title: "Growth Opportunities", desc: "Fast-track your career with clear progression paths and learning support." },
  { icon: "🤝", title: "Supportive Culture", desc: "Collaborative, inclusive, and energetic workplace that values your input." },
  { icon: "🏆", title: "Merit-Based Rewards", desc: "Performance-driven recognition, incentives, and growth reviews." },
  { icon: "🏥", title: "Health Benefits", desc: "Group health insurance and wellness support for employees and family." },
];

type AppForm = {
  applicantName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  experience: string;
  coverLetter: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Careers() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AppForm>();

  const applyFor = (title: string, dept: string) => {
    setSelectedRole(title);
    setValue("position", title);
    setValue("department", dept);
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: AppForm) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Application submitted!", description: "We'll review your application and reach out if there's a match." });
      reset();
      setSelectedRole("");
      setSubmitted(true);
    } catch {
      toast({ title: "Failed to submit", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2347 0%, #1a3a6b 60%, #1e4480 100%)", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.06]" style={{ background: "#e8630a" }} />
        <div className="relative container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider"
            style={{ background: "rgba(232,99,10,0.18)", color: "#f4a259", border: "1px solid rgba(232,99,10,0.3)" }}>
            We're Hiring
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Join Our Team
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg" style={{ color: "rgba(255,255,255,0.72)" }}>
            Be part of a committed, energetic team that's transforming facility management across Pune.
          </motion.p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#e8630a" }}>Why Join Us</p>
            <h2 className="text-3xl font-bold" style={{ color: "#1a3a6b" }}>Life at Versatile Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {perks.map((p, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-6 rounded-2xl text-center"
                style={{ border: "1.5px solid #e4e8f0", background: "white" }}>
                <span className="text-4xl block mb-4">{p.icon}</span>
                <h4 className="font-bold text-sm mb-2" style={{ color: "#1a3a6b" }}>{p.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7a9c" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section style={{ background: "#f4f7fb" }} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#e8630a" }}>Open Positions</p>
            <h2 className="text-3xl font-bold" style={{ color: "#1a3a6b" }}>Current Openings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {openings.map((job, i) => (
              <motion.div key={job.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex items-start justify-between gap-4 p-5 rounded-2xl bg-white"
                style={{ border: "1.5px solid #e4e8f0", boxShadow: "0 2px 6px rgba(26,58,107,0.04)" }}>
                <div className="flex gap-4 items-start">
                  <span className="text-2xl mt-0.5">{job.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm mb-0.5" style={{ color: "#1a3a6b" }}>{job.title}</h3>
                    <p className="text-xs mb-2" style={{ color: "#6b7a9c" }}>{job.dept} · {job.location}</p>
                    <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                  </div>
                </div>
                <button
                  onClick={() => applyFor(job.title, job.dept)}
                  className="shrink-0 h-8 px-4 rounded-lg text-xs font-semibold transition-all hover:scale-[1.03]"
                  style={{ background: "#e8630a", color: "white" }}
                >
                  Apply
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "#e8630a" }}>Apply Now</p>
            <h2 className="text-3xl font-bold" style={{ color: "#1a3a6b" }}>
              {selectedRole ? `Apply for: ${selectedRole}` : "Submit Your Application"}
            </h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-2xl p-8" style={{ border: "1.5px solid #e4e8f0", boxShadow: "0 4px 20px rgba(26,58,107,0.06)" }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "#e8630a" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1a3a6b" }}>Application Submitted!</h3>
                <p className="text-sm" style={{ color: "#6b7a9c" }}>We'll review it and reach out if there's a match.</p>
                <button onClick={() => setSubmitted(false)} className="mt-5 text-sm font-semibold" style={{ color: "#e8630a" }}>
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Full Name *</label>
                    <Input {...register("applicantName", { required: true })} placeholder="Your name" className="h-11 rounded-xl" />
                    {errors.applicantName && <p className="text-xs text-destructive">Required</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Email *</label>
                    <Input type="email" {...register("email", { required: true })} placeholder="your@email.com" className="h-11 rounded-xl" />
                    {errors.email && <p className="text-xs text-destructive">Required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Phone</label>
                    <Input {...register("phone")} placeholder="+91 XXXXX XXXXX" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Position *</label>
                    <Input {...register("position", { required: true })} placeholder="Role applying for" className="h-11 rounded-xl" />
                    {errors.position && <p className="text-xs text-destructive">Required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Department</label>
                    <Input {...register("department")} placeholder="Department" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Experience</label>
                    <Input {...register("experience")} placeholder="e.g. 3 years" className="h-11 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Cover Letter / About You</label>
                  <Textarea {...register("coverLetter")} placeholder="Tell us about yourself and why you'd like to join Versatile Services..." rows={4} className="rounded-xl resize-none" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full h-12 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01] disabled:opacity-60"
                  style={{ background: submitting ? "#6b7a9c" : "#e8630a", boxShadow: submitting ? "none" : "0 4px 14px rgba(232,99,10,0.35)" }}>
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
