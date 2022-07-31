import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    timestamp: { type: String, required: true }, 
  }
);

export default model("Product", ProductSchema);
/*
mongoose automaticame toma el primer paramatetro de model y lo cambia a su version plural y en minuscula, que seria
el nombre de la colleccion, no estoy seguro de para que sirve esto, mas alla de hacer todo mas confuso.
se puede evitar este comportamiento utilizando la linea: mongoose.pluralize(null) after importing mongoose
tambien se puede forzar el nombre de la collecion de esta forma: model("Document", Schema, "documents");
*/