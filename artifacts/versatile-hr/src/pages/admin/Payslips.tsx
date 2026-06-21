import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Payslip {
  id: number; employeeId: number; employeeName: string | null; employeeCode: string | null;
  department: string | null; month: number | null; year: number | null;
  grossSalary: number; totalDeductions: number; netSalary: number;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function AdminPayslips() {
  const { toast } = useToast();
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("versatile_token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    setLoading(true);
    fetch("/api/payslips", { headers })
      .then(r => r.json()).then(data => setPayslips([...data].reverse()))
      .catch(() => toast({ title: "Failed to load payslips", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  const formatINR = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Payslips</h1>
        <p className="text-muted-foreground text-sm mt-1">{payslips.length} payslips across all payroll runs</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : payslips.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No payslips yet. <Link href="/admin/payroll" className="text-primary underline">Create a payroll run</Link> first.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Employee</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Department</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Period</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Gross</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Net Pay</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payslips.map(p => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-medium">{p.employeeName}</div>
                        <div className="text-xs text-muted-foreground">{p.employeeCode}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{p.department}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.month ? MONTHS[p.month - 1] : "—"} {p.year}</td>
                      <td className="px-4 py-3 text-right">{formatINR(p.grossSalary)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-green-700">{formatINR(p.netSalary)}</td>
                      <td className="px-4 py-3">
                        <Link href={`/employee/payslips/${p.id}/print`}>
                          <Button size="sm" variant="outline">Print</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
