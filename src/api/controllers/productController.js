import {productServices} from '../../services/index.js';
import logger from '../../utils/logger.js';

const getProductById = (request, response, next,) => {
    const id = request.params.id;/* 
        if (!id) return response.status(400).json({ error: "No id found inside request params" }); //agregar validaciones similares en otros metodos,
        //estas validaciones van en esta capa? son necesarias? si ya tengo especificado el cast error en el errorhandler? */
    productServices.getProductById(id)
        .then((product) => {
            product ?
                response.status(200).json(product)
                : response.status(404).end()
        })
        .catch(error => next(error))
}
const getProducts = async (request, response, next,) => {
    try {
        const products = await productServices.getProducts()
        response.status(200).json(products)
    } catch (error) {
        next(error);
    }
}
const saveProduct = async (request, response, next) => {
    try {
        const newNoteInfo = {
            ...title && data.title,
            ...price && data.price,
            ...stock && data.stock,
            ...description && data.description,
            ...code && data.code,
        }; // testing hacer esto en service mejor
        logger.info(newNoteInfo)
        const savedProduct = await productServices.saveProduct(request.body)
        response.status(201).json('Saved product: ' + savedProduct);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (request, response, next) => {
    try {
        const id = request.params.id;
        const data = request.body
        /* const newNoteInfo = {
            ...title && data.title,
            ...price && data.price,
            ...stock && data.stock,
            ...description && data.description,
            ...code && data.code,
        }; // testing hacer esto en service mejor
        logger.info(newNoteInfo) */
        const updatedProductId = await productServices.updateProduct(id, data);
        response.status(200).json('Updated product id: ' + updatedProductId);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (next, request, response) => {
    try {
        const id = request.params.id;
        const deletedProduct = await productServices.deleteProduct(id);
        response.status(200).json('Product deleted: ' + deletedProduct);
        //   response.status(204).end() // también podría ser, 204 no content
    } catch (error) {
        next(error);
    }
}

export {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
};