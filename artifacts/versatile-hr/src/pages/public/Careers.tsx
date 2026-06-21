import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const openings = [
  { title: "Facility Supervisor", dept: "Operations", type: "Full Time", location: "Pune" },
  { title: "HR Executive", dept: "Human Resources", type: "Full Time", location: "Pune" },
  { title: "Transport Coordinator", dept: "Logistics", type: "Full Time", location: "Pune" },
  { title: "Housekeeping Supervisor", dept: "Housekeeping", type: "Full Time", location: "Chakan, Pune" },
  { title: "Canteen Manager", dept: "Food Services", type: "Full Time", location: "Pune" },
  { title: "Security Guard", dept: "Security", type: "Full Time", location: "Multiple Locations" },
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

export default function Careers() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
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
    } catch {
      toast({ title: "Failed to submit", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Be part of a committed, energetic team that's transforming facility management in Pune
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🚀", title: "Growth Opportunities", desc: "Fast-track your career with us" },
              { icon: "🤝", title: "Team Culture", desc: "Collaborative, supportive workplace" },
              { icon: "🏆", title: "Merit Based", desc: "Performance-driven rewards" },
            ].map(item => (
              <div key={item.title} className="p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Current Openings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {openings.map((job) => (
              <Card key={job.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{job.dept} · {job.location}</p>
                    <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => applyFor(job.title, job.dept)}
                    className="flex-shrink-0 hover:border-accent hover:text-accent">
                    Apply
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>{selectedRole ? `Apply for: ${selectedRole}` : "Submit Your Application"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input {...register("applicantName", { required: true })} placeholder="Your name" />
                    {errors.applicantName && <p className="text-xs text-destructive">Required</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email *</label>
                    <Input type="email" {...register("email", { required: true })} placeholder="your@email.com" />
                    {errors.email && <p className="text-xs text-destructive">Required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone</label>
                    <Input {...register("phone")} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Position *</label>
                    <Input {...register("position", { required: true })} placeholder="Role you're applying for" />
                    {errors.position && <p className="text-xs text-destructive">Required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Department</label>
                    <Input {...register("department")} placeholder="Department" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Experience</label>
                    <Input {...register("experience")} placeholder="e.g. 3 years" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Cover Letter / About You</label>
                  <Textarea {...register("coverLetter")} placeholder="Tell us about yourself and why you'd like to join Versatile Services..." rows={4} />
                </div>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
