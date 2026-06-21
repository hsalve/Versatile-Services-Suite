import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const statCards = stats ? [
    { label: "Total Employees", value: stats.totalEmployees, sub: `${stats.activeEmployees} active`, color: "text-blue-600" },
    { label: "Last Payroll Total", value: formatINR(stats.lastPayrollTotal), sub: "Net salary paid", color: "text-green-600" },
    { label: "Payroll Runs", value: stats.totalPayrollRuns, sub: "All time", color: "text-purple-600" },
    { label: "Pending Inquiries", value: stats.pendingContacts + stats.pendingQuotes + stats.pendingApplications, sub: `${stats.pendingApplications} applications, ${stats.pendingQuotes} quotes`, color: "text-orange-600" },
  ] : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of Versatile Services HR & Payroll</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats ? statCards.map(c => (
          <Card key={c.label}>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
              <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
            </CardContent>
          </Card>
        )) : Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}><CardContent className="pt-6"><div className="h-20 bg-muted animate-pulse rounded" /></CardContent></Card>
        ))}
      </div>

      {/* Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Employees by Department</CardTitle></CardHeader>
          <CardContent>
            {depts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No data yet</p>
            ) : (
              <div className="space-y-3">
                {depts.map(d => {
                  const total = depts.reduce((acc, x) => acc + x.count, 0);
                  const pct = total > 0 ? Math.round((d.count / total) * 100) : 0;
                  return (
                    <div key={d.department}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{d.department}</span>
                        <span className="text-muted-foreground">{d.count} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Add New Employee", href: "/admin/employees", icon: "👤" },
              { label: "Create Payroll Run", href: "/admin/payroll", icon: "💰" },
              { label: "View Inquiries", href: "/admin/inquiries", icon: "📧" },
              { label: "Review Applications", href: "/admin/applications", icon: "📋" },
              { label: "Manage Salary Structures", href: "/admin/salary-structures", icon: "📊" },
            ].map(a => (
              <a key={a.label} href={a.href}
                className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
                <span className="text-lg">{a.icon}</span>
                {a.label}
                <span className="ml-auto text-muted-foreground">→</span>
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
