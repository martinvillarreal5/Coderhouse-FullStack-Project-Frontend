import { Router } from 'express';
const router = Router();

import products from './productsRouter.js';
//import cart from './cartRouter.js';

router.use('/api/products', products);
//router.use('/api/cart', cart);

export default router;