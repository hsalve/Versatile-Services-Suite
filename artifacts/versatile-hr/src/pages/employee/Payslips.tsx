import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Payslip {
  id: number; month: number | null; year: number | null;
  basicSalary: number; grossSalary: number; totalDeductions: number; netSalary: number;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function EmployeePayslips() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("versatile_token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!user?.employeeId) return;
    setLoading(true);
    fetch(`/api/employees/${user.employeeId}/payslips`, { headers })
      .then(r => r.json()).then(data => setPayslips([...data].reverse()))
      .catch(() => toast({ title: "Failed to load payslips", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [user]);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">My Payslips</h1>
        <p className="text-muted-foreground text-sm mt-1">{payslips.length} payslips available</p>
      </div>

      {loading ? (
        <Card><CardContent className="py-8 text-center text-muted-foreground">Loading...</CardContent></Card>
      ) : payslips.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-4xl mb-4">📄</p>
            <p className="font-medium text-foreground mb-2">No payslips yet</p>
            <p className="text-muted-foreground text-sm">Your payslips will appear here once payroll is processed</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {payslips.map(p => (
            <Card key={p.id} className="hover:shadow-md transition-shadow">
              <CardContent className="py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{p.month ? MONTHS[p.month - 1].slice(0, 3).toUpperCase() : "—"}</span>
                      <span className="text-xs text-muted-foreground">{p.year}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{p.month ? MONTHS[p.month - 1] : "—"} {p.year}</p>
                      <div className="flex gap-3 mt-0.5 text-xs text-muted-foreground">
                        <span>Gross: {formatINR(p.grossSalary)}</span>
                        <span>·</span>
                        <span>Deductions: {formatINR(p.totalDeductions)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Net Pay</p>
                      <p className="text-lg font-bold text-green-700">{formatINR(p.netSalary)}</p>
                    </div>
                    <Link href={`/employee/payslips/${p.id}/print`}>
                      <Button size="sm" variant="outline">
                        View / Print
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
