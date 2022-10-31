import orderRepository from "../data-access/repositories/order-repository.js";
import cartRepository from "../data-access/repositories/cart-repository.js";

export const getOrders = async (dataObject) => {
  const orders = await orderRepository.getAll(dataObject);
  return orders;
};

export const createOrder = async (email) => {
  const { products } = await cartRepository.getOne({ email: email });
  if (!products || products.length < 1) {
    //TODO: improve
    throw new Error("User's cart is empty!");
  }
  const orderInfo = {
    orderNumber: await orderRepository.getOrderCount(),
    email: email,
    products: products,
    status: "generated",
  };
  const newOrder = await orderRepository.create(orderInfo);
  // TODO add mailer & messager stuff here
  return newOrder;
};
