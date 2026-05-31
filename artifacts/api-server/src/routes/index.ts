import { Router, type IRouter } from "express";
import healthRouter from "./health";
import userRouter from "./user";
import budgetRouter from "./budget";
import intentRouter from "./intent";

const router: IRouter = Router();

router.use(healthRouter);
router.use(userRouter);
router.use(budgetRouter);
router.use(intentRouter);

export default router;
