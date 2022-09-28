import BaseRepository from "./base-repository.js";
import CartModel from "../models/cart.js"

class CartRepository extends BaseRepository {
    constructor() {
        super(CartModel);
    }
    async getCart(ownerId){
        const cart = await this.model.findOne({ ownerId });
        return cart // retorna una instancia del modelo, se puede usar cart.save directamente
    }
    async addProductToCart(productId) {
        //only use the save method?
    }
    async save(modelInstance) {
        //test
        const savedObject = await modelInstance.save();
        savedObject;
    }

};

export default new CartRepository;