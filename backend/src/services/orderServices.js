import orderRepository from "../data-access/repositories/order-repository.js";
import cartRepository from "../data-access/repositories/cart-repository.js";
//import productRepository from "../data-access/repositories/product-repository.js";
import { AppError } from "../lib/errorHandler.js";
// ? Should i use the services intead of repositories?

export const getOrders = async (dataObject) => {
  return await orderRepository.getAll(dataObject);
};

export const createOrder = async (email) => {
  const cart = await cartRepository.getOne({ email: email });
  if (!cart || cart.products.length < 1) {
    throw new AppError(
      "Invalid Cart",
      "User cart does not exist or is empty",
      404,
      true
    );
  }
  //TODO verify products if are in the database and update them. Easier said than done

  const orderInfo = {
    orderNumber: await orderRepository.getOrderCount(),
    email: email,
    products: cart.products,
    state: "generated",
  };
  const newOrder = await orderRepository.create(orderInfo);
  // ? TODO move mailer stuff here?
  return newOrder;
};

export const updateOrderStatus = async (newState) => {
  return await orderRepository.updateById({ state: newState });
};

export const deleteOrder = async (id) => {
  await orderRepository.deleteById(id);
  return;
};
