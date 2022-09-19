import { Router } from 'express';

const router = Router();

import {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';


router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', saveProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;