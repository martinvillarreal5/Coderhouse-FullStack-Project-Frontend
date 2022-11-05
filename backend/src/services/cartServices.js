import CartRepository from "../data-access/repositories/cart-repository.js";
import ProductRepository from "../data-access/repositories/product-repository.js";

const getCartById = async (id) => {
  return await CartRepository.getById(id);
};

const getCart = async (paramObject) => {
  //TODO update cart info (product info, remove products that dont exist anymore)
  return await CartRepository.getOne(paramObject);
};

const getCarts = async () => {
  //TODO update carts info (products info, remove products that dont exist anymore)
  return await CartRepository.getAll();
};

const addProductToCart = async (email, productData) => {
  //Se crea un carrito cuando el cliente guarda un producto, si es que no existe ya el carrito
  const { productId, quantity } = productData; // TODO validate this
  const existingProduct = await ProductRepository.getById(productId);
  if (!existingProduct) {
    throw new Error("Product to add doesn't exist in the database"); // TODO improve
  }
  const cart = await CartRepository.getOne({ email: email }); //get database cart instance
  //If cart already exists for user,
  if (cart) {
    const productIndex = cart.products.findIndex((product) => {
      return product.productId == productId;
    });
    if (productIndex > -1) {
      //product is already in cart
      let cartProduct = cart.products[productIndex];
      cartProduct.quantity += quantity;
      if (cartProduct.quantity < 1) {
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
    return await CartRepository.save(cart); // ? Should i return updated cart?
  } else if (quantity > 0) {
    //Create new Cart
    return await CartRepository.create({
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
    }); // ? Should i return created cart?
  }
};

const deleteCart = async (id) => {
  await CartRepository.deleteById(id);
};

export default {
  getCartById,
  getCart,
  getCarts,
  addProductToCart,
  deleteCart,
};
