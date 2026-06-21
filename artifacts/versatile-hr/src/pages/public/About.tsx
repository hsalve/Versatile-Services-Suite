import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  { title: "Customer Satisfaction", description: "Everything we do is driven by our commitment to exceeding client expectations at every touchpoint." },
  { title: "Utmost Convenience", description: "We streamline operations so our clients can focus on what they do best, while we handle the rest." },
  { title: "Commitment Drives Culture", description: "Commitment is our strongest personality trait — to each other, our clients, and the industry." },
];

const factors = [
  { title: "Energetic & Enthusiastic", color: "bg-primary" },
  { title: "Committed to Commitments", color: "bg-accent" },
  { title: "Resourceful & Responsive", color: "bg-primary" },
  { title: "Reputation for Excellence", color: "bg-accent" },
  { title: "Customer Comfort", color: "bg-primary" },
];

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Versatile Services</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Founded with the intention of making a name in the local market by offering top-notch goods and services, with a primary focus on customer satisfaction.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Company Mission</p>
              <h2 className="text-3xl font-bold text-foreground mb-6">Everything We Do Is Motivated by Our Goal of Transforming Things</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Commitment is one of the strongest personality traits in our organization. We are dedicated to each other, our clients, our staff, and our industry. The best teams and their members all share the quality of commitment.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our business was founded with the intention of making a name for itself in the local market by offering top-notch goods and services. With a primary focus on customer pleasure, the organization wants to establish new standards for the sector.
              </p>
              <div className="flex gap-4">
                <Link href="/services">
                  <Button>Our Services</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {values.map((v) => (
                <Card key={v.title} className="border-l-4 border-l-accent">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                    <p className="text-muted-foreground text-sm">{v.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Factors */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Success Factors</h2>
            <p className="text-muted-foreground">The principles that drive our operations and define our character</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {factors.map((f) => (
              <div key={f.title} className={`${f.color} text-white px-8 py-4 rounded-lg font-semibold text-sm shadow-md`}>
                {f.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-primary-foreground/80 mb-8">Let's discuss how Versatile Services can support your business</p>
          <Link href="/request-quote">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Request a Quote</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
