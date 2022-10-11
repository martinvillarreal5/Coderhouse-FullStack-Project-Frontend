import twilio from "twilio";
import { twilioConfig } from "../../config/index.js";

const accountSid = twilioConfig.accountSid;
const authToken = twilioConfig.authToken;

const client = twilio(accountSid, authToken);

export const sendNewOrderSMG = async (user) => {
  try {
    const message = await client.messages.create({
      body: `Hola ${user.firstName} ${user.lastName}, tu pedido de compra ya se encuentra en proceso!`,
      from: twilioConfig.twilioPhone,
      to: user.phone,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};
