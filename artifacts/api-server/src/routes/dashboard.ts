import { Router, type IRouter } from "express";
import { db, employeesTable, payrollRunsTable, payslipsTable, contactsTable, quoteRequestsTable, jobApplicationsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/dashboard/stats", requireAdmin, async (_req, res) => {
  try {
    const [totalEmp] = await db.select({ count: sql<number>`count(*)::int` }).from(employeesTable);
    const [activeEmp] = await db.select({ count: sql<number>`count(*)::int` }).from(employeesTable).where(eq(employeesTable.status, "active"));
    const [totalRuns] = await db.select({ count: sql<number>`count(*)::int` }).from(payrollRunsTable);
    const [pendingContacts] = await db.select({ count: sql<number>`count(*)::int` }).from(contactsTable).where(eq(contactsTable.status, "new"));
    const [pendingApps] = await db.select({ count: sql<number>`count(*)::int` }).from(jobApplicationsTable).where(eq(jobApplicationsTable.status, "new"));
    const [pendingQuotes] = await db.select({ count: sql<number>`count(*)::int` }).from(quoteRequestsTable).where(eq(quoteRequestsTable.status, "new"));

    // Last completed payroll net
    const completedRuns = await db.select().from(payrollRunsTable)
      .where(eq(payrollRunsTable.status, "completed"))
      .orderBy(payrollRunsTable.processedAt);
    const lastRun = completedRuns[completedRuns.length - 1];
    const lastPayrollTotal = lastRun?.totalNet ? parseFloat(lastRun.totalNet) : 0;

    res.json({
      totalEmployees: totalEmp.count,
      activeEmployees: activeEmp.count,
      totalPayrollRuns: totalRuns.count,
      pendingContacts: pendingContacts.count,
      pendingApplications: pendingApps.count,
      pendingQuotes: pendingQuotes.count,
      lastPayrollTotal,
    });
  } catch (err) {
    logger.error({ err }, "Dashboard stats error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/dashboard/payroll-summary", requireAdmin, async (_req, res) => {
  try {
    const runs = await db.select().from(payrollRunsTable)
      .where(eq(payrollRunsTable.status, "completed"))
      .orderBy(payrollRunsTable.year, payrollRunsTable.month);

    res.json(runs.map(r => ({
      month: r.month,
      year: r.year,
      totalNet: r.totalNet ? parseFloat(r.totalNet) : 0,
      employeeCount: r.employeeCount ?? 0,
    })));
  } catch (err) {
    logger.error({ err }, "Payroll summary error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/dashboard/department-breakdown", requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select({
      department: employeesTable.department,
      count: sql<number>`count(*)::int`,
    }).from(employeesTable)
      .where(eq(employeesTable.status, "active"))
      .groupBy(employeesTable.department);

    res.json(rows);
  } catch (err) {
    logger.error({ err }, "Department breakdown error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
