import { CartDao } from '../../data-access/daos/index.js';

const getCartById = async (id) => {
        const cart = await CartDao.getById(id);
        //if (!cart) throw 'Cart not found'; //va en esta capa
        return cart;
}

const getCarts = async () => {
        return await CartDao.getAll();
        console.log('Error: ', error);
}
const saveCart = async (data) => {
        console.log(data)
        const cart = data;
        const savedCartId = CartDao.save(cart);
        return savedCartId; 
}

const updateCart = async (id, data) => {
        if (!data){
            throw new Error('update Cart Data is empty or undefined')
            //esto va en el controller?
        }
        const updatedCartId = await CartDao.updateById(id, data);/* 
        if (id != updatedCartId){
            throw new Error('updatedCartId and given Id dont match, error')
            //no creo que haga falta esto, mas que nada testing
        } */
        return updatedCartId;
}

const deleteCart = async (id) => {
        const deletedCart = await CartDao.deleteById(id);
        return deletedCart;
}

export default { getCartById, getCarts, saveCart, updateCart, deleteCart } 