import bcrypt from "bcryptjs";
import { db, usersTable, employeesTable, salaryStructuresTable } from "@workspace/db";

async function seed() {
  console.log("Seeding database...");

  // Admin user
  const passwordHash = await bcrypt.hash("admin123", 10);
  const existingAdmin = await db.select().from(usersTable);

  if (existingAdmin.length === 0) {
    await db.insert(usersTable).values({
      email: "admin@versatile.com",
      passwordHash,
      name: "Admin User",
      role: "admin",
    });
    console.log("✓ Admin user created: admin@versatile.com / admin123");
  } else {
    console.log("✓ Admin user already exists");
  }

  // Salary structures
  const existingSS = await db.select().from(salaryStructuresTable);
  let ssIds: number[] = existingSS.map(ss => ss.id);

  if (existingSS.length === 0) {
    const structures = [
      { name: "Operations Grade A", basicSalary: "18000", hra: "3600", da: "1800", ta: "1000", otherAllowances: "500", pfDeduction: "2160", taxDeduction: "0", otherDeductions: "0" },
      { name: "Operations Grade B", basicSalary: "14000", hra: "2800", da: "1400", ta: "800", otherAllowances: "300", pfDeduction: "1680", taxDeduction: "0", otherDeductions: "0" },
      { name: "HR Executive", basicSalary: "22000", hra: "4400", da: "2200", ta: "1200", otherAllowances: "800", pfDeduction: "2640", taxDeduction: "500", otherDeductions: "0" },
      { name: "Supervisor", basicSalary: "25000", hra: "5000", da: "2500", ta: "1500", otherAllowances: "1000", pfDeduction: "3000", taxDeduction: "1000", otherDeductions: "0" },
      { name: "Staff Grade", basicSalary: "12000", hra: "2400", da: "1200", ta: "600", otherAllowances: "200", pfDeduction: "1440", taxDeduction: "0", otherDeductions: "0" },
    ];
    const inserted = await db.insert(salaryStructuresTable).values(structures).returning({ id: salaryStructuresTable.id });
    ssIds = inserted.map(r => r.id);
    console.log(`✓ Created ${structures.length} salary structures`);
  }

  // Sample employees
  const existingEmps = await db.select().from(employeesTable);

  if (existingEmps.length === 0) {
    const employees = [
      { employeeCode: "VS0001", firstName: "Rahul", lastName: "Sharma", email: "rahul.sharma@versatile.com", phone: "9876543210", department: "Operations", designation: "Facility Supervisor", status: "active", joinDate: "2022-01-15", salaryStructureId: ssIds[3] },
      { employeeCode: "VS0002", firstName: "Priya", lastName: "Patil", email: "priya.patil@versatile.com", phone: "9876543211", department: "Human Resources", designation: "HR Executive", status: "active", joinDate: "2022-03-01", salaryStructureId: ssIds[2] },
      { employeeCode: "VS0003", firstName: "Suresh", lastName: "Kumar", email: "suresh.kumar@versatile.com", phone: "9876543212", department: "Logistics", designation: "Transport Coordinator", status: "active", joinDate: "2021-11-10", salaryStructureId: ssIds[0] },
      { employeeCode: "VS0004", firstName: "Meera", lastName: "Desai", email: "meera.desai@versatile.com", phone: "9876543213", department: "Housekeeping", designation: "Housekeeping Supervisor", status: "active", joinDate: "2023-02-15", salaryStructureId: ssIds[1] },
      { employeeCode: "VS0005", firstName: "Arun", lastName: "Jadhav", email: "arun.jadhav@versatile.com", phone: "9876543214", department: "Security", designation: "Security Guard", status: "active", joinDate: "2023-06-01", salaryStructureId: ssIds[4] },
      { employeeCode: "VS0006", firstName: "Sunita", lastName: "More", email: "sunita.more@versatile.com", phone: "9876543215", department: "Administration", designation: "Admin Assistant", status: "active", joinDate: "2022-09-01", salaryStructureId: ssIds[1] },
      { employeeCode: "VS0007", firstName: "Vijay", lastName: "Bhosale", email: "vijay.bhosale@versatile.com", phone: "9876543216", department: "Operations", designation: "Operations Executive", status: "active", joinDate: "2021-07-15", salaryStructureId: ssIds[0] },
      { employeeCode: "VS0008", firstName: "Kavita", lastName: "Singh", email: "kavita.singh@versatile.com", phone: "9876543217", department: "Food Services", designation: "Canteen Manager", status: "active", joinDate: "2022-12-01", salaryStructureId: ssIds[2] },
    ];
    await db.insert(employeesTable).values(employees);
    console.log(`✓ Created ${employees.length} sample employees`);

    // Create employee portal user for first employee
    const emp1Hash = await bcrypt.hash("emp123", 10);
    const [emp1] = await db.select().from(employeesTable);
    await db.insert(usersTable).values({
      email: "employee@versatile.com",
      passwordHash: emp1Hash,
      name: "Rahul Sharma",
      role: "employee",
      employeeId: emp1.id,
    });
    console.log("✓ Employee portal user created: employee@versatile.com / emp123");
  } else {
    console.log(`✓ ${existingEmps.length} employees already exist`);
  }

  console.log("\nSeed complete! Login credentials:");
  console.log("  Admin: admin@versatile.com / admin123");
  console.log("  Employee: employee@versatile.com / emp123");
  process.exit(0);
}

seed().catch(err => { console.error("Seed failed:", err); process.exit(1); });
