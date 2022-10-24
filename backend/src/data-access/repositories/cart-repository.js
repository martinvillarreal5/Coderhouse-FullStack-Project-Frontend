import BaseRepository from "./base-repository.js";
import CartModel from "../models/cart-model.js";

class CartRepository extends BaseRepository {
  constructor() {
    super(CartModel);
  }
}

export default new CartRepository();
