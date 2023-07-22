import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsersProfile,
  deleteUserProfile,
  updateUserProfilebyAdmin,
  getUserProfileByAdmin,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile); // the next() function in protect middleware will pass control to getUserProfile
router.route("/profile").put(protect, updateUserProfile); // after verying the token, the user will be allowed to update the details
router.route("/").post(registerUser);

/************************************ADMIN PRIVELEGES ROUTES***************************************** */

router.route("/").get(protect, isAdmin, getAllUsersProfile);
router.route("/:id").delete(protect, isAdmin, deleteUserProfile);
router.route("/:id").put(protect, isAdmin, updateUserProfilebyAdmin);
router.route("/:id").get(protect, isAdmin, getUserProfileByAdmin);

export default router;
