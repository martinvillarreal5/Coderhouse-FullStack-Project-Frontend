import ProductRepository from "../data-access/repositories/product-repository.js";

export const getProductById = async (id) => {
  return ProductRepository.getById(id);
};

export const getProducts = async () => {
  const products = await ProductRepository.getAll();
  return products;
};

export const createProduct = async (data) => {
  const product = data;
  const newProduct = ProductRepository.create(product);
  return newProduct;
};

export const updateProduct = async (id, data) => {
  const { price, title, category, stock, description, pictureUrl } = data;
  console.log(data);
  // validate object keys???
  if (!data) {
    throw new Error("update product Data is empty or undefined");
  }
  const updatedProductId = await ProductRepository.updateById(id, data);
  return updatedProductId;
};

export const deleteProduct = async (id) => {
  const deletedProduct = await ProductRepository.deleteById(id);
  return deletedProduct;
};
