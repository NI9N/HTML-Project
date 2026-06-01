import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reservationsRouter from "./reservations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reservationsRouter);

export default router;
