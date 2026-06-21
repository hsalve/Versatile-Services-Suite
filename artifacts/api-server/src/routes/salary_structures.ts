import { Router, type IRouter } from "express";
import { db, salaryStructuresTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function calcGross(s: { basicSalary: string; hra: string; da: string; ta: string; otherAllowances: string }) {
  return (
    parseFloat(s.basicSalary) +
    parseFloat(s.hra) +
    parseFloat(s.da) +
    parseFloat(s.ta) +
    parseFloat(s.otherAllowances)
  );
}

function calcDeductions(s: { pfDeduction: string; taxDeduction: string; otherDeductions: string }) {
  return parseFloat(s.pfDeduction) + parseFloat(s.taxDeduction) + parseFloat(s.otherDeductions);
}

function formatSalaryStructure(s: typeof salaryStructuresTable.$inferSelect) {
  const gross = calcGross({
    basicSalary: s.basicSalary,
    hra: s.hra,
    da: s.da,
    ta: s.ta,
    otherAllowances: s.otherAllowances,
  });
  const deductions = calcDeductions({
    pfDeduction: s.pfDeduction,
    taxDeduction: s.taxDeduction,
    otherDeductions: s.otherDeductions,
  });
  return {
    id: s.id,
    name: s.name,
    basicSalary: parseFloat(s.basicSalary),
    hra: parseFloat(s.hra),
    da: parseFloat(s.da),
    ta: parseFloat(s.ta),
    otherAllowances: parseFloat(s.otherAllowances),
    pfDeduction: parseFloat(s.pfDeduction),
    taxDeduction: parseFloat(s.taxDeduction),
    otherDeductions: parseFloat(s.otherDeductions),
    grossSalary: gross,
    netSalary: gross - deductions,
    createdAt: s.createdAt,
  };
}

router.get("/salary-structures", requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select().from(salaryStructuresTable).orderBy(salaryStructuresTable.name);
    res.json(rows.map(formatSalaryStructure));
  } catch (err) {
    logger.error({ err }, "List salary structures error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/salary-structures", requireAdmin, async (req, res) => {
  try {
    const body = req.body;
    const [row] = await db.insert(salaryStructuresTable).values({
      name: body.name,
      basicSalary: String(body.basicSalary),
      hra: String(body.hra || 0),
      da: String(body.da || 0),
      ta: String(body.ta || 0),
      otherAllowances: String(body.otherAllowances || 0),
      pfDeduction: String(body.pfDeduction || 0),
      taxDeduction: String(body.taxDeduction || 0),
      otherDeductions: String(body.otherDeductions || 0),
    }).returning();
    res.status(201).json(formatSalaryStructure(row));
  } catch (err) {
    logger.error({ err }, "Create salary structure error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/salary-structures/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [row] = await db.select().from(salaryStructuresTable).where(eq(salaryStructuresTable.id, id));
    if (!row) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(formatSalaryStructure(row));
  } catch (err) {
    logger.error({ err }, "Get salary structure error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/salary-structures/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;
    const [row] = await db.update(salaryStructuresTable)
      .set({
        ...(body.name !== undefined && { name: body.name }),
        ...(body.basicSalary !== undefined && { basicSalary: String(body.basicSalary) }),
        ...(body.hra !== undefined && { hra: String(body.hra) }),
        ...(body.da !== undefined && { da: String(body.da) }),
        ...(body.ta !== undefined && { ta: String(body.ta) }),
        ...(body.otherAllowances !== undefined && { otherAllowances: String(body.otherAllowances) }),
        ...(body.pfDeduction !== undefined && { pfDeduction: String(body.pfDeduction) }),
        ...(body.taxDeduction !== undefined && { taxDeduction: String(body.taxDeduction) }),
        ...(body.otherDeductions !== undefined && { otherDeductions: String(body.otherDeductions) }),
      })
      .where(eq(salaryStructuresTable.id, id))
      .returning();
    if (!row) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(formatSalaryStructure(row));
  } catch (err) {
    logger.error({ err }, "Update salary structure error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/salary-structures/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(salaryStructuresTable).where(eq(salaryStructuresTable.id, id));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete salary structure error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
