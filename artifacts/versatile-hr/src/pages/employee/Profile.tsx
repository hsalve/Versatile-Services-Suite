import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: number; employeeCode: string; firstName: string; lastName: string;
  email: string; phone: string | null; department: string; designation: string;
  status: string; joinDate: string;
}

interface SalaryStructure {
  id: number; name: string; basicSalary: number; grossSalary: number; netSalary: number;
}

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b last:border-0" style={{ borderColor: "#f0f4f9" }}>
      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#9ba5c0" }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: "#1a3a6b" }}>{value}</span>
    </div>
  );
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

  if (!emp) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3" style={{ color: "#9ba5c0" }}>
          <div className="w-10 h-10 rounded-full border-4 border-current border-t-transparent animate-spin opacity-40" />
          <p className="text-sm">Loading your profile…</p>
        </div>
      </div>
    );
  }

  const initials = `${emp.firstName.charAt(0)}${emp.lastName.charAt(0)}`;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#1a3a6b" }}>My Profile</h1>
        <p className="text-sm mt-0.5" style={{ color: "#6b7a9c" }}>Your employee information</p>
      </div>

      {/* Profile card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "white", boxShadow: "0 2px 16px rgba(26,58,107,0.08)", border: "1.5px solid #e8eef5" }}
      >
        <div
          className="h-20"
          style={{ background: "linear-gradient(135deg, #1a3a6b 0%, #0f2347 100%)" }}
        />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white ring-4 ring-white"
              style={{ background: "#e8630a", boxShadow: "0 4px 16px rgba(232,99,10,0.4)" }}
            >
              {initials}
            </div>
            <div className="pb-2 flex-1 min-w-0">
              <h2 className="text-lg font-bold truncate" style={{ color: "#1a3a6b" }}>
                {emp.firstName} {emp.lastName}
              </h2>
              <p className="text-sm" style={{ color: "#6b7a9c" }}>
                {emp.designation} · {emp.department}
              </p>
            </div>
            <div className="pb-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: emp.status === "active" ? "#dcfce7" : "#f0f4f9",
                  color: emp.status === "active" ? "#16a34a" : "#6b7a9c",
                }}
              >
                {emp.status}
              </span>
            </div>
          </div>
          <p
            className="text-xs font-mono px-2.5 py-1 rounded-lg inline-block"
            style={{ background: "#f0f4f9", color: "#6b7a9c" }}
          >
            {emp.employeeCode}
          </p>
        </div>
      </div>

      {/* Info sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className="rounded-2xl p-5"
          style={{ background: "white", boxShadow: "0 2px 10px rgba(26,58,107,0.06)", border: "1.5px solid #e8eef5" }}
        >
          <h3 className="font-bold text-sm mb-1" style={{ color: "#1a3a6b" }}>Personal Information</h3>
          <InfoRow label="Full Name" value={`${emp.firstName} ${emp.lastName}`} />
          <InfoRow label="Email" value={emp.email} />
          <InfoRow label="Phone" value={emp.phone || "—"} />
          <InfoRow label="Join Date" value={emp.joinDate} />
        </div>

        <div
          className="rounded-2xl p-5"
          style={{ background: "white", boxShadow: "0 2px 10px rgba(26,58,107,0.06)", border: "1.5px solid #e8eef5" }}
        >
          <h3 className="font-bold text-sm mb-1" style={{ color: "#1a3a6b" }}>Work Information</h3>
          <InfoRow label="Employee Code" value={emp.employeeCode} />
          <InfoRow label="Department" value={emp.department} />
          <InfoRow label="Designation" value={emp.designation} />
          <InfoRow label="Status" value={emp.status.charAt(0).toUpperCase() + emp.status.slice(1)} />
        </div>
      </div>

      {/* Salary */}
      {ss && (
        <div
          className="rounded-2xl p-6"
          style={{ background: "white", boxShadow: "0 2px 10px rgba(26,58,107,0.06)", border: "1.5px solid #e8eef5" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-sm" style={{ color: "#1a3a6b" }}>Salary Information</h3>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "#f0f4f9", color: "#6b7a9c" }}>
              {ss.name}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Basic Salary", value: formatINR(ss.basicSalary), bg: "#f0f4f9", color: "#1a3a6b" },
              { label: "Gross Salary", value: formatINR(ss.grossSalary), bg: "#eef2ff", color: "#4f46e5" },
              { label: "Net Salary", value: formatINR(ss.netSalary), bg: "#dcfce7", color: "#16a34a" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-4 text-center"
                style={{ background: s.bg }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#9ba5c0" }}>
                  {s.label}
                </p>
                <p className="text-base font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
