import dotenv from "dotenv";
dotenv.config();

const mongoDbPassword = process.env.MONGODBPASSWORD

export default {
    mongodb: {
      connectionString: "mongodb+srv://VillarrealDev:" + mongoDbPassword + "@cluster0.oc4hq9p.mongodb.net/?retryWrites=true&w=majority",
    }
  };