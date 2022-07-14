const { Router } = require('express');
const router = Router();

const { newCart, deleteCart, getAllProductsFromCart, saveProductToCart, deleteProductInCart } = require('../controllers/cartController.js');

// // Crea un carrito y devuelve su id
router.post('/', newCart);
// // Elimina un carrito según su id
router.delete('/:id', deleteCart);
// // Devuelve todos los productos de un carrito
router.get('/:id/products', getAllProductsFromCart);
// // Recibe y agrega un producto en el carrito
router.post('/:id/products', saveProductToCart);
// // Elimina un producto de un carrito según sus id
router.delete('/:id/products/:id_prod', deleteProductInCart);
module.exports = router;