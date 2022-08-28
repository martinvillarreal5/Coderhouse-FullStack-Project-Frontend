import MongoContainer from "../../containers/MongoContainer.js";
import mongoose from 'mongoose';
const { Schema } = mongoose;

// mover todo lo referido a schema a una carpeta aparte

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        stock: { type: Number, required: true },
        description: { type: String, required: true },
        code: { type: String, required: true },
    },
    { timestamps: true }
);

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default class ProductDaoMongo extends MongoContainer {
    constructor() {
        super('Product', productSchema);
    }
};
