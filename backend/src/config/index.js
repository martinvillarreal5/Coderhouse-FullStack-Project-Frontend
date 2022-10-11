import "dotenv/config";

const serverConfig = {
  port: process.env.PORT,
  secret: process.env.SECRET || "mySecret",
};

const databaseConfig = {
  mongoDbUrl:
    "mongodb+srv://VillarrealDev:" +
    process.env.MONGODBPASSWORD +
    "@cluster0.oc4hq9p.mongodb.net/?retryWrites=true&w=majority",
};

const mailerConfig = {
  email: process.env.MAILER_EMAIL,
  password: process.env.MAILER_PASS,
};

export { serverConfig, databaseConfig, mailerConfig };
