import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUser,
  getUsers,
  getFavorites,
  updateFavorites,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getUsers).post(registerUser);

router.get("/:_id", getUser);

router.route("/favorites/:_id").put(protect, updateFavorites).get(getFavorites);

router.post("/auth", authUser);
router.post("/logout", logoutUser);

router.route("/profile").get(getUserProfile).put(protect, updateUserProfile);

router.delete("/profile/:_id", protect, deleteUserProfile);

export { router as userRouter };
