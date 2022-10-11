import { Router } from "express";
import { ensureAdminAuth } from "../middleware/auth.js";
import {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/admin/", ensureAdminAuth, saveProduct);
router.put("/admin/:id", ensureAdminAuth, updateProduct);
router.delete("/admin/:id", ensureAdminAuth, deleteProduct);

export default router;
