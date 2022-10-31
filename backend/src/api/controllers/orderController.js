import * as orderServices from "../../services/orderServices.js";
import { sendNewOrderMail } from "../utils/mailer.js";

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderServices.createOrder(req.user.email);
    await sendNewOrderMail(
      {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      },
      newOrder.products
    );
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderServices.getOrders({ email: req.user.email });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
