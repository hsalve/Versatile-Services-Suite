import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: number; employeeCode: string; firstName: string; lastName: string;
  email: string; phone: string | null; department: string; designation: string;
  status: string; joinDate: string;
}

interface SalaryStructure {
  id: number; name: string; basicSalary: number; grossSalary: number; netSalary: number;
}

export default function EmployeeProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [emp, setEmp] = useState<Employee | null>(null);
  const [ss, setSs] = useState<SalaryStructure | null>(null);
  const token = localStorage.getItem("versatile_token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!user?.employeeId) return;
    fetch(`/api/employees/${user.employeeId}`, { headers })
      .then(r => r.json()).then(data => {
        setEmp(data);
        if (data.salaryStructureId) {
          fetch(`/api/salary-structures/${data.salaryStructureId}`, { headers })
            .then(r => r.json()).then(setSs).catch(() => {});
        }
      })
      .catch(() => toast({ title: "Failed to load profile", variant: "destructive" }));
  }, [user]);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  if (!emp) {
    return <div className="p-8 text-center text-muted-foreground">Loading your profile...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Your employee information</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-xl">{emp.firstName} {emp.lastName}</CardTitle>
              <p className="text-muted-foreground text-sm">{emp.designation} · {emp.department}</p>
              <p className="text-xs font-mono text-muted-foreground mt-1">{emp.employeeCode}</p>
            </div>
            <div className="ml-auto">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${emp.status === "active" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>
                {emp.status}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Full Name", value: `${emp.firstName} ${emp.lastName}` },
              { label: "Email", value: emp.email },
              { label: "Phone", value: emp.phone || "—" },
              { label: "Join Date", value: emp.joinDate },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Work Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Employee Code", value: emp.employeeCode },
              { label: "Department", value: emp.department },
              { label: "Designation", value: emp.designation },
              { label: "Status", value: emp.status },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
                <span className="text-sm font-medium capitalize">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {ss && (
        <Card>
          <CardHeader><CardTitle>Salary Information</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Basic Salary</p>
                <p className="text-xl font-bold text-foreground">{formatINR(ss.basicSalary)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Gross Salary</p>
                <p className="text-xl font-bold text-primary">{formatINR(ss.grossSalary)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Net Salary</p>
                <p className="text-xl font-bold text-green-700">{formatINR(ss.netSalary)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Structure: {ss.name}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
