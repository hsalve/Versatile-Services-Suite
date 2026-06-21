import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  "Pharmaceuticals", "Steel Manufacturing", "Textile", "Food Processing",
  "IT & Technology", "Automotive", "Construction", "Hospitality",
  "Healthcare", "Education", "Logistics", "FMCG",
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "Pharma Industries Ltd.",
    role: "Operations Manager",
    text: "Versatile Services has been our trusted facility management partner for over 3 years. Their housekeeping team maintains our production floor to the highest hygiene standards.",
  },
  {
    name: "Meera Sharma",
    company: "Steel Corp Pvt. Ltd.",
    role: "HR Director",
    text: "The HR staffing solutions from Versatile have helped us scale our workforce efficiently. Their commitment to quality candidates is unmatched.",
  },
  {
    name: "Arun Patil",
    company: "Textile Manufacturing Co.",
    role: "General Manager",
    text: "Their transport logistics team ensures our goods reach destinations safely and on time. We've been using their services across Pune with great results.",
  },
];

export default function Clients() {
  return (
    <div className="flex flex-col">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Prestigious Associations</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Trusted by leading organizations across industries in Pune and beyond
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "30+", label: "Companies Served" },
              { value: "5+", label: "Years of Experience" },
              { value: "500+", label: "Employees Deployed" },
              { value: "5", label: "Service Verticals" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Industries We Serve</h2>
            <p className="text-muted-foreground">Our services span across multiple sectors</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <span key={industry} className="bg-background border border-border px-5 py-2 rounded-full text-sm font-medium text-foreground shadow-sm hover:border-accent hover:text-accent transition-colors cursor-default">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.name} className="border hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <blockquote className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                    "{t.text}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                    <p className="text-xs text-accent font-medium">{t.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Become Our Next Success Story</h2>
          <p className="text-primary-foreground/80 mb-8">Join the growing list of companies that trust Versatile Services</p>
          <Link href="/request-quote">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
