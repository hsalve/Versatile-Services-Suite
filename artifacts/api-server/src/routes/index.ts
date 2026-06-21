import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import employeesRouter from "./employees";
import salaryStructuresRouter from "./salary_structures";
import payrollRouter from "./payroll";
import payslipsRouter from "./payslips";
import contactsRouter from "./contacts";
import quotesRouter from "./quotes";
import applicationsRouter from "./applications";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(employeesRouter);
router.use(salaryStructuresRouter);
router.use(payrollRouter);
router.use(payslipsRouter);
router.use(contactsRouter);
router.use(quotesRouter);
router.use(applicationsRouter);
router.use(dashboardRouter);

export default router;
