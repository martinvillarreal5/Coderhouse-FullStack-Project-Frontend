import CartRepository from "../data-access/repositories/cart-repository.js";
import ProductRepository from "../data-access/repositories/product-repository.js";

const getCartById = async (id) => {
  const cart = await CartRepository.getById(id);
  //if (!cart) throw 'Cart not found'; // ? va en esta capa?
  return cart;
};
const getCart = async (paramObject) => {
  const cart = await CartRepository.getOne(paramObject);
  //if (!cart) throw 'Cart not found'; // ? va en esta capa?
  return cart;
};

const getCarts = async () => {
  return await CartRepository.getAll();
};
const addProductToCart = async (ownerId, productData) => {
  //Se crea un carrito cuando el cliente guarda un producto, si es que no existe ya el carrito
  const { productId, quantity } = productData; // TODO validate this
  const existingProduct = await ProductRepository.getById(productId);
  if (!existingProduct) {
    throw new Error("Product to add doesn't exist in the database"); // TODO improve
  }
  const cart = await CartRepository.getOne({ ownerId: ownerId }); //get database cart instance
  //If cart already exists for user,
  if (cart) {
    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );
    if (productIndex > -1) {
      //product is already in cart
      let cartProduct = cart.products[productIndex];
      if (quantity < 0 && cart.quantity + quantity <= 0) {
        //if resulting quantity is 0 or less
        // TODO check if its working
        cart.products.splice(productIndex, 1);
      } else {
        cartProduct.quantity += quantity;
      }
      //cartProduct.price = existingProduct.price; // ? updates price?
    } else if (quantity > 0) {
      //product is not in the cart and quantity is valid
      cart.products.push({
        productId: productId,
        quantity: quantity,
        price: existingProduct.price,
        title: existingProduct.title,
      });
    }
    let data = await CartRepository.save(cart);
    return data; // ? updated cart?
  } else if (quantity > 0) {
    //Create new Cart
    const cartData = {
      ownerId: ownerId,
      products: [
        {
          productId: productId,
          quantity: quantity,
          price: existingProduct.price,
          title: existingProduct.title,
        },
      ],
    };
    const newCart = await CartRepository.create(cartData);
    return newCart; // ? created cart?
  }
};

const deleteCart = async (id) => {
  const deletedCart = await CartRepository.deleteById(id);
  return deletedCart;
};

export default {
  getCartById,
  getCart,
  getCarts,
  addProductToCart,
  deleteCart,
};
