import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const mongoDbPassword = process.env.MONGODBPASSWORD;
 const mongoDbUrl = "mongodb+srv://VillarrealDev:" + mongoDbPassword + "@cluster0.oc4hq9p.mongodb.net/?retryWrites=true&w=majority";

 export default mongoDbUrl

/* const connection = mongoose.createConnection(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
export default connection; */