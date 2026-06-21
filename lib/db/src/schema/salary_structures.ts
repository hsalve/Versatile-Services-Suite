import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const salaryStructuresTable = pgTable("salary_structures", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  basicSalary: numeric("basic_salary", { precision: 10, scale: 2 }).notNull(),
  hra: numeric("hra", { precision: 10, scale: 2 }).notNull().default("0"),
  da: numeric("da", { precision: 10, scale: 2 }).notNull().default("0"),
  ta: numeric("ta", { precision: 10, scale: 2 }).notNull().default("0"),
  otherAllowances: numeric("other_allowances", { precision: 10, scale: 2 }).notNull().default("0"),
  pfDeduction: numeric("pf_deduction", { precision: 10, scale: 2 }).notNull().default("0"),
  taxDeduction: numeric("tax_deduction", { precision: 10, scale: 2 }).notNull().default("0"),
  otherDeductions: numeric("other_deductions", { precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSalaryStructureSchema = createInsertSchema(salaryStructuresTable).omit({ id: true, createdAt: true });
export type InsertSalaryStructure = z.infer<typeof insertSalaryStructureSchema>;
export type SalaryStructure = typeof salaryStructuresTable.$inferSelect;
