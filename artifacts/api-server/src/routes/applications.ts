import { Router, type IRouter } from "express";
import { db, jobApplicationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/job-applications", requireAdmin, async (req, res) => {
  try {
    const { status } = req.query as Record<string, string>;
    let rows = await db.select().from(jobApplicationsTable).orderBy(jobApplicationsTable.createdAt);
    if (status) rows = rows.filter(a => a.status === status);
    res.json(rows.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
  } catch (err) {
    logger.error({ err }, "List job applications error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/job-applications", async (req, res) => {
  try {
    const { applicantName, email, phone, position, department, experience, coverLetter } = req.body;
    const [app] = await db.insert(jobApplicationsTable).values({
      applicantName, email, phone: phone || null, position,
      department: department || null, experience: experience || null,
      coverLetter: coverLetter || null, status: "new",
    }).returning();
    res.status(201).json({ ...app, createdAt: app.createdAt.toISOString() });
  } catch (err) {
    logger.error({ err }, "Create job application error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/job-applications/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [app] = await db.select().from(jobApplicationsTable).where(eq(jobApplicationsTable.id, id));
    if (!app) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ ...app, createdAt: app.createdAt.toISOString() });
  } catch (err) {
    logger.error({ err }, "Get job application error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/job-applications/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [app] = await db.update(jobApplicationsTable)
      .set({ status: req.body.status })
      .where(eq(jobApplicationsTable.id, id))
      .returning();
    if (!app) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ ...app, createdAt: app.createdAt.toISOString() });
  } catch (err) {
    logger.error({ err }, "Update job application error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
