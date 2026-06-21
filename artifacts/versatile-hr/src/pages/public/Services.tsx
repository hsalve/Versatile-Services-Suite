import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    id: "human-resources",
    title: "Human Resources & Staffing",
    icon: "👥",
    shortDesc: "Skilled and unskilled labor, management staffing, and HR solutions",
    description: "Versatile offers a spectrum of services including Recruitment Solutions, Staffing Solutions, Professional Staffing, Recruitment Process Outsourcing, and Executive Search. We provide skilled labor, unskilled labor, management, housekeeping, and security staffing.",
    offerings: ["Recruitment Solutions", "Staffing Solutions", "Professional Staffing", "Recruitment Process Outsourcing", "Executive Search", "Skilled Labor Placement", "Unskilled Labor Placement", "Security Staffing"],
  },
  {
    id: "housekeeping",
    title: "Housekeeping Services",
    icon: "🏢",
    shortDesc: "Professional facility maintenance for offices and industrial sheds",
    description: "Our wide range of housekeeping services, which include maintenance of offices and industrial sheds, are tailored to the requirements of industries. We use a methodical technique to make the workplace tidy and clean.",
    offerings: ["Office Housekeeping", "Industrial Shed Maintenance", "Yearly Contract Services", "Employee Seminars", "Hygiene Management", "Methodical Cleaning Techniques"],
  },
  {
    id: "transport",
    title: "Transport & Logistics",
    icon: "🚛",
    shortDesc: "Domestic and international transport services for industries across Pune",
    description: "Backed by our team of expert professionals, we are a prominent service provider of Domestic Transport Services. We ensure that the products reach the destination without any damage and within stipulated time period. Our sister firm Transport Company renders services to 30+ companies in Pune.",
    offerings: ["Domestic Transport Services", "International Logistics", "Pharmaceutical Transport", "Steel & Textile Transport", "Cargo Handling", "Ticketing & Visa Services"],
  },
  {
    id: "green-environment",
    title: "Green Environment Services",
    icon: "🌿",
    shortDesc: "Landscaping, gardening, and green environment management",
    description: "Our services offer landscaping for gardens and assist contractors in offering sufficient plantation knowledge to have a well-maintained garden. We offer skilled gardening staff who are knowledgeable about preparing the landscape for gardening.",
    offerings: ["Landscaping Design", "Garden Maintenance", "Skilled Gardening Staff", "Water Treatment", "Pesticide Control", "Plantation Advisory"],
  },
  {
    id: "food-canteen",
    title: "Food & Canteen Services",
    icon: "🍽️",
    shortDesc: "Hygienic canteen management with vegetarian and healthy meal options",
    description: "We provide complete food and canteen management services ensuring hygiene, nutritional balance, and employee satisfaction. Our services include vegetarian meals, healthy diet options, and full canteen management.",
    offerings: ["Canteen Management", "Vegetarian Meal Plans", "Healthy Diet Options", "Hygiene Standards", "Staff Catering", "Corporate Meal Services"],
  },
];

export default function Services() {
  const params = useParams<{ id?: string }>();
  const serviceId = params?.id;

  if (serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) {
      return (
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <Link href="/services"><Button>Back to Services</Button></Link>
        </div>
      );
    }
    return (
      <div className="flex flex-col">
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link href="/services" className="text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6 inline-block">&larr; All Services</Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl">{service.shortDesc}</p>
          </div>
        </section>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-6">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">{service.description}</p>
                <Link href="/request-quote">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Request a Quote</Button>
                </Link>
              </div>
              <div>
                <Card>
                  <CardHeader><CardTitle className="text-lg">What We Offer</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.offerings.map(o => (
                        <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-accent font-bold mt-0.5">&#10003;</span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Comprehensive facility management solutions tailored to your organization's unique needs
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-shadow border hover:border-accent/30">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.shortDesc}</p>
                  <ul className="space-y-1 mb-6">
                    {service.offerings.slice(0, 3).map(o => (
                      <li key={o} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.id}`}>
                    <Button variant="outline" size="sm" className="w-full group-hover:border-accent group-hover:text-accent transition-colors">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent/5 border-y">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-8">Tell us your requirements and we'll tailor a package for your business</p>
          <div className="flex gap-4 justify-center">
            <Link href="/request-quote"><Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Request a Quote</Button></Link>
            <Link href="/contact"><Button size="lg" variant="outline">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
