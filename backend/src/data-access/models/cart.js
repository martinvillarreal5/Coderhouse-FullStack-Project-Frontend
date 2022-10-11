import mongoose from "mongoose";
const Schema = mongoose.Schema;

let itemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: {
      type: Array,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
  }
  /*
    {
      timestamps: true, // implementar timestamp cada que vez que se modifique un producto (cantidad, nuevo)
    } 
    */
);

const cartSchema = new Schema(
  {
    products: {
      type: [itemSchema],
      default: undefined,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

cartSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.products.forEach((product) => {
      product.id = product._id;
      delete product._id; //check if this works or if its bad practise
    });
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Cart", cartSchema);
