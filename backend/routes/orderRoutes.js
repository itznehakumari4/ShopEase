import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderPaid,
  getOrders_ADMINS_ONLY,
  updateOrderDelivery_ADMINS_ONLY
} from "../controllers/orderController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems); //verify token and then pass user to addOrderItems
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay_status").put(protect, updateOrderPaid);

// ---------------ADMINS ONLY------------------

router.route("/").get(protect, isAdmin, getOrders_ADMINS_ONLY);
router.route("/:id/delivery_status").put(protect, isAdmin, updateOrderDelivery_ADMINS_ONLY);

export default router;
