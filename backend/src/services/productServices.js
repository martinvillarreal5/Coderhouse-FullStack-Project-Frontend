import ProductRepository from "../data-access/repositories/product-repository.js";

export const getProductById = async (id) => {
  return await ProductRepository.getById(id);
};

export const getProducts = async () => {
  return await ProductRepository.getAll();
};

export const createProduct = async (data) => {
  return await ProductRepository.create(data);
};

export const updateProduct = async (id, data) => {
  if (!data) {
    throw new Error("Update product Data is empty or undefined");
  }
  return await ProductRepository.updateById(id, data);
};

export const deleteProduct = async (id) => {
  await ProductRepository.deleteById(id);
};
