
import { Router } from "express";
import gameRoutes from "./games.routes.js";
import customerRoutes from "./customers.routes.js";

const router = Router();

router.use(gameRoutes);
router.use(customerRoutes);
export default router;