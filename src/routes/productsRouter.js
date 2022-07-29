import { Router } from 'express';
const router = Router();

import { getProducts, getProductById, saveProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import checkAuth from '../utils/checkAuth.js';

const admin = true;
const checkAdmin = checkAuth(admin)

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', checkAdmin, saveProduct);
router.put('/:id', checkAdmin, updateProduct);
router.delete('/:id', checkAdmin, deleteProduct);

export default router;