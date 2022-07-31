import MongoContainer from "../../containers/MongoContainer";

class ProductDaoMongo extends ContainerMongo {
    constructor() {
        super('products', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            stock: { type: Number, required: true },
            description: { type: String, required: true },
            code: { type: String, required: true },
            timestamp: { type: String, required: true },
        });
    }
}

export default ProductDaoMongo;