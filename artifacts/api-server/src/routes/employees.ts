import { Router, type IRouter } from "express";
import { db, employeesTable } from "@workspace/db";
import { eq, ilike, and, or } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/employees", requireAdmin, async (req, res) => {
  try {
    const { department, status, search } = req.query as Record<string, string>;
    let rows = await db.select().from(employeesTable).orderBy(employeesTable.createdAt);

    if (department) rows = rows.filter(e => e.department === department);
    if (status) rows = rows.filter(e => e.status === status);
    if (search) {
      const s = search.toLowerCase();
      rows = rows.filter(e =>
        e.firstName.toLowerCase().includes(s) ||
        e.lastName.toLowerCase().includes(s) ||
        e.email.toLowerCase().includes(s) ||
        e.employeeCode.toLowerCase().includes(s)
      );
    }

    res.json(rows.map(e => ({
      ...e,
      joinDate: e.joinDate,
      salaryStructureId: e.salaryStructureId,
    })));
  } catch (err) {
    logger.error({ err }, "List employees error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/employees", requireAdmin, async (req, res) => {
  try {
    const body = req.body;
    // Generate employee code if not provided
    if (!body.employeeCode) {
      const count = await db.select().from(employeesTable);
      body.employeeCode = `VS${String(count.length + 1).padStart(4, "0")}`;
    }

    const [employee] = await db.insert(employeesTable).values({
      employeeCode: body.employeeCode,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || null,
      department: body.department,
      designation: body.designation,
      status: body.status || "active",
      joinDate: body.joinDate,
      salaryStructureId: body.salaryStructureId || null,
    }).returning();

    res.status(201).json(employee);
  } catch (err) {
    logger.error({ err }, "Create employee error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/employees/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Employees can only view their own record
    if (req.user?.role === "employee" && req.user.employeeId !== id) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const [employee] = await db.select().from(employeesTable).where(eq(employeesTable.id, id));
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch (err) {
    logger.error({ err }, "Get employee error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/employees/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;

    const [employee] = await db.update(employeesTable)
      .set({
        ...(body.firstName !== undefined && { firstName: body.firstName }),
        ...(body.lastName !== undefined && { lastName: body.lastName }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.department !== undefined && { department: body.department }),
        ...(body.designation !== undefined && { designation: body.designation }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.salaryStructureId !== undefined && { salaryStructureId: body.salaryStructureId }),
      })
      .where(eq(employeesTable.id, id))
      .returning();

    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json(employee);
  } catch (err) {
    logger.error({ err }, "Update employee error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/employees/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(employeesTable).where(eq(employeesTable.id, id));
    res.status(204).send();
  } catch (err) {
    logger.error({ err }, "Delete employee error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
