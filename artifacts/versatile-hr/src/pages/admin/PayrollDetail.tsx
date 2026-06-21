import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PayrollRun {
  id: number; month: number; year: number; status: string;
  totalGross: number | null; totalNet: number | null; employeeCount: number | null;
  processedAt: string | null;
}

interface Payslip {
  id: number; employeeId: number; employeeName: string | null; employeeCode: string | null;
  department: string | null; grossSalary: number; netSalary: number; totalDeductions: number;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function AdminPayrollDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { toast } = useToast();
  const [run, setRun] = useState<PayrollRun | null>(null);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [processing, setProcessing] = useState(false);
  const token = localStorage.getItem("versatile_token");
  const headers: Record<string, string> = { Authorization: `Bearer ${token}` };

  const load = () => {
    if (!id) return;
    fetch(`/api/payroll-runs/${id}`, { headers }).then(r => r.json()).then(setRun).catch(() => {});
    fetch(`/api/payslips?payrollRunId=${id}`, { headers }).then(r => r.json()).then(setPayslips).catch(() => {});
  };

  useEffect(() => { load(); }, [id]);

  const handleProcess = async () => {
    if (!confirm("Process this payroll run?")) return;
    setProcessing(true);
    try {
      const res = await fetch(`/api/payroll-runs/${id}/process`, { method: "POST", headers: { ...headers, "Content-Type": "application/json" } });
      if (!res.ok) throw new Error();
      toast({ title: "Payroll processed!" });
      load();
    } catch { toast({ title: "Failed to process", variant: "destructive" }); }
    finally { setProcessing(false); }
  };

  const formatINR = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  if (!run) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/payroll"><Button variant="outline" size="sm">&larr; Back</Button></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{MONTHS[run.month - 1]} {run.year} Payroll</h1>
          <p className="text-muted-foreground text-sm">
            Status: <span className={`font-medium ${run.status === "completed" ? "text-green-600" : "text-muted-foreground"}`}>{run.status}</span>
            {run.processedAt && ` · Processed ${new Date(run.processedAt).toLocaleDateString()}`}
          </p>
        </div>
        {run.status === "draft" && (
          <Button onClick={handleProcess} disabled={processing} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {processing ? "Processing..." : "Process Payroll"}
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Employees</p><p className="text-3xl font-bold">{run.employeeCount ?? payslips.length}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Total Gross</p><p className="text-2xl font-bold">{run.totalGross != null ? formatINR(run.totalGross) : "—"}</p></CardContent></Card>
        <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Total Net Paid</p><p className="text-2xl font-bold text-green-700">{run.totalNet != null ? formatINR(run.totalNet) : "—"}</p></CardContent></Card>
      </div>

      {/* Payslips Table */}
      <Card>
        <CardHeader><CardTitle>Individual Payslips ({payslips.length})</CardTitle></CardHeader>
        <CardContent className="p-0">
          {payslips.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {run.status === "draft" ? "Process payroll to generate payslips." : "No payslips found."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Employee</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Department</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Gross</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Deductions</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Net Pay</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Action</th>
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
                      <td className="px-4 py-3 text-right">{formatINR(p.grossSalary)}</td>
                      <td className="px-4 py-3 text-right text-red-600">-{formatINR(p.totalDeductions)}</td>
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
