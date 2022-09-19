import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            //required: true,
        },
        lastName: {
            type: String,
            //required: true,
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
            //required: true,
        }
    }
)

userSchema.set('toJSON',
    {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            // the passwordHash should not be revealed
            delete returnedObject.passwordHash
        }
    }
)

userSchema.plugin(passportLocalMongoose)



export default mongoose.model('User', userSchema)