import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  /* username: {
    type: String,
    required: true,
  }, */
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // ? if this fail, will throw a duplicate key error, instead of a validation error
    required: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  /* 
        cartId: {
            type: Schema.Types.ObjectId,
            ref: 'Cart',
            //required: true,
        } */
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});
/* 
userSchema.plugin(passportLocalMongoose,
    {
        usernameUnique: false,
    })
 */

export default mongoose.model("User", userSchema);
