import CartRepository from '../data-access/repositories/cart.js';

const getCartById = async (id) => {
        const cart = await CartRepository.getById(id);
        //if (!cart) throw 'Cart not found'; //va en esta capa
        return cart;
}

const getCarts = async () => {
        return await CartRepository.getAll();
        console.log('Error: ', error);
}
const saveCart = async (data) => {
        console.log(data)
        const cart = data;
        const savedCart = CartRepository.save(cart);
        return savedCart; 
}

const updateCart = async (id, data) => {
        if (!data){
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

export default { getCartById, getCarts, saveCart, updateCart, deleteCart } 