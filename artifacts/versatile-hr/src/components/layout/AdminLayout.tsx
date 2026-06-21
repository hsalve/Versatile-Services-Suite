import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { ReactNode } from "react";
import { VSLogo } from "@/components/VSLogo";

const navSections = [
  {
    label: null,
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
      },
      {
        href: "/admin/employees",
        label: "Employees",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: "/admin/salary-structures",
        label: "Salary Structures",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: "/admin/payroll",
        label: "Payroll Runs",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
          </svg>
        ),
      },
      {
        href: "/admin/payslips",
        label: "All Payslips",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
      },
    ],
  },
  {
    label: "Requests",
    items: [
      {
        href: "/admin/inquiries",
        label: "Inquiries",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: "/admin/quotes",
        label: "Quote Requests",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="9" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: "/admin/applications",
        label: "Applications",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
            <polyline points="16 2 12 6 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="6" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ),
      },
    ],
  },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        logout();
        setLocation("/login");
      },
      onError: () => {
        toast({ title: "Error logging out", variant: "destructive" });
      },
    });
  };

  const isActive = (href: string) =>
    href === "/admin" ? location === "/admin" : location.startsWith(href);

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: "#f0f4f9" }}>
      {/* ─── Sidebar ───────────────────────────────────────────────────── */}
      <aside
        className="w-full md:w-60 flex flex-col shrink-0"
        style={{ background: "#1a3a6b", minHeight: "100vh" }}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
          <Link href="/admin">
            <VSLogo light iconSize={32} />
          </Link>
          <p className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.45)", paddingLeft: "44px" }}>
            Admin Portal
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {navSections.map((section, si) => (
            <div key={si}>
              {section.label && (
                <p
                  className="px-3 text-[10px] font-bold uppercase tracking-widest mb-2"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: active ? "rgba(232,99,10,0.18)" : "transparent",
                        color: active ? "#f4a259" : "rgba(255,255,255,0.70)",
                        borderLeft: active ? "3px solid #e8630a" : "3px solid transparent",
                      }}
                    >
                      <span style={{ opacity: active ? 1 : 0.75 }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
          <div className="flex items-center gap-3 px-2 mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: "#e8630a", color: "white" }}
            >
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.45)" }}>
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.80)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {logoutMutation.isPending ? "Logging out…" : "Logout"}
          </button>
        </div>
      </aside>

      {/* ─── Main ──────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header
          className="h-14 flex items-center px-5 md:hidden border-b bg-white"
          style={{ borderColor: "#e4e8f0" }}
        >
          <VSLogo iconSize={28} />
        </header>

        <div className="flex-1 overflow-auto p-5 md:p-7 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
