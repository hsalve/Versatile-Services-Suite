import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type ContactForm = { name: string; email: string; phone: string; subject: string; message: string };

const contactDetails = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" /></svg>
    ),
    label: "Head Office",
    value: "MIDC Phase 2, Chakan, Pune\nMaharashtra, India",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.58a1 1 0 0 1-.25 1.01L6.62 10.79z" fill="currentColor" /></svg>
    ),
    label: "Phone",
    value: "+91 8390445534\n+91 7276245323",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" /></svg>
    ),
    label: "Email",
    value: "vfspl12@gmail.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 1 1-2 0v-.07A8.001 8.001 0 0 1 4.07 11H5a1 1 0 0 1 0 2H4.07A8.001 8.001 0 0 1 11 4.07V5a1 1 0 0 1 2 0v-.93A8.001 8.001 0 0 1 19.93 11H19a1 1 0 0 1 0-2h.93A8.001 8.001 0 0 1 13 16.93z" fill="currentColor" /></svg>
    ),
    label: "Business Hours",
    value: "Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      reset();
      setSubmitted(true);
    } catch {
      toast({ title: "Failed to send", description: "Please try again or call us directly.", variant: "destructive" });
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
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="text-lg" style={{ color: "rgba(255,255,255,0.72)" }}>
            We'd love to hear from you. Reach out for any queries or service requirements.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {/* Contact info sidebar */}
            <div className="space-y-4">
              {contactDetails.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-4 p-5 rounded-2xl"
                  style={{ border: "1.5px solid #e4e8f0", background: "#f8faff" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#1a3a6b", color: "white" }}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: "#1a3a6b" }}>{c.label}</p>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#6b7a9c" }}>{c.value}</p>
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp CTA */}
              <a href="https://wa.me/918390445534" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: "#25d366", color: "white" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                <div>
                  <p className="font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-xs opacity-80">+91 8390445534</p>
                </div>
              </a>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
                className="rounded-2xl p-8" style={{ border: "1.5px solid #e4e8f0", boxShadow: "0 4px 20px rgba(26,58,107,0.06)" }}>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "#e8630a" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "#1a3a6b" }}>Message Sent!</h3>
                    <p className="text-sm" style={{ color: "#6b7a9c" }}>We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-5 text-sm font-semibold" style={{ color: "#e8630a" }}>
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-6" style={{ color: "#1a3a6b" }}>Send Us a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Name *</label>
                          <Input {...register("name", { required: true })} placeholder="Your name"
                            className="h-11 rounded-xl" style={{ borderColor: errors.name ? "#ef4444" : "#e4e8f0" }} />
                          {errors.name && <p className="text-xs" style={{ color: "#ef4444" }}>Name is required</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Email *</label>
                          <Input type="email" {...register("email", { required: true })} placeholder="your@email.com"
                            className="h-11 rounded-xl" style={{ borderColor: errors.email ? "#ef4444" : "#e4e8f0" }} />
                          {errors.email && <p className="text-xs" style={{ color: "#ef4444" }}>Email is required</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Phone</label>
                          <Input {...register("phone")} placeholder="+91 XXXXX XXXXX" className="h-11 rounded-xl" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Subject</label>
                          <Input {...register("subject")} placeholder="How can we help?" className="h-11 rounded-xl" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>Message *</label>
                        <Textarea {...register("message", { required: true })} placeholder="Tell us about your requirements..." rows={5}
                          className="rounded-xl resize-none" style={{ borderColor: errors.message ? "#ef4444" : "#e4e8f0" }} />
                        {errors.message && <p className="text-xs" style={{ color: "#ef4444" }}>Message is required</p>}
                      </div>
                      <button type="submit" disabled={submitting}
                        className="w-full h-12 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.01] disabled:opacity-60"
                        style={{ background: submitting ? "#6b7a9c" : "#e8630a", boxShadow: submitting ? "none" : "0 4px 14px rgba(232,99,10,0.35)" }}>
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
