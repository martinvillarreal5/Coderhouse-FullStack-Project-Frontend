import mongoose from 'mongoose';
const { Schema } = mongoose;

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

export default mongoose.model('Product', productSchema)