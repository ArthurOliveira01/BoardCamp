import { Router } from "express";
import { postGame, getGame } from "../controllers/games.controllers.js";

const gameRoutes = Router();

gameRoutes.post("/games",postGame);
gameRoutes.get("/games", getGame);
export default gameRoutes;