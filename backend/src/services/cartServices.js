import CartRepository from "../data-access/repositories/cart-repository.js";
import ProductRepository from "../data-access/repositories/product-repository.js";

const getCartById = async (id) => {
  const cart = await CartRepository.getById(id);
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
const addProductToCart = async (email, productData) => {
  console.log(productData);
  //Se crea un carrito cuando el cliente guarda un producto, si es que no existe ya el carrito
  const { productId, quantity } = productData; // TODO validate this
  const existingProduct = await ProductRepository.getById(productId);
  const cart = await CartRepository.getOne({ email: email }); //get database cart instance
  /* if (!existingProduct) {
    throw new Error("Product to add doesn't exist in the database"); // TODO improve
  } */
  //If cart already exists for user,
  if (cart) {
    const productIndex = cart.products.findIndex((product) => {
      console.log(product.productId);
      return product.productId == productId;
    });

    console.log("Indice de producto: " + productIndex);
    if (productIndex > -1) {
      //product is already in cart
      let cartProduct = cart.products[productIndex];
      cartProduct.quantity += quantity;
      if (cartProduct.quantity < 1) {
        console.log("Removing product from cart");
        cart.products.splice(productIndex, 1);
      }
    } else if (quantity > 0) {
      //product is not in the cart and quantity is valid
      cart.products.push({
        productId: productId,
        quantity: quantity,
        description: existingProduct.description,
        price: existingProduct.price,
        title: existingProduct.title,
      });
    }
    let data = await CartRepository.save(cart);
    return data; // ? updated cart?
  } else if (quantity > 0) {
    //Create new Cart
    const cartData = {
      email: email,
      products: [
        {
          productId: productId,
          quantity: quantity,
          description: existingProduct.description,
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
