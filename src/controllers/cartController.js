import Container from '../utils/Container.js';
import Cart from '../utils/Cart.js';

// Base de productos
const products = new Container('/src/db/products.json');
// Base de carritos
const carts = new Container('/src/db/carts.txt');

// // Crea un carrito y devuelve su id
const newCart = async (req, res) => {
    try {
        let id = await carts.save(new Cart);
        res.status(201).json(id);
        //TODO buscar una forma mas clara de hacerlo 
    } catch (err) { 
        res.status(500).json({ error: err });
    }
}
// // Elimina un carrito según su id
const deleteCart = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const cart = await carts.getById(id);
        if (!cart) throw 'Carrito no encontrado';
        //TODO Quizas convenga hacer una funcion que haga todo las 3 lineas de arriba? algo asi como findById?
        await carts.deleteById(id);
        res.status(200).json('Carrito eliminado');
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Devuelve todos los productos de un carrito
const getAllProductsFromCart = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const cart = await carts.getById(id);
        if (!cart) throw 'Carrito no encontrado';
        // if (!cart.products) throw 'Cart is empty?'
        res.status(200).json(cart.productos);
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Recibe y agrega un producto en el carrito
const saveProductToCart = async (req, res) => {
    try {
        const productId = Number(req.body.id); // test
        const cartId = Number(req.params.id);
        
        const existingCart = await carts.getById(cartId); 
        if (! existingCart) throw 'Carrito no encontrado';
        const product = await products.getById( productId);
        if (!product) throw 'Producto no encontrado';
        if (product.stock == 0) throw 'No hay stock del producto';
        const cart = new Cart(existingCart);
        cart.addProduct(product); // Test if cart gets the Cart class methods

        await carts.updateById(cartId, cart); // 
        res.status(200).json('Producto agregado');

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// // Elimina un producto de un carrito según sus id
const deleteProductInCart = async (req, res) => {
    try {
        const cartId = Number(req.params.id);

        const cart = await carts.getById(cartId);
        if (!cart) throw 'Carrito no encontrado';

        const productId = Number(req.params.id_prod);

        const producto = await cart.getById(productId);
        if (!producto) throw 'Producto no se encuentra en el carrito';

        cart.removeProduct(producto);
        await carts.updateById(cartId, cart);
        res.status(200).json('Producto eliminado');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

export { newCart, deleteCart, getAllProductsFromCart, saveProductToCart, deleteProductInCart } 