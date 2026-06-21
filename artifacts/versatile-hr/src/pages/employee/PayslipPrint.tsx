import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Payslip {
  id: number; employeeId: number; employeeName: string | null; employeeCode: string | null;
  department: string | null; designation: string | null; month: number | null; year: number | null;
  basicSalary: number; hra: number; da: number; ta: number; otherAllowances: number;
  grossSalary: number; pfDeduction: number; taxDeduction: number; otherDeductions: number;
  totalDeductions: number; netSalary: number;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function EmployeePayslipPrint() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { toast } = useToast();
  const [payslip, setPayslip] = useState<Payslip | null>(null);
  const token = localStorage.getItem("versatile_token");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/payslips/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setPayslip)
      .catch(() => toast({ title: "Failed to load payslip", variant: "destructive" }));
  }, [id]);

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  if (!payslip) return <div className="p-8 text-center text-muted-foreground">Loading payslip...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Screen actions */}
      <div className="print:hidden mb-6 flex gap-3">
        <Button variant="outline" onClick={() => history.back()}>← Back</Button>
        <Button onClick={() => window.print()}>🖨️ Print Payslip</Button>
      </div>

      {/* Payslip document */}
      <div id="payslip-doc" className="bg-white border rounded-xl overflow-hidden shadow-sm print:shadow-none print:border-0">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">VERSATILE SERVICES</h1>
              <p className="text-primary-foreground/70 text-sm mt-1">MIDC Phase 2, Chakan, Pune</p>
              <p className="text-primary-foreground/70 text-sm">8390445534 / 7276245323 · vfspl12@gmail.com</p>
            </div>
            <div className="text-right">
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="text-xs text-primary-foreground/70">PAYSLIP</p>
                <p className="text-lg font-bold">{payslip.month ? MONTHS[payslip.month - 1] : "—"} {payslip.year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Info */}
        <div className="bg-muted/30 border-b px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><p className="text-xs text-muted-foreground uppercase tracking-wider">Employee Name</p><p className="font-semibold mt-0.5">{payslip.employeeName}</p></div>
            <div><p className="text-xs text-muted-foreground uppercase tracking-wider">Employee Code</p><p className="font-semibold mt-0.5 font-mono">{payslip.employeeCode}</p></div>
            <div><p className="text-xs text-muted-foreground uppercase tracking-wider">Department</p><p className="font-semibold mt-0.5">{payslip.department}</p></div>
            <div><p className="text-xs text-muted-foreground uppercase tracking-wider">Designation</p><p className="font-semibold mt-0.5">{payslip.designation}</p></div>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3 pb-1 border-b">Earnings</h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Basic Salary", payslip.basicSalary],
                    ["House Rent Allowance (HRA)", payslip.hra],
                    ["Dearness Allowance (DA)", payslip.da],
                    ["Travel Allowance (TA)", payslip.ta],
                    ["Other Allowances", payslip.otherAllowances],
                  ].map(([label, value]) => (
                    <tr key={String(label)} className="border-b last:border-0">
                      <td className="py-2 text-muted-foreground">{label}</td>
                      <td className="py-2 text-right font-medium">{formatINR(Number(value))}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-primary/5">
                    <td className="py-2 px-1 font-bold">Gross Salary</td>
                    <td className="py-2 px-1 text-right font-bold text-primary">{formatINR(payslip.grossSalary)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Deductions */}
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3 pb-1 border-b">Deductions</h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Provident Fund (PF)", payslip.pfDeduction],
                    ["Income Tax (TDS)", payslip.taxDeduction],
                    ["Other Deductions", payslip.otherDeductions],
                  ].map(([label, value]) => (
                    <tr key={String(label)} className="border-b last:border-0">
                      <td className="py-2 text-muted-foreground">{label}</td>
                      <td className="py-2 text-right font-medium text-red-600">{formatINR(Number(value))}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-red-50">
                    <td className="py-2 px-1 font-bold">Total Deductions</td>
                    <td className="py-2 px-1 text-right font-bold text-red-600">{formatINR(payslip.totalDeductions)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Net Pay */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Net Pay (Take Home)</p>
              <p className="text-3xl font-bold text-green-700 mt-1">{formatINR(payslip.netSalary)}</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Period: {payslip.month ? MONTHS[payslip.month - 1] : "—"} {payslip.year}</p>
              <p className="mt-1">Payslip #{String(payslip.id).padStart(6, "0")}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-6 text-center">
            This is a computer-generated payslip. No signature required. · Versatile Services Pvt. Ltd.
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #payslip-doc, #payslip-doc * { visibility: visible; }
          #payslip-doc { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
