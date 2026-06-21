import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SalaryStructure {
  id: number; name: string; basicSalary: number; hra: number; da: number; ta: number;
  otherAllowances: number; pfDeduction: number; taxDeduction: number; otherDeductions: number;
  grossSalary: number; netSalary: number;
}

type FormState = { name: string; basicSalary: string; hra: string; da: string; ta: string; otherAllowances: string; pfDeduction: string; taxDeduction: string; otherDeductions: string };
const emptyForm: FormState = { name: "", basicSalary: "", hra: "0", da: "0", ta: "0", otherAllowances: "0", pfDeduction: "0", taxDeduction: "0", otherDeductions: "0" };

export default function AdminSalaryStructures() {
  const { toast } = useToast();
  const [items, setItems] = useState<SalaryStructure[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("versatile_token");
  const headers: Record<string, string> = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const load = () => {
    setLoading(true);
    fetch("/api/salary-structures", { headers })
      .then(r => r.json()).then(setItems)
      .catch(() => toast({ title: "Failed to load", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const calc = (f: FormState) => {
    const gross = [f.basicSalary, f.hra, f.da, f.ta, f.otherAllowances].reduce((a, v) => a + (parseFloat(v) || 0), 0);
    const ded = [f.pfDeduction, f.taxDeduction, f.otherDeductions].reduce((a, v) => a + (parseFloat(v) || 0), 0);
    return { gross, net: gross - ded };
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, k === "name" ? v : parseFloat(v) || 0]));
      const res = await fetch("/api/salary-structures", { method: "POST", headers, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      toast({ title: "Salary structure created" });
      setOpen(false); setForm(emptyForm); load();
    } catch { toast({ title: "Failed to create", variant: "destructive" }); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this salary structure?")) return;
    await fetch(`/api/salary-structures/${id}`, { method: "DELETE", headers });
    toast({ title: "Deleted" }); load();
  };

  const formatINR = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const { gross, net } = calc(form);

  const fieldRow = (label: string, key: keyof FormState) => (
    <div className="space-y-1" key={key}>
      <label className="text-sm font-medium">{label}</label>
      <Input type="number" value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder="0" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Salary Structures</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage compensation packages for employees</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button>+ New Structure</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Create Salary Structure</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Structure Name *</label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. Operations Grade A" />
              </div>
              <div className="border rounded-lg p-4 space-y-3">
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Earnings (₹/month)</p>
                <div className="grid grid-cols-2 gap-3">
                  {fieldRow("Basic Salary *", "basicSalary")}
                  {fieldRow("HRA", "hra")}
                  {fieldRow("DA", "da")}
                  {fieldRow("TA", "ta")}
                  {fieldRow("Other Allowances", "otherAllowances")}
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-3">
                <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Deductions (₹/month)</p>
                <div className="grid grid-cols-2 gap-3">
                  {fieldRow("PF Deduction", "pfDeduction")}
                  {fieldRow("Tax Deduction", "taxDeduction")}
                  {fieldRow("Other Deductions", "otherDeductions")}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 flex justify-between text-sm">
                <span>Gross: <strong>{formatINR(gross)}</strong></span>
                <span>Net: <strong className="text-green-700">{formatINR(net)}</strong></span>
              </div>
              <Button type="submit" className="w-full">Create Structure</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3].map(i => <Card key={i}><CardContent className="pt-6"><div className="h-32 bg-muted animate-pulse rounded" /></CardContent></Card>)}
        </div>
      ) : items.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No salary structures yet. Create your first one.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(ss => (
            <Card key={ss.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{ss.name}</CardTitle>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(ss.id)}>Delete</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-medium">Earnings</p>
                    {[["Basic", ss.basicSalary], ["HRA", ss.hra], ["DA", ss.da], ["TA", ss.ta], ["Other Allow.", ss.otherAllowances]].map(([l, v]) => (
                      <div key={String(l)} className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{formatINR(Number(v))}</span></div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-medium">Deductions</p>
                    {[["PF", ss.pfDeduction], ["Tax", ss.taxDeduction], ["Other Ded.", ss.otherDeductions]].map(([l, v]) => (
                      <div key={String(l)} className="flex justify-between"><span className="text-muted-foreground">{l}</span><span className="text-red-600">-{formatINR(Number(v))}</span></div>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-3 flex justify-between text-sm font-semibold">
                  <span>Gross: {formatINR(ss.grossSalary)}</span>
                  <span className="text-green-700">Net: {formatINR(ss.netSalary)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
