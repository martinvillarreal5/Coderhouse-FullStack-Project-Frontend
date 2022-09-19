import { Router } from 'express';
const router = Router();

import productRoutes from './productsRouter.js';
import cartRoutes from './cartRouter.js';
import userRoutes from './userRouter.js'


router.use('/user', userRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

export default router;