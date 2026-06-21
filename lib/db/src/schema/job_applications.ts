import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const jobApplicationsTable = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  position: text("position").notNull(),
  department: text("department"),
  experience: text("experience"),
  coverLetter: text("cover_letter"),
  status: text("status").notNull().default("new"), // new | shortlisted | interviewed | offered | rejected
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplicationsTable).omit({ id: true, createdAt: true, status: true });
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type JobApplication = typeof jobApplicationsTable.$inferSelect;
