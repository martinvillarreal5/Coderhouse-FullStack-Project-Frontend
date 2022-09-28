
import ProductRepository from '../data-access/repositories/product-repository.js';

const getProductById = async (id) => {
        if(!id){
                const error = new Error();
                error.status = 400;
                error.message = "Id parameter must be send";
                throw error;
        } // Test, if works correctly add to all services methods? 
        //or is the "malformated id" if in handlerouteerror enough?
        return ProductRepository.getById(id);
}

const getProducts = async () => {
        const products = await ProductRepository.getAll();
        return products
}
const saveProduct = async (data) => {
        const product = data;
        const savedProduct = ProductRepository.save(product);
        return savedProduct; 
}

const updateProduct = async (id, data) => {
        if (!data){
            throw new Error('update product Data is empty or undefined')
        }
        const updatedProductId = await ProductRepository.updateById(id, data);/* 
        if (id != updatedProductId){
            throw new Error('updatedProductId and given Id dont match, error')
        } */
        return updatedProductId;
}

const deleteProduct = async (id) => {
        const deletedProduct = await ProductRepository.deleteById(id);
        return deletedProduct;
}

export default{ getProducts, getProductById, saveProduct, updateProduct, deleteProduct };