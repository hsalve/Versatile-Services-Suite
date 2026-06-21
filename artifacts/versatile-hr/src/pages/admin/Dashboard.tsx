import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Stats {
  totalEmployees: number;
  activeEmployees: number;
  totalPayrollRuns: number;
  pendingContacts: number;
  pendingApplications: number;
  pendingQuotes: number;
  lastPayrollTotal: number;
}

interface DeptBreakdown { department: string; count: number }

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

function StatCard({
  label, value, sub, icon, accent,
}: {
  label: string; value: string | number; sub: string;
  icon: React.ReactNode; accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex gap-4 items-start"
      style={{ background: "white", boxShadow: "0 2px 10px rgba(26,58,107,0.06)", border: "1.5px solid #e8eef5" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}18`, color: accent }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#6b7a9c" }}>{label}</p>
        <p className="text-2xl font-bold leading-tight" style={{ color: "#1a3a6b" }}>{value}</p>
        <p className="text-xs mt-0.5" style={{ color: "#9ba5c0" }}>{sub}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [stats, setStats] = useState<Stats | null>(null);
  const [depts, setDepts] = useState<DeptBreakdown[]>([]);
  const token = localStorage.getItem("versatile_token");

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch("/api/dashboard/stats", { headers })
      .then(r => r.json()).then(setStats)
      .catch(() => toast({ title: "Failed to load stats", variant: "destructive" }));
    fetch("/api/dashboard/department-breakdown", { headers })
      .then(r => r.json()).then(setDepts)
      .catch(() => {});
  }, [token]);

  const statCards = stats ? [
    {
      label: "Total Employees",
      value: stats.totalEmployees,
      sub: `${stats.activeEmployees} active`,
      accent: "#1a3a6b",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: "Last Payroll Total",
      value: formatINR(stats.lastPayrollTotal),
      sub: "Net salary paid",
      accent: "#16a34a",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: "Payroll Runs",
      value: stats.totalPayrollRuns,
      sub: "All time",
      accent: "#7c3aed",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      label: "Pending Requests",
      value: stats.pendingContacts + stats.pendingQuotes + stats.pendingApplications,
      sub: `${stats.pendingApplications} applications · ${stats.pendingQuotes} quotes`,
      accent: "#e8630a",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ] : [];

  const quickActions = [
    { label: "Add New Employee", href: "/admin/employees", color: "#1a3a6b",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="22" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { label: "Create Payroll Run", href: "/admin/payroll", color: "#16a34a",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M2 10h20" stroke="currentColor" strokeWidth="2"/></svg> },
    { label: "View Inquiries", href: "/admin/inquiries", color: "#7c3aed",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { label: "Review Applications", href: "/admin/applications", color: "#e8630a",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/><polyline points="16 2 12 6 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { label: "Salary Structures", href: "/admin/salary-structures", color: "#0891b2",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  ];

  return (
    <div className="space-y-7 max-w-6xl">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#1a3a6b" }}>Dashboard</h1>
        <p className="text-sm mt-0.5" style={{ color: "#6b7a9c" }}>
          Overview of Versatile Services HR &amp; Payroll
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats
          ? statCards.map((c) => (
              <StatCard key={c.label} label={c.label} value={c.value} sub={c.sub} icon={c.icon} accent={c.accent} />
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white p-5 h-[100px] animate-pulse" style={{ border: "1.5px solid #e8eef5" }}>
                <div className="h-4 rounded bg-gray-100 w-1/2 mb-3" />
                <div className="h-7 rounded bg-gray-100 w-2/3" />
              </div>
            ))}
      </div>

      {/* Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Department breakdown */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "white", boxShadow: "0 2px 10px rgba(26,58,107,0.06)", border: "1.5px solid #e8eef5" }}
        >
          <h3 className="font-bold text-base mb-5" style={{ color: "#1a3a6b" }}>Employees by Department</h3>
          {depts.length === 0 ? (
            <p className="text-sm text-center py-6" style={{ color: "#9ba5c0" }}>No data yet</p>
          ) : (
            <div className="space-y-4">
              {depts.map((d, i) => {
                const total = depts.reduce((acc, x) => acc + x.count, 0);
                const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
                const colors = ["#1a3a6b", "#e8630a", "#16a34a", "#7c3aed", "#0891b2", "#dc2626"];
                const color = colors[i % colors.length];
                return (
                  <div key={d.department}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium" style={{ color: "#1a3a6b" }}>{d.department}</span>
                      <span style={{ color: "#6b7a9c" }}>{d.count} <span className="text-xs">({pct}%)</span></span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f0f4f9" }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "white", boxShadow: "0 2px 10px rgba(26,58,107,0.06)", border: "1.5px solid #e8eef5" }}
        >
          <h3 className="font-bold text-base mb-5" style={{ color: "#1a3a6b" }}>Quick Actions</h3>
          <div className="space-y-2.5">
            {quickActions.map((a) => (
              <a
                key={a.label}
                href={a.href}
                className="flex items-center gap-3.5 p-3.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-px group"
                style={{ border: "1.5px solid #e8eef5", color: "#1a3a6b" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = a.color;
                  (e.currentTarget as HTMLElement).style.background = `${a.color}08`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e8eef5";
                  (e.currentTarget as HTMLElement).style.background = "";
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${a.color}14`, color: a.color }}
                >
                  {a.icon}
                </div>
                {a.label}
                <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "#9ba5c0" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
