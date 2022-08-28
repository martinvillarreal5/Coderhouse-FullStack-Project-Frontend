
import { ProductDao } from '../../daos/index.js';


const getProductById = async (id) => {
        return ProductDao.getById(id);
}
const getProducts = async () => {
        const products = await ProductDao.getAll();
        return products
}
const saveProduct = async (data) => {
        const product = data;
        //validar cada dato de arriba ? o hacer eso en la squema de moongose
        const savedProductId = ProductDao.save(product);
        return savedProductId; //return saved product id
}

const updateProduct = async (id, data) => {
        if (!data){
            throw new Error('update product Data is empty or undefined')
        }
        const updatedProductId = await ProductDao.updateById(id, data);/* 
        if (id != updatedProductId){
            throw new Error('updatedProductId and given Id dont match, error')
        } */
        return updatedProductId;
}

const deleteProduct = async (id) => {
        const deletedProduct = await ProductDao.deleteById(id);
        return deletedProduct;
}




export default { getProducts, getProductById, saveProduct, updateProduct, deleteProduct };