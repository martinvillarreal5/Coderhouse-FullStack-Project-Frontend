const { Router } = require('express');
const router = Router();

const products = require('./productsRouter.js');
const cart = require('./cartRouter.js');

router.use('/api/products', products);
router.use('/api/cart', cart);

module.exports = router;