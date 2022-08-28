import MongoContainer from "../../containers/MongoContainer.js";
import mongoose from 'mongoose';
const { Schema } = mongoose;


let itemSchema = new Schema(
    {
        productId: {/* 
        type: Schema.Types.ObjectId,
        ref: "Product", */
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity can not be less then 1."],
        },
        price: { //agregar alguna validacion a la hora de "comprar" el carrito? para que los precios de la base de datos y los de el carro concuerden
            type: Number,
            required: true,
        },
    },/*
    {
      timestamps: true, // implementar timestamp cada que vez que se modifique un producto (cantidad, nuevo)
    } */
);

const cartSchema = new Schema(
    {
        products: {
            type: [itemSchema],
            default: undefined
        },
        //user id?
    }, 
    { timestamps: true }
);

cartSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.products.forEach(
            (product) => {
                delete product._id; //check if this works or if its bad practise
            }
        )
        delete returnedObject._id
        delete returnedObject.__v
    }
})

class CartDaoMongo extends MongoContainer {
    constructor() {
        super('Cart', cartSchema);
    };

    addProduct = async (cartId, product) => {
        try {
            const cart = await this.getById(cartId)
            if (!cart) {
                throw "CartId doesnt match any cart en in database"
            }

        } catch (error) {

        }
    };
};

export default CartDaoMongo;