import { Router, type IRouter } from "express";
import { db, payrollRunsTable, payslipsTable, employeesTable, salaryStructuresTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function formatRun(r: typeof payrollRunsTable.$inferSelect) {
  return {
    id: r.id,
    month: r.month,
    year: r.year,
    status: r.status,
    totalGross: r.totalGross != null ? parseFloat(r.totalGross) : null,
    totalNet: r.totalNet != null ? parseFloat(r.totalNet) : null,
    employeeCount: r.employeeCount,
    processedAt: r.processedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
  };
}

router.get("/payroll-runs", requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select().from(payrollRunsTable).orderBy(payrollRunsTable.year, payrollRunsTable.month);
    res.json(rows.map(formatRun));
  } catch (err) {
    logger.error({ err }, "List payroll runs error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/payroll-runs", requireAdmin, async (req, res) => {
  try {
    const { month, year } = req.body;
    const [run] = await db.insert(payrollRunsTable).values({ month, year, status: "draft" }).returning();
    res.status(201).json(formatRun(run));
  } catch (err) {
    logger.error({ err }, "Create payroll run error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/payroll-runs/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [run] = await db.select().from(payrollRunsTable).where(eq(payrollRunsTable.id, id));
    if (!run) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(formatRun(run));
  } catch (err) {
    logger.error({ err }, "Get payroll run error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/payroll-runs/:id/process", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [run] = await db.select().from(payrollRunsTable).where(eq(payrollRunsTable.id, id));
    if (!run) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    // Get all active employees with salary structures
    const employees = await db.select().from(employeesTable).where(eq(employeesTable.status, "active"));
    const salaryStructures = await db.select().from(salaryStructuresTable);

    const ssMap = new Map(salaryStructures.map(ss => [ss.id, ss]));

    let totalGross = 0;
    let totalNet = 0;

    // Delete old payslips for this run
    await db.delete(payslipsTable).where(eq(payslipsTable.payrollRunId, id));

    const payslipInserts = [];
    for (const emp of employees) {
      if (!emp.salaryStructureId) continue;
      const ss = ssMap.get(emp.salaryStructureId);
      if (!ss) continue;

      const basic = parseFloat(ss.basicSalary);
      const hra = parseFloat(ss.hra);
      const da = parseFloat(ss.da);
      const ta = parseFloat(ss.ta);
      const otherAllowances = parseFloat(ss.otherAllowances);
      const gross = basic + hra + da + ta + otherAllowances;

      const pf = parseFloat(ss.pfDeduction);
      const tax = parseFloat(ss.taxDeduction);
      const other = parseFloat(ss.otherDeductions);
      const totalDed = pf + tax + other;
      const net = gross - totalDed;

      totalGross += gross;
      totalNet += net;

      payslipInserts.push({
        payrollRunId: id,
        employeeId: emp.id,
        basicSalary: String(basic),
        hra: String(hra),
        da: String(da),
        ta: String(ta),
        otherAllowances: String(otherAllowances),
        grossSalary: String(gross),
        pfDeduction: String(pf),
        taxDeduction: String(tax),
        otherDeductions: String(other),
        totalDeductions: String(totalDed),
        netSalary: String(net),
      });
    }

    if (payslipInserts.length > 0) {
      await db.insert(payslipsTable).values(payslipInserts);
    }

    const [updated] = await db.update(payrollRunsTable)
      .set({
        status: "completed",
        totalGross: String(totalGross),
        totalNet: String(totalNet),
        employeeCount: payslipInserts.length,
        processedAt: new Date(),
      })
      .where(eq(payrollRunsTable.id, id))
      .returning();

    res.json(formatRun(updated));
  } catch (err) {
    logger.error({ err }, "Process payroll run error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
