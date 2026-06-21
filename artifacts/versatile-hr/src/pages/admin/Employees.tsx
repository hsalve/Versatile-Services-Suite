import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: number; employeeCode: string; firstName: string; lastName: string;
  email: string; phone: string | null; department: string; designation: string;
  status: string; joinDate: string;
}

const DEPARTMENTS = ["Operations", "Human Resources", "Logistics", "Housekeeping", "Food Services", "Security", "Administration", "Finance"];

export default function AdminEmployees() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", department: "", designation: "", joinDate: "" });
  const token = localStorage.getItem("versatile_token");
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (deptFilter) params.set("department", deptFilter);
    fetch(`/api/employees?${params}`, { headers })
      .then(r => r.json()).then(setEmployees)
      .catch(() => toast({ title: "Failed to load employees", variant: "destructive" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [search, deptFilter]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/employees", { method: "POST", headers, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast({ title: "Employee created successfully" });
      setOpen(false);
      setForm({ firstName: "", lastName: "", email: "", phone: "", department: "", designation: "", joinDate: "" });
      load();
    } catch {
      toast({ title: "Failed to create employee", variant: "destructive" });
    }
  };

  const statusColor = (s: string) => s === "active" ? "bg-green-100 text-green-800" : s === "inactive" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-muted-foreground text-sm mt-1">{employees.length} total employees</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>+ Add Employee</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add New Employee</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">First Name *</label>
                  <Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Last Name *</label>
                  <Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Email *</label>
                <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Phone</label>
                  <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Join Date *</label>
                  <Input type="date" value={form.joinDate} onChange={e => setForm(f => ({ ...f, joinDate: e.target.value }))} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Department *</label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                    value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} required>
                    <option value="">Select...</option>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Designation *</label>
                  <Input value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} required />
                </div>
              </div>
              <Button type="submit" className="w-full">Create Employee</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <Input className="max-w-xs" placeholder="Search name, email, code..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm min-w-[160px]"
          value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : employees.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No employees found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Code</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Department</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Designation</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Join Date</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, i) => (
                    <tr key={emp.id} className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{emp.employeeCode}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{emp.firstName} {emp.lastName}</div>
                        <div className="text-xs text-muted-foreground">{emp.email}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{emp.department}</td>
                      <td className="px-4 py-3 text-muted-foreground">{emp.designation}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(emp.status)}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{emp.joinDate}</td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/employees/${emp.id}`}>
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
