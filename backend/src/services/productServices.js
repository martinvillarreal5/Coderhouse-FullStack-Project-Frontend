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
  /*const allowedKeys = [price, title, category, stock, description, pictureUrl];
   if (Object.keys(data).some((key) => !allowedKeys.includes(key))) {
    //if object has non-allowed key:
    throw new Error("Update product Data has invalid properties");
  } */ //? one option

  /* let updateData = {};
  if (data?.price) updateData.price = data.price;
  if (data?.title) updateData.title = data.title;
  if (data?.category) updateData.category = data.category;
  if (data?.stock) updateData.stock = data.stock;
  if (data?.description) updateData.description = data.description;
  if (data?.pictureUrl) updateData.pictureUrl = data.pictureUrl;
  */ //? another option

  if (!data) {
    throw new Error("Update product Data is empty or undefined");
  }
  return await ProductRepository.updateById(id, data);
};

export const deleteProduct = async (id) => {
  await ProductRepository.deleteById(id);
};
