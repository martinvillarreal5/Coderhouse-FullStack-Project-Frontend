import { Router } from 'express';
const router = Router();

import {
    getCartById,
    getCarts,
    addProductToCart,
    updateCart,
    deleteCart
} from '../controllers/cartController.js';


router.get('/', getCarts);
router.get('/:id/', getCartById);
router.post('/', addProductToCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;