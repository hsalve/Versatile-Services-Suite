import { pgTable, serial, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const payslipsTable = pgTable("payslips", {
  id: serial("id").primaryKey(),
  payrollRunId: integer("payroll_run_id").notNull(),
  employeeId: integer("employee_id").notNull(),
  basicSalary: numeric("basic_salary", { precision: 10, scale: 2 }).notNull(),
  hra: numeric("hra", { precision: 10, scale: 2 }).notNull().default("0"),
  da: numeric("da", { precision: 10, scale: 2 }).notNull().default("0"),
  ta: numeric("ta", { precision: 10, scale: 2 }).notNull().default("0"),
  otherAllowances: numeric("other_allowances", { precision: 10, scale: 2 }).notNull().default("0"),
  grossSalary: numeric("gross_salary", { precision: 10, scale: 2 }).notNull(),
  pfDeduction: numeric("pf_deduction", { precision: 10, scale: 2 }).notNull().default("0"),
  taxDeduction: numeric("tax_deduction", { precision: 10, scale: 2 }).notNull().default("0"),
  otherDeductions: numeric("other_deductions", { precision: 10, scale: 2 }).notNull().default("0"),
  totalDeductions: numeric("total_deductions", { precision: 10, scale: 2 }).notNull(),
  netSalary: numeric("net_salary", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPayslipSchema = createInsertSchema(payslipsTable).omit({ id: true, createdAt: true });
export type InsertPayslip = z.infer<typeof insertPayslipSchema>;
export type Payslip = typeof payslipsTable.$inferSelect;
