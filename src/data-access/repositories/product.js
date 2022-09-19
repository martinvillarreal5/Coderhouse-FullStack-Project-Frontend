import BaseRepository from "./base.js";
import ProductModel from "../models/product.js"

export default class ProductRepository extends BaseRepository {
    constructor() {
        super(ProductModel);
    }
};