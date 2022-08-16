import cartServices from '../services/cart/CartServices.js';

const getCartById = async /* ver si hace falta poner estos asyncs, ya que el container o service ya lo tiene*/(req, res) => {
    try {
        const id = req.params.id;
        const cart = await cartServices.getCartById(id);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
const getCarts = async (req, res) => {
    try {
        const carts = await cartServices.getCarts()
        res.json(carts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
const saveCart = async (req, res) => {
    try {
        const cart = {...req.body};
        const savedCartId = await cartServices.saveCart(cart)
        res.status(201).json('Saved cart id: ' + savedCartId);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const updateCart = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const data = req.body
        console.log(data)
        const updatedCartId = await cartServices.updateCart(id, data);
        res.status(200).json('Updated cart id: ' + updatedCartId);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const deleteCart = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCart = await cartServices.deleteCart(id);
        res.status(200).json('Cart deleted: ' + deletedCart);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export { 
    getCarts,
    getCartById, 
    saveCart, 
    updateCart, 
    deleteCart 
};

