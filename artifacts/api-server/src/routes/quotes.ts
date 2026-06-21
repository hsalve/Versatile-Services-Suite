import { Router, type IRouter } from "express";
import { db, quoteRequestsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/quote-requests", requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select().from(quoteRequestsTable).orderBy(quoteRequestsTable.createdAt);
    res.json(rows.map(q => ({ ...q, createdAt: q.createdAt.toISOString() })));
  } catch (err) {
    logger.error({ err }, "List quote requests error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/quote-requests", async (req, res) => {
  try {
    const { companyName, contactName, email, phone, service, requirements } = req.body;
    const [quote] = await db.insert(quoteRequestsTable).values({
      companyName, contactName, email, phone: phone || null, service, requirements: requirements || null, status: "new",
    }).returning();
    res.status(201).json({ ...quote, createdAt: quote.createdAt.toISOString() });
  } catch (err) {
    logger.error({ err }, "Create quote request error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/quote-requests/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [quote] = await db.update(quoteRequestsTable)
      .set({ status: req.body.status })
      .where(eq(quoteRequestsTable.id, id))
      .returning();
    if (!quote) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ ...quote, createdAt: quote.createdAt.toISOString() });
  } catch (err) {
    logger.error({ err }, "Update quote request error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
