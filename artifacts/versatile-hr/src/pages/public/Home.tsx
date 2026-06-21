import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Transforming Facility Management
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Versatile Services provides end-to-end facility management, human resources, and logistics solutions for companies across Pune.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-quote">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                Request a Quote
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive solutions tailored to your organization's unique needs, backed by our commitment-driven culture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Human Resources",
                desc: "Expert staffing, recruitment, and payroll management solutions to build your dream team.",
                link: "/services/human-resources",
                icon: "👥"
              },
              {
                title: "Housekeeping",
                desc: "Professional cleaning and maintenance services ensuring a pristine working environment.",
                link: "/services/housekeeping",
                icon: "✨"
              },
              {
                title: "Transport & Logistics",
                desc: "Reliable employee transportation and goods logistics serving 30+ companies in Pune.",
                link: "/services/transport",
                icon: "🚌"
              },
              {
                title: "Green Environment",
                desc: "Landscaping, gardening, and eco-friendly initiatives for sustainable corporate spaces.",
                link: "/services/green-environment",
                icon: "🌱"
              },
              {
                title: "Food & Canteen",
                desc: "Nutritious and hygienic catering services managed by culinary professionals.",
                link: "/services/food-canteen",
                icon: "🍽️"
              }
            ].map((service, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
                <Link href={service.link} className="text-primary font-medium hover:underline inline-flex items-center">
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to optimize your operations?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Partner with Versatile Services for seamless, reliable, and professional facility management.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}