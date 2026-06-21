import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { VSLogo } from "@/components/VSLogo";

export function EmployeeLayout({ children }: { children: ReactNode }) {
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

  const navItems = [
    {
      href: "/employee",
      label: "My Profile",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      href: "/employee/payslips",
      label: "Payslips",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f0f4f9" }}>
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "#1a3a6b",
          boxShadow: "0 2px 12px rgba(26,58,107,0.25)",
        }}
      >
        <div className="container mx-auto px-4 h-[60px] flex items-center justify-between gap-4">
          {/* Logo + nav */}
          <div className="flex items-center gap-6">
            <Link href="/employee">
              <VSLogo light iconSize={30} />
            </Link>

            <nav className="hidden sm:flex items-center gap-1">
              {navItems.map((item) => {
                const active =
                  item.href === "/employee"
                    ? location === "/employee"
                    : location.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: active ? "rgba(255,255,255,0.15)" : "transparent",
                      color: active ? "white" : "rgba(255,255,255,0.70)",
                      borderBottom: active ? "2px solid #e8630a" : "2px solid transparent",
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-white">{user?.name}</span>
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                Employee Portal
              </span>
            </div>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: "#e8630a", color: "white" }}
            >
              {user?.name?.charAt(0) || "E"}
            </div>
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {logoutMutation.isPending ? "…" : "Logout"}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className="sm:hidden border-t flex"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          {navItems.map((item) => {
            const active =
              item.href === "/employee"
                ? location === "/employee"
                : location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all"
                style={{
                  color: active ? "white" : "rgba(255,255,255,0.60)",
                  borderBottom: active ? "2px solid #e8630a" : "2px solid transparent",
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto p-5 md:p-7 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
