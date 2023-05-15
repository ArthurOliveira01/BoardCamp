import { Router } from "express";
import { postRentals, getRental } from "../controllers/rentals.controllers.js";

const rentalRouter = Router();

rentalRouter.post("/rentals", postRentals);
rentalRouter.get("/rentals", getRental);

export default rentalRouter;