import cartServices from '../../services/cartServices.js';

// busacr diferencias entre usar la funcion como esta ahora (async con un bloque trycatch adentro) 
// o llamar los metodos comos promesas y usar .catch

//asi mismo puede que el uso de asyncs aca este de mas, ya esta funcion devolveria una promesa, pero no tiene mucho sentido que lo haga
// pasaria lo mismo en services, quizas lo mejor seria que cada capa devuelva la promesa en si del mongoose y finalmente usar un .catch aca, sino
// hacer que cada cada retorne el error
const getCartById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cart = await cartServices.getCartById(id);
        cart ? res.status(200).json(cart)
            : res.status(404).end();
    } catch (error) {
        next(error);
    }
}
const getCarts = async (req, res, next) => {
    try {
        const carts = await cartServices.getCarts()
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
}
const addProductToCart = async (req, res, next) => {
    try {
        const cart = await cartServices.addProductToCart(req.user._id, req.body)
        res.status(201).json('Saved cart: ' + cart);
    } catch (error) {
        next(error);
    }
}

const updateCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body
        const updatedCartId = await cartServices.updateCart(id, data);
        res.status(200).json('Updated cart id: ' + updatedCartId);
    } catch (error) {
        next(error);
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedCart = await cartServices.deleteCart(id);
        res.status(200).json('Cart deleted: ' + deletedCart);
    } catch (error) {
        next(error);
    }
}

export {
    getCarts,
    getCartById,
    addProductToCart,
    updateCart,
    deleteCart
};

