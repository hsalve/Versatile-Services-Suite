import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Human Resources & Staffing",
  "Housekeeping Services",
  "Transport & Logistics",
  "Green Environment Services",
  "Food & Canteen Services",
  "Multiple Services",
];

type QuoteForm = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  service: string;
  requirements: string;
};

export default function RequestQuote() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteForm>();

  const onSubmit = async (data: QuoteForm) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Quote request submitted!", description: "Our team will contact you within 1-2 business days." });
      reset();
    } catch {
      toast({ title: "Failed to submit", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Request a Quote</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Fill in the form below and our team will prepare a customized proposal for your organization's needs.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Tell Us About Your Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Company Name *</label>
                    <Input {...register("companyName", { required: true })} placeholder="Your company name" />
                    {errors.companyName && <p className="text-xs text-destructive">Required</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Contact Person *</label>
                    <Input {...register("contactName", { required: true })} placeholder="Your name" />
                    {errors.contactName && <p className="text-xs text-destructive">Required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email *</label>
                    <Input type="email" {...register("email", { required: true })} placeholder="work@company.com" />
                    {errors.email && <p className="text-xs text-destructive">Required</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone</label>
                    <Input {...register("phone")} placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Service Required *</label>
                  <select {...register("service", { required: true })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <option value="">Select a service...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <p className="text-xs text-destructive">Please select a service</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Requirements & Details</label>
                  <Textarea {...register("requirements")} placeholder="Describe your requirements, workforce size, locations, timeline..." rows={5} />
                </div>
                <Button type="submit" size="lg" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {submitting ? "Submitting..." : "Submit Quote Request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: "⚡", label: "Fast Response", desc: "Within 24 hours" },
              { icon: "📋", label: "Custom Proposals", desc: "Tailored to your needs" },
              { icon: "🤝", label: "No Obligation", desc: "Free consultation" },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-lg border bg-muted/30">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-semibold text-sm text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
