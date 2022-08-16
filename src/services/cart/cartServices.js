import { CartDao } from '../../daos/index.js';

const getCartById = async (id) => {
    try {
        const cart = await CartDao.getById(id);
        if (!cart) throw 'Cart not found'; //necesary?
        return cart;
    } catch (error) {
        console.log('Error: ', error);
    }
}

const getCarts = async () => {
    try {
        return await CartDao.getAll();
    } catch (err) {
        console.log('Error: ', error);
    }
}
const saveCart = async (data) => {
    try {
        console.log(data)
        const cart = data;
        const savedCartId = CartDao.save(cart);
        return savedCartId; 
    } catch (error) {
        console.log('Error: ', error);
    }
}

const updateCart = async (id, data) => {
    try {
        if (!data){
            throw 'update Cart Data is empty or undefined'
        }
        const updatedCartId = await CartDao.updateById(id, data);
        if (id != updatedCartId){
            throw 'updatedCartId and given Id dont match, error'
        }
        return updatedCartId;
        
    } catch (error) {
        console.log('Error: ', error);
    }
}

const deleteCart = async (id) => {
    try {
        const deletedCart = await CartDao.deleteById(id);
        return deletedCart;
    } catch (error) {
        console.log('Error: ', error);
    }
}

export default { getCartById, getCarts, saveCart, updateCart, deleteCart } 