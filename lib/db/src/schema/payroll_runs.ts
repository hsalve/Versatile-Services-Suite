import { pgTable, serial, integer, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const payrollRunsTable = pgTable("payroll_runs", {
  id: serial("id").primaryKey(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  status: text("status").notNull().default("draft"), // draft | processing | completed
  totalGross: numeric("total_gross", { precision: 12, scale: 2 }),
  totalNet: numeric("total_net", { precision: 12, scale: 2 }),
  employeeCount: integer("employee_count"),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPayrollRunSchema = createInsertSchema(payrollRunsTable).omit({ id: true, createdAt: true, processedAt: true });
export type InsertPayrollRun = z.infer<typeof insertPayrollRunSchema>;
export type PayrollRun = typeof payrollRunsTable.$inferSelect;
