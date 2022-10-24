import mongoose from "mongoose";
const Schema = mongoose.Schema;
let itemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    //TODO: use populate for the fields below?
    title: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // implementar timestamp cada que vez que se modifique un producto (cantidad, nuevo)
  }
);

const cartSchema = new Schema(
  {
    products: {
      type: [itemSchema],
      default: undefined,
    },
    email: {
      //change to email?
      type: String,
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
      delete product._id;
    });
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Cart", cartSchema);
