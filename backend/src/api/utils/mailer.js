import { createTransport } from "nodemailer";
import { mailerConfig } from "../../config/index.js";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: mailerConfig.email,
    pass: mailerConfig.password,
  },
});

export const sendNewRegisterNotification = async (user) => {
  const mailOptions = {
    from: "Servidor Node.js",
    to: mailerConfig.email,
    subject: "Nuevo Registro de Usuario",
    html: `<h1 style="color: blue;">Nuevo Registro: </h1>
    <h2>${user.firstName} ${user.lastName}. email: ${user.email}<h2/>
    `,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log(info); //logs new admin created...
};

export const sendNewOrderMail = async (userData, productsList) => {
  const htmlArray = productsList.map(
    (product) =>
      `<li>Producto: ${product.title} - total: ${
        product.quantity * product.price
      } (${product.quantity} x ${product.price}) - id: ${
        product.productId
      }</li>`
  );
  const orderTotal = productsList.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);
  const mailOptions = {
    from: "Servidor Node.js",
    to: mailerConfig.email,
    subject: `Nuevo Pedido de ${userData.firstName} ${userData.lastName}`,
    html: `<h1 style="color: blue;">Nuevo Pedido: </h1>
    <ul>
    ${htmlArray.toString().split(",").join("")}
    </ul>
    <h2>Precio total del pedido: ${orderTotal}
    `,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log(info);
};
