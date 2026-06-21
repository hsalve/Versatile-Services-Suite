import { Link } from "wouter";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-primary text-xl tracking-tight">VERSATILE SERVICES</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors">About Us</Link>
            <Link href="/services" className="text-foreground/80 hover:text-foreground transition-colors">Services</Link>
            <Link href="/clients" className="text-foreground/80 hover:text-foreground transition-colors">Clients</Link>
            <Link href="/careers" className="text-foreground/80 hover:text-foreground transition-colors">Careers</Link>
            <Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/request-quote" className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Request Quote
            </Link>
            <Link href="/login" className="text-sm font-medium text-primary hover:underline">
              Portal Login
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Versatile Services</h3>
            <p className="text-primary-foreground/80 text-sm">Transforming Facility Management</p>
            <div className="mt-4 text-sm text-primary-foreground/80 space-y-2">
              <p>MIDC Phase 2, Chakan, Pune</p>
              <p>8390445534 / 7276245323</p>
              <p>vfspl12@gmail.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/services/human-resources" className="hover:text-white transition-colors">Human Resources & Staffing</Link></li>
              <li><Link href="/services/housekeeping" className="hover:text-white transition-colors">Housekeeping Services</Link></li>
              <li><Link href="/services/transport" className="hover:text-white transition-colors">Transport & Logistics</Link></li>
              <li><Link href="/services/green-environment" className="hover:text-white transition-colors">Green Environment Creators</Link></li>
              <li><Link href="/services/food-canteen" className="hover:text-white transition-colors">Food & Canteen Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/clients" className="hover:text-white transition-colors">Our Clients</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Portal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/login" className="hover:text-white transition-colors">Employee Login</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} Versatile Services. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
