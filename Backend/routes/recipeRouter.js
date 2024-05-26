import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getRecipes,
  getRecipe,
  addRecipe,
  getRecipeByUser,
  updateRating,
  getRecipeByTag,
} from "../controllers/recipeController.js";

const router = express.Router();

router.route("/").get(getRecipes).post(protect, addRecipe);

router.get("/:_id", getRecipe);
router.get("/tags/:tag", getRecipeByTag);
router.get("/user/:_id", getRecipeByUser);

router.patch("/rating/:_id", updateRating);

export { router as recipeRouter };
