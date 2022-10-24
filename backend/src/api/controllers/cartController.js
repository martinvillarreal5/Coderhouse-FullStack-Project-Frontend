import cartServices from "../../services/cartServices.js";
import { sendNewOrderMail } from "../utils/mailer.js";
import { sendNewOrderSMG, sendNewOrderWhatsapp } from "../utils/messager.js";

const getCartById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await cartServices.getCartById(id);
    cart ? res.status(200).json(cart) : res.status(404).end();
  } catch (error) {
    next(error);
  }
};
const getCart = async (req, res, next) => {
  try {
    //console.log(req.user._id);
    const cart = await cartServices.getCart({ email: req.user.email });
    //console.log(cart);
    if (cart === null || cart.products.length < 1) {
      // null means the findOne query couldn't find a coincidence. i.e., the user doesnt have a cart yet
      // or has one but without products.
      //TODO: test product removal
      return res.status(204).end();
    }
    if (!cart) {
      // for other falsy values, // TODO check if this can possibly happen
      return res.status(500).end();
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
const getCarts = async (req, res, next) => {
  try {
    const carts = await cartServices.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};
const addProductToCart = async (req, res, next) => {
  try {
    const cart = await cartServices.addProductToCart(req.user.email, req.body);
    //res.status(201).json("Saved cart: " + cart);
    res.status(200).json("Saved cart");
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const user = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    const cart = await cartServices.getCart({ email: req.user.email });
    //console.log(cart);
    if (cart === null || cart.products.length < 1) {
      return res
        .status(400)
        .json("The user does not have a cart with products");
    }
    //For Admin
    await sendNewOrderMail({ ...user, email: req.user.email }, cart.products); // ? move these to service layer?
    /* await sendNewOrderWhatsapp(
      { ...user, email: req.user.phone, email: req.user.email },
      cart.products
    ); */
    // For User
    //await sendNewOrderSMG({ ...user, phone: req.user.phone });
    res.status(201).json("Saved Order");
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedCart = await cartServices.deleteCart(id);
    res.status(200).json("Cart deleted: " + deletedCart);
  } catch (error) {
    next(error);
  }
};

export {
  createOrder,
  getCart,
  getCarts,
  getCartById,
  addProductToCart,
  deleteCart,
};
