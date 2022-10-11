import mongoose from "mongoose";
//import passportLocalMongoose from 'passport-local-mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
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
    unique: true,
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
