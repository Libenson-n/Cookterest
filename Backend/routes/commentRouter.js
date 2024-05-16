import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  deleteComment,
  getComments,
  getCommentsByRecipe,
  getCommentsByUser,
} from "../controllers/commentController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addComment)
  .get(getComments)
  .delete(protect, deleteComment);

router.get("/user/:_id", getCommentsByUser);
router.get("/recipe/:_id", getCommentsByRecipe);

export { router as commentRouter };
