
import { Router } from "express";
import gameRoutes from "./games.routes.js";
import customerRoutes from "./customers.routes.js";
import rentalRouter from "./rentals.routes.js";

const router = Router();

router.use(gameRoutes);
router.use(customerRoutes);
router.use(rentalRouter);
export default router;