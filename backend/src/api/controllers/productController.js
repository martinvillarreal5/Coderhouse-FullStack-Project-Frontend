import productServices from "../../services/productServices.js";
import logger from "../../utils/logger.js";

const getProductById = async (req, res, next) => {
  try {
    const product = await productServices.getProductById(req.params.id);
    product ? res.status(200).json(product) : res.status(404).end();
  } catch (error) {
    next(error);
  }
};
const getProducts = async (req, res, next) => {
  try {
    const products = await productServices.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
const saveProduct = async (req, res, next) => {
  try {
    /* const newNoteInfo = {
      // ? Should i validate this even if it get valdiated in the ORM anyways
      ...(title && data.title),
      ...(price && data.price),
      ...(stock && data.stock),
      ...(description && data.description),
      ...(code && data.code),
    }; // TODO testing hacer esto en service mejor
    logger.info(newNoteInfo); */
    const savedProduct = await productServices.saveProduct(req.body);
    res.status(201).json("Saved product: " + savedProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    /* const newNoteInfo = {
            ...title && data.title,
            ...price && data.price,
            ...stock && data.stock,
            ...description && data.description,
            ...code && data.code,
        }; // testing hacer esto en service mejor
        logger.info(newNoteInfo) */
    const updatedProductId = await productServices.updateProduct(id, data);
    res.status(200).json("Updated product id: " + updatedProductId);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (next, req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await productServices.deleteProduct(id);
    res.status(200).json("Product deleted: " + deletedProduct);
    //   res.status(204).end() // también podría ser, 204 no content
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
