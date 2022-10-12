import "dotenv/config";

export const serverConfig = {
  port: process.env.PORT,
  secret: process.env.SECRET || "mySecret",
};

export const databaseConfig = {
  mongoDbUrl:
    "mongodb+srv://VillarrealDev:" +
    process.env.MONGODBPASSWORD +
    "@cluster0.oc4hq9p.mongodb.net/?retryWrites=true&w=majority",
};

export const mailerConfig = {
  email: process.env.MAILER_EMAIL,
  password: process.env.MAILER_PASS,
};

export const twilioConfig = {
  accountSid: process.env.TWILIO_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhone: process.env.TWILIO_PHONE,
  twilioWhatsapp: process.env.TWILIO_WHATSAPP,
  adminPhone: "+5492616964632",
};
