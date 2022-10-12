import { Router } from "express";
import {
  getCart,
  getCartById,
  getCarts,
  addProductToCart,
  deleteCart,
  createOrder,
} from "../controllers/cartController.js";
import { ensureAuth, ensureAdminAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", ensureAuth, addProductToCart);
router.post("/order/", ensureAuth, createOrder);
router.get("/", ensureAuth, getCart);
router.get("/admin/all", ensureAdminAuth, getCarts);
router.get("/admin/:id/", ensureAdminAuth, getCartById);
router.delete("admin/:id", ensureAdminAuth, deleteCart);

export default router;
