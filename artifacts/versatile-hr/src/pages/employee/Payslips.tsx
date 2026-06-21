import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Payslip {
  id: number; month: number | null; year: number | null;
  basicSalary: number; grossSalary: number; totalDeductions: number; netSalary: number;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

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

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1a3a6b" }}>My Payslips</h1>
          <p className="text-sm mt-0.5" style={{ color: "#6b7a9c" }}>
            {payslips.length} payslip{payslips.length !== 1 ? "s" : ""} available
          </p>
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: "#eef2ff" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: "#1a3a6b" }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl animate-pulse" style={{ background: "white", border: "1.5px solid #e8eef5" }} />
          ))}
        </div>
      ) : payslips.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: "white", border: "1.5px solid #e8eef5" }}
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "#f0f4f9" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: "#9ba5c0" }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="font-semibold text-base mb-1" style={{ color: "#1a3a6b" }}>No payslips yet</p>
          <p className="text-sm" style={{ color: "#9ba5c0" }}>Your payslips will appear here once payroll is processed</p>
        </div>
      ) : (
        <div className="space-y-3">
          {payslips.map((p) => {
            const monthName = p.month ? MONTHS[p.month - 1] : "—";
            const monthShort = p.month ? MONTHS[p.month - 1].slice(0, 3).toUpperCase() : "—";
            return (
              <div
                key={p.id}
                className="rounded-2xl transition-all duration-200 hover:-translate-y-px"
                style={{
                  background: "white",
                  border: "1.5px solid #e8eef5",
                  boxShadow: "0 2px 8px rgba(26,58,107,0.04)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(26,58,107,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#1a3a6b";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(26,58,107,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#e8eef5";
                }}
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Month badge */}
                  <div
                    className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #1a3a6b, #0f2347)" }}
                  >
                    <span className="text-[11px] font-bold text-white">{monthShort}</span>
                    <span className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.60)" }}>{p.year}</span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ color: "#1a3a6b" }}>
                      {monthName} {p.year}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                      <span className="text-xs" style={{ color: "#9ba5c0" }}>
                        Gross: <span style={{ color: "#6b7a9c" }}>{formatINR(p.grossSalary)}</span>
                      </span>
                      <span className="text-xs" style={{ color: "#9ba5c0" }}>
                        Deductions: <span style={{ color: "#6b7a9c" }}>{formatINR(p.totalDeductions)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Net pay + action */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#9ba5c0" }}>Net Pay</p>
                      <p className="text-base font-bold" style={{ color: "#16a34a" }}>{formatINR(p.netSalary)}</p>
                    </div>
                    <Link href={`/employee/payslips/${p.id}/print`}>
                      <button
                        className="h-9 px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-[1.03] active:scale-95"
                        style={{ background: "#eef2ff", color: "#1a3a6b", border: "1.5px solid #d0d9f0" }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <polyline points="6 9 6 2 18 2 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="6" y="14" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        View / Print
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Net pay mobile */}
                <div
                  className="sm:hidden px-4 pb-4 flex items-center justify-between"
                  style={{ borderTop: "1px solid #f0f4f9", paddingTop: "10px" }}
                >
                  <span className="text-xs" style={{ color: "#9ba5c0" }}>Net Pay</span>
                  <span className="text-base font-bold" style={{ color: "#16a34a" }}>{formatINR(p.netSalary)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
