const { Router } = require('express');
const router = Router();

const { getProducts, getProductById, saveProduct, updateProduct, deleteProduct } = require('../controllers/productController.js');
const { checkAuth } = require('../utils/checkAuth.js');

const admin = true;
const checkAdmin = checkAuth(admin)

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', checkAdmin, saveProduct);
router.put('/:id', checkAdmin, updateProduct);
router.delete('/:id', checkAdmin, deleteProduct);

module.exports = router;