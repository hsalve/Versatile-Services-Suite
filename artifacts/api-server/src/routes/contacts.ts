import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/contacts", requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select().from(contactsTable).orderBy(contactsTable.createdAt);
    res.json(rows.map(c => ({ ...c, createdAt: c.createdAt.toISOString() })));
  } catch (err) {
    logger.error({ err }, "List contacts error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const [contact] = await db.insert(contactsTable).values({
      name, email, phone: phone || null, subject: subject || null, message, status: "new",
    }).returning();
    res.status(201).json({ ...contact, createdAt: contact.createdAt.toISOString() });
  } catch (err) {
    logger.error({ err }, "Create contact error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/contacts/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [contact] = await db.update(contactsTable)
      .set({ status: req.body.status })
      .where(eq(contactsTable.id, id))
      .returning();
    if (!contact) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ ...contact, createdAt: contact.createdAt.toISOString() });
  } catch (err) {
    logger.error({ err }, "Update contact error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
