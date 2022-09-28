import CartRepository from '../data-access/repositories/cart-repository.js';
import ProductRepository from '../data-access/repositories/product-repository.js'
const getCartById = async (id) => {
        const cart = await CartRepository.getById(id);
        //if (!cart) throw 'Cart not found'; //va en esta capa
        return cart;
}

const getCarts = async () => {
        return await CartRepository.getAll();
}
const addProductToCart = async (ownerId, cartData) => {
        const { productId, quantity } = cartData;
        //Se crea un carrito cuando el cliente guarda un producto, si es que no existe ya el carrito
        const cart = await CartRepository.getCart(ownerId);
        const existingProduct = await ProductRepository.getById(productId);
        if (!existingProduct) {
                throw new Error("product doesnt exists in the database") // improve
        }
        //If cart already exists for user,
        if (cart) {
                const productIndex = cart.products.findIndex((product) => product.productId == productId);
                // ad logic for negative quantity
                if (productIndex > -1) {
                        //product is already in cart
                        let cartProduct = cart.items[itemIndex];
                        cartProduct.quantity += quantity;
                        cartProduct.price += existingProduct.price
                }
                else if (quantity > 0) {
                        //product is not in the cart
                        cart.items.push({
                                productId: productId,
                                quantity: quantity,
                                price: existingProduct.price,
                        })
                }
                let data = await CartRepository.save(cart);
                return data
        } else {
                //Create new Cart
                const cartData = {
                        ownerId: ownerId, 
                        products: [{
                                productId: productId,
                                quantity: quantity,
                                price: existingProduct.price
                        }],
                }
                cart = await CartRepository.create(cartData)
                res.json(cart);
        }
}

const updateCart = async (id, data) => {
        if (!data) {
                throw new Error('update Cart Data is empty or undefined')
                //esto va en el controller?
        }
        const updatedCartId = await CartRepository.updateById(id, data);/* 
        if (id != updatedCartId){
            throw new Error('updatedCartId and given Id dont match, error')
            //no creo que haga falta esto, mas que nada testing
        } */
        return updatedCartId;
}

const deleteCart = async (id) => {
        const deletedCart = await CartRepository.deleteById(id);
        return deletedCart;
}

export default { getCartById, getCarts, addProductToCart, updateCart, deleteCart } 