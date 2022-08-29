import {cartServices} from '../../services/index.js';

// busacr diferencias entre usar la funcion como esta ahora (async con un bloque trycatch adentro) 
// o llamar los metodos comos promesas y usar .catch

//asi mismo puede que el uso de asyncs aca este de mas, ya esta funcion devolveria una promesa, pero no tiene mucho sentido que lo haga
// pasaria lo mismo en services, quizas lo mejor seria que cada capa devuelva la promesa en si del mongoose y finalmente usar un .catch aca, sino
// hacer que cada cada retorne el error
const getCartById = async (next, request, response) => {
    try {
        const id = request.params.id;
        const cart = await cartServices.getCartById(id);
        cart ? response.status(200).json(cart)
            : response.status(404).end();
    } catch (error) {
        next(error);
    }
}
const getCarts = async (next, request, response) => {
    try {
        const carts = await cartServices.getCarts()
        response.satus(200).json(carts);
    } catch (error) {
        next(error);
    }
}
const saveCart = async (next, request, response) => {
    try {
        const cart = { ...request.body };
        const savedCartId = await cartServices.saveCart(cart)
        response.status(201).json('Saved cart id: ' + savedCartId);
    } catch (error) {
        next(error);
    }
}

const updateCart = async (next, request, response) => {
    try {
        const id = request.params.id;
        const data = request.body
        const updatedCartId = await cartServices.updateCart(id, data);
        response.status(200).json('Updated cart id: ' + updatedCartId);
    } catch (error) {
        next(error);
    }
}

const deleteCart = async (next, request, response) => {
    try {
        const id = request.params.id;
        const deletedCart = await cartServices.deleteCart(id);
        response.status(200).json('Cart deleted: ' + deletedCart);
    } catch (error) {
        next(error);
    }
}

export {
    getCarts,
    getCartById,
    saveCart,
    updateCart,
    deleteCart
};

