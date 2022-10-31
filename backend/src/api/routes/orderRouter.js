import { Router } from "express";
import { getOrders, createOrder } from "../controllers/orderController.js";
import { ensureAuth, ensureAdminAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", ensureAdminAuth, getOrders);
router.post("/", ensureAdminAuth, createOrder);

export default router;
