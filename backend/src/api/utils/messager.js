import twilio from "twilio";
import { twilioConfig } from "../../config/index.js";

const accountSid = twilioConfig.accountSid;
const authToken = twilioConfig.authToken;

const client = twilio(accountSid, authToken);

export const sendNewOrderSMG = async (user) => {
  const message = await client.messages.create({
    body: `Hola ${user.firstName} ${user.lastName}, tu pedido de compra ya se encuentra en proceso!`,
    from: twilioConfig.twilioPhone,
    to: user.phone,
  });
  console.log(message);
};

export const sendNewOrderWhatsapp = async (user, products) => {
  const productsList = products.map((product) => {
    return `$Producto: {product.title} - total: ${
      product.quantity * product.price
    } (${product.quantity} x ${product.price}) - id: ${product.productId}.\n`;
  });
  const message = await client.messages.create({
    body: `Nuevo Pedido de ${user.firstName} ${user.lastName}, email:${
      user.email
    }:/n${productsList.toString().split(",").join("")}`,
    from: `whatsapp:${twilioConfig.twilioWhatsapp}`,
    to: `whatsapp:${twilioConfig.adminPhone}`,
  });
  console.log(message);
};
