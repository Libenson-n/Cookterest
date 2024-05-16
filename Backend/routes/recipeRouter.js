import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getRecipes,
  getRecipe,
  addRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.route("/").get(getRecipes).post(protect, addRecipe);

router.get("/:_id", getRecipe);

export { router as recipeRouter };
