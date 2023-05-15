import { Router } from "express";
import { postRentals } from "../controllers/rentals.controllers.js";

const rentalRouter = Router();

rentalRouter.post("/rentals", postRentals);

export default rentalRouter;