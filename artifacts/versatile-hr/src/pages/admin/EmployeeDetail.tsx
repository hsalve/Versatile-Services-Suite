import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: number; employeeCode: string; firstName: string; lastName: string;
  email: string; phone: string | null; department: string; designation: string;
  status: string; joinDate: string; salaryStructureId: number | null;
}
interface SalaryStructure { id: number; name: string; basicSalary: number; grossSalary: number; netSalary: number }
interface Payslip { id: number; month: number; year: number; netSalary: number; grossSalary: number }

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DEPTS = ["Operations","Human Resources","Logistics","Housekeeping","Food Services","Security","Administration","Finance"];
const STATUSES = ["active","inactive","terminated"];

export default function AdminEmployeeDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { toast } = useToast();
  const [emp, setEmp] = useState<Employee | null>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Partial<Employee>>({});
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [salaryStructures, setSalaryStructures] = useState<SalaryStructure[]>([]);
  const token = localStorage.getItem("versatile_token");
  const headers: Record<string, string> = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  useEffect(() => {
    if (!id) return;
    fetch(`/api/employees/${id}`, { headers }).then(r => r.json()).then(data => { setEmp(data); setForm(data); });
    fetch(`/api/employees/${id}/payslips`, { headers }).then(r => r.json()).then(setPayslips).catch(() => {});
    fetch(`/api/salary-structures`, { headers }).then(r => r.json()).then(setSalaryStructures).catch(() => {});
  }, [id]);

  const save = async () => {
    try {
      const res = await fetch(`/api/employees/${id}`, { method: "PATCH", headers, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setEmp(updated); setForm(updated); setEdit(false);
      toast({ title: "Employee updated" });
    } catch { toast({ title: "Failed to update", variant: "destructive" }); }
  };

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  if (!emp) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/employees"><Button variant="outline" size="sm">&larr; Back</Button></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{emp.firstName} {emp.lastName}</h1>
          <p className="text-muted-foreground text-sm">{emp.employeeCode} · {emp.designation}</p>
        </div>
        <Button onClick={() => edit ? save() : setEdit(true)} variant={edit ? "default" : "outline"}>
          {edit ? "Save Changes" : "Edit"}
        </Button>
        {edit && <Button variant="ghost" onClick={() => { setEdit(false); setForm(emp); }}>Cancel</Button>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Personal Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "phone" },
              ].map(({ label, key }) => (
                <div key={key} className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">{label}</label>
                  {edit
                    ? <Input value={(form as any)[key] || ""} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    : <p className="text-sm font-medium">{(emp as any)[key] || "—"}</p>}
                </div>
              ))}
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Department</label>
                {edit
                  ? <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={form.department || ""} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}>
                      {DEPTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  : <p className="text-sm font-medium">{emp.department}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                {edit
                  ? <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                      value={form.status || ""} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  : <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${emp.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{emp.status}</span>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                <p className="text-sm font-medium">{emp.joinDate}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Salary Structure</CardTitle></CardHeader>
            <CardContent>
              {edit ? (
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  value={form.salaryStructureId || ""} onChange={e => setForm(f => ({ ...f, salaryStructureId: e.target.value ? parseInt(e.target.value) : null }))}>
                  <option value="">No salary structure</option>
                  {salaryStructures.map(ss => <option key={ss.id} value={ss.id}>{ss.name} (₹{ss.grossSalary?.toLocaleString("en-IN")} gross)</option>)}
                </select>
              ) : emp.salaryStructureId ? (
                (() => {
                  const ss = salaryStructures.find(s => s.id === emp.salaryStructureId);
                  return ss ? (
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div><p className="text-muted-foreground">Structure</p><p className="font-medium">{ss.name}</p></div>
                      <div><p className="text-muted-foreground">Gross Salary</p><p className="font-medium">{formatINR(ss.grossSalary)}</p></div>
                      <div><p className="text-muted-foreground">Net Salary</p><p className="font-medium text-green-700">{formatINR(ss.netSalary)}</p></div>
                    </div>
                  ) : <p className="text-muted-foreground text-sm">Loading...</p>;
                })()
              ) : <p className="text-muted-foreground text-sm">No salary structure assigned</p>}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader><CardTitle>Recent Payslips</CardTitle></CardHeader>
            <CardContent>
              {payslips.length === 0 ? (
                <p className="text-muted-foreground text-sm">No payslips yet</p>
              ) : (
                <div className="space-y-3">
                  {payslips.slice(-6).reverse().map(p => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm">
                      <span className="font-medium">{MONTHS[(p.month || 1) - 1]} {p.year}</span>
                      <span className="text-green-700 font-semibold">{formatINR(p.netSalary)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
