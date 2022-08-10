import dotenv from "dotenv";
dotenv.config();

export default {
    mongodb: {
      connectionString: "mongodb+srv://VillarrealDev:" + process.env.MONGODBPASSWORD + "@cluster0.oc4hq9p.mongodb.net/?retryWrites=true&w=majority",
    }
  };