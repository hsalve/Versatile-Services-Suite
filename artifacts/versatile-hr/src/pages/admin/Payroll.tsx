import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface PayrollRun {
  id: number; month: number; year: number; status: string;
  totalGross: number | null; totalNet: number | null; employeeCount: number | null;
  processedAt: string | null; createdAt: string;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function AdminPayroll() {
  const { toast } = useToast();
  const [runs, setRuns] = useState<PayrollRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState<number | null>(null);
  const currentDate = new Date();
  const [form, setForm] = useState({ month: currentDate.getMonth() + 1, year: currentDate.getFullYear() });
  const token = localStorage.getItem("versatile_token");
  const headers: Record<string, string> = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const load = () => {
    setLoading(true);
    fetch("/api/payroll-runs", { headers })
      .then(r => r.json()).then(data => setRuns([...data].reverse()))
      .catch(() => toast({ title: "Failed to load payroll runs", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/payroll-runs", { method: "POST", headers, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast({ title: "Payroll run created" });
      setOpen(false); load();
    } catch { toast({ title: "Failed to create payroll run", variant: "destructive" }); }
  };

  const handleProcess = async (id: number) => {
    if (!confirm("Process this payroll run? This will generate payslips for all active employees.")) return;
    setProcessing(id);
    try {
      const res = await fetch(`/api/payroll-runs/${id}/process`, { method: "POST", headers });
      if (!res.ok) throw new Error();
      toast({ title: "Payroll processed successfully!" });
      load();
    } catch { toast({ title: "Failed to process payroll", variant: "destructive" }); }
    finally { setProcessing(null); }
  };

  const formatINR = (n: number | null) => n != null
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
    : "—";

  const statusBadge = (s: string) => {
    const cls = s === "completed" ? "bg-green-100 text-green-800" : s === "processing" ? "bg-yellow-100 text-yellow-800" : "bg-muted text-muted-foreground";
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{s}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payroll Runs</h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage monthly payroll processing</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button>+ New Payroll Run</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Payroll Run</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Month</label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    value={form.month} onChange={e => setForm(f => ({ ...f, month: parseInt(e.target.value) }))}>
                    {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Year</label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    value={form.year} onChange={e => setForm(f => ({ ...f, year: parseInt(e.target.value) }))}>
                    {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full">Create Run</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : runs.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No payroll runs yet. Create one to get started.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Period</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Employees</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Gross Total</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Net Total</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map(run => (
                    <tr key={run.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{MONTHS[run.month - 1]} {run.year}</td>
                      <td className="px-4 py-3">{statusBadge(run.status)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{run.employeeCount ?? "—"}</td>
                      <td className="px-4 py-3">{formatINR(run.totalGross)}</td>
                      <td className="px-4 py-3 font-semibold text-green-700">{formatINR(run.totalNet)}</td>
                      <td className="px-4 py-3 flex gap-2">
                        {run.status === "draft" && (
                          <Button size="sm" onClick={() => handleProcess(run.id)} disabled={processing === run.id} className="bg-accent text-accent-foreground hover:bg-accent/90">
                            {processing === run.id ? "Processing..." : "Process"}
                          </Button>
                        )}
                        <Link href={`/admin/payroll/${run.id}`}>
                          <Button size="sm" variant="outline">View</Button>
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
