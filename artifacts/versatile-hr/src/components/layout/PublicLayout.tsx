import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { VSLogo } from "@/components/VSLogo";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [location] = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/clients", label: "Clients" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location === href || location.startsWith(href + "/");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ─── Navbar ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,1)",
          boxShadow: scrolled ? "0 2px 20px rgba(26,58,107,0.10)" : "0 1px 0 #e8eaf0",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="container mx-auto px-4 h-[68px] flex items-center justify-between gap-4">
          <Link href="/">
            <VSLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-3.5 py-2 rounded-lg text-sm transition-colors"
                style={{
                  color: isActive(l.href) ? "#1a3a6b" : "#4b5679",
                  fontWeight: isActive(l.href) ? 700 : 500,
                  background: isActive(l.href) ? "#f0f4ff" : "transparent",
                }}
              >
                {l.label}
                {isActive(l.href) && (
                  <span
                    className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full"
                    style={{ background: "#e8630a" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/request-quote"
              className="h-9 inline-flex items-center justify-center rounded-lg px-5 text-sm font-semibold text-white transition-all hover:scale-[1.03] active:scale-95"
              style={{ background: "#e8630a", boxShadow: "0 2px 8px rgba(232,99,10,0.35)" }}
            >
              Request Quote
            </Link>
            <Link
              href="/login"
              className="h-9 inline-flex items-center justify-center rounded-lg px-4 text-sm font-semibold border transition-all hover:bg-[#1a3a6b] hover:text-white"
              style={{ borderColor: "#1a3a6b", color: "#1a3a6b" }}
            >
              Portal Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-[5px]">
              <span className="block h-0.5 rounded-full transition-all origin-center duration-300"
                style={{ background: "#1a3a6b", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "" }} />
              <span className="block h-0.5 rounded-full transition-all duration-300"
                style={{ background: "#1a3a6b", opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "" }} />
              <span className="block h-0.5 rounded-full transition-all origin-center duration-300"
                style={{ background: "#1a3a6b", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "" }} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden border-t bg-white overflow-hidden"
              style={{ borderColor: "#eef0f6" }}
            >
              <div className="px-4 pb-4 pt-2 space-y-1">
                {navLinks.map((l) => (
                  <Link key={l.href} href={l.href}
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      color: isActive(l.href) ? "#1a3a6b" : "#4b5679",
                      background: isActive(l.href) ? "#f0f4ff" : "transparent",
                      fontWeight: isActive(l.href) ? 600 : 500,
                    }}>
                    {l.label}
                  </Link>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <Link href="/request-quote"
                    className="h-11 flex items-center justify-center rounded-xl text-sm font-semibold text-white"
                    style={{ background: "#e8630a" }}>
                    Request Quote
                  </Link>
                  <Link href="/login"
                    className="h-11 flex items-center justify-center rounded-xl text-sm font-semibold border"
                    style={{ borderColor: "#1a3a6b", color: "#1a3a6b" }}>
                    Portal Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content with fade transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location}
          className="flex-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0f2347", color: "white" }}>
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <VSLogo light />
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>
                Your trusted partner for end-to-end facility management, staffing, and logistics across Pune and MIDC.
              </p>
              <div className="mt-5 space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                {[
                  { icon: "📍", text: "MIDC Phase 2, Chakan, Pune" },
                  { icon: "📞", text: "8390445534 / 7276245323" },
                  { icon: "✉️", text: "vfspl12@gmail.com" },
                ].map((c) => (
                  <div key={c.text} className="flex items-start gap-2.5">
                    <span className="shrink-0">{c.icon}</span>
                    <span>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: "#e8630a" }}>Services</h4>
              <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                {[
                  { label: "Human Resources & Staffing", href: "/services/human-resources" },
                  { label: "Housekeeping Services", href: "/services/housekeeping" },
                  { label: "Transport & Logistics", href: "/services/transport" },
                  { label: "Green Environment", href: "/services/green-environment" },
                  { label: "Food & Canteen Services", href: "/services/food-canteen" },
                ].map((s) => (
                  <li key={s.href}>
                    <Link href={s.href}
                      className="transition-colors hover:text-white"
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"}>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: "#e8630a" }}>Company</h4>
              <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Our Clients", href: "/clients" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Request a Quote", href: "/request-quote" },
                ].map((s) => (
                  <li key={s.href}>
                    <Link href={s.href}
                      className="transition-colors hover:text-white"
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"}>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portal */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: "#e8630a" }}>Portal Access</h4>
              <ul className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <li><Link href="/login" className="hover:text-white transition-colors">Employee Login</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Admin Login</Link></li>
              </ul>
              <div className="mt-6 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="font-semibold text-white text-sm mb-1">Need support?</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Contact us at vfspl12@gmail.com or call during business hours.
                </p>
              </div>

              {/* Social / WhatsApp */}
              <a href="https://wa.me/918390445534" target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: "#25d366" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t py-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>© {new Date().getFullYear()} Versatile Services Pvt. Ltd. All rights reserved.</span>
            <span>MIDC Phase 2, Chakan, Pune, Maharashtra</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/918390445534"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ background: "#25d366" }}
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

      {/* Back-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
            style={{ background: "#1a3a6b", color: "white" }}
            aria-label="Scroll to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
