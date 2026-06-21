import { Router, type IRouter } from "express";
import { db, payslipsTable, employeesTable, payrollRunsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

async function enrichPayslip(p: typeof payslipsTable.$inferSelect) {
  const [emp] = await db.select().from(employeesTable).where(eq(employeesTable.id, p.employeeId));
  const [run] = await db.select().from(payrollRunsTable).where(eq(payrollRunsTable.id, p.payrollRunId));
  return {
    id: p.id,
    payrollRunId: p.payrollRunId,
    employeeId: p.employeeId,
    employeeName: emp ? `${emp.firstName} ${emp.lastName}` : null,
    employeeCode: emp?.employeeCode ?? null,
    department: emp?.department ?? null,
    designation: emp?.designation ?? null,
    month: run?.month ?? null,
    year: run?.year ?? null,
    basicSalary: parseFloat(p.basicSalary),
    hra: parseFloat(p.hra),
    da: parseFloat(p.da),
    ta: parseFloat(p.ta),
    otherAllowances: parseFloat(p.otherAllowances),
    grossSalary: parseFloat(p.grossSalary),
    pfDeduction: parseFloat(p.pfDeduction),
    taxDeduction: parseFloat(p.taxDeduction),
    otherDeductions: parseFloat(p.otherDeductions),
    totalDeductions: parseFloat(p.totalDeductions),
    netSalary: parseFloat(p.netSalary),
    createdAt: p.createdAt.toISOString(),
  };
}

router.get("/payslips", requireAuth, async (req, res) => {
  try {
    const { payrollRunId, employeeId } = req.query as Record<string, string>;
    let rows = await db.select().from(payslipsTable).orderBy(payslipsTable.createdAt);

    if (req.user?.role === "employee") {
      rows = rows.filter(p => p.employeeId === req.user!.employeeId);
    } else {
      if (payrollRunId) rows = rows.filter(p => p.payrollRunId === parseInt(payrollRunId));
      if (employeeId) rows = rows.filter(p => p.employeeId === parseInt(employeeId));
    }

    const enriched = await Promise.all(rows.map(enrichPayslip));
    res.json(enriched);
  } catch (err) {
    logger.error({ err }, "List payslips error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/payslips/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [p] = await db.select().from(payslipsTable).where(eq(payslipsTable.id, id));
    if (!p) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    if (req.user?.role === "employee" && p.employeeId !== req.user.employeeId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    res.json(await enrichPayslip(p));
  } catch (err) {
    logger.error({ err }, "Get payslip error");
    res.status(500).json({ error: "Internal server error" });
  }
});

// Employee payslips
router.get("/employees/:id/payslips", requireAuth, async (req, res) => {
  try {
    const empId = parseInt(req.params.id);
    if (req.user?.role === "employee" && req.user.employeeId !== empId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const rows = await db.select().from(payslipsTable).where(eq(payslipsTable.employeeId, empId));
    const enriched = await Promise.all(rows.map(enrichPayslip));
    res.json(enriched);
  } catch (err) {
    logger.error({ err }, "Get employee payslips error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
