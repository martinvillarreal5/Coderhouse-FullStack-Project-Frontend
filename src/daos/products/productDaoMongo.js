import MongoContainer from "../../containers/MongoContainer.js";
import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    timestamp: { type: String, required: true },
});
/*
productSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id; 
    }
}) */

export default class ProductDaoMongo extends MongoContainer {
    constructor() {
        super('Product', productSchema);
    }
};
