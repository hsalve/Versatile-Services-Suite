import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type ContactForm = { name: string; email: string; phone: string; subject: string; message: string };

export default function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
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
    } catch {
      toast({ title: "Failed to send", description: "Please try again or call us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-primary-foreground/80">We'd love to hear from you. Reach out for any queries or service requirements.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-base">Head Office</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>MIDC Phase 2, Chakan, Pune</p>
                  <p>Maharashtra, India</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Phone</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                  <p>+91 8390445534</p>
                  <p>+91 7276245323</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Email</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <a href="mailto:vfspl12@gmail.com" className="hover:text-foreground transition-colors">vfspl12@gmail.com</a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Business Hours</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                  <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Name *</label>
                        <Input {...register("name", { required: true })} placeholder="Your name" />
                        {errors.name && <p className="text-xs text-destructive">Name is required</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Email *</label>
                        <Input type="email" {...register("email", { required: true })} placeholder="your@email.com" />
                        {errors.email && <p className="text-xs text-destructive">Email is required</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Phone</label>
                        <Input {...register("phone")} placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Subject</label>
                        <Input {...register("subject")} placeholder="How can we help?" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Message *</label>
                      <Textarea {...register("message", { required: true })} placeholder="Tell us about your requirements..." rows={5} />
                      {errors.message && <p className="text-xs text-destructive">Message is required</p>}
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
