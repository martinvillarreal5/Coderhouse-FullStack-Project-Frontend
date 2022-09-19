import BaseRepository from "./base.js";
import CartModel from "../models/cart.js"

export default class CartRepository extends BaseRepository {
    constructor() {
        super(CartModel);
    }
};