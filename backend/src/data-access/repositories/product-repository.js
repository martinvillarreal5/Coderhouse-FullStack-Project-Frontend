import BaseRepository from "./base-repository.js";
import ProductModel from "../models/product.js"

class ProductRepository extends BaseRepository {
    constructor() {
        super(ProductModel);
    }
};

export default new ProductRepository