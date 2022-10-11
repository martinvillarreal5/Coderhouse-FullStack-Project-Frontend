import { Router } from "express";
import productRoutes from "./productsRouter.js";
import cartRoutes from "./cartRouter.js";
import userRoutes from "./userRouter.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);

export default router;
