
import ProductRepository from '../data-access/repositories/product.js';


const getProductById = async (id) => {
        return ProductRepository.getById(id);
}
const getProducts = async () => {
        const products = await ProductRepository.getAll();
        return products
}
const saveProduct = async (data) => {
        const product = data;
        //validar cada dato de arriba ? o hacer eso en la squema de moongose
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




export default { getProducts, getProductById, saveProduct, updateProduct, deleteProduct };