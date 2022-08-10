
//import { ProductDao } from '../daos/index.js';
import productServices from '../services/product/ProductServices.js';

const getProductById = async /* ver si hace falta poner estos asyncs, ya que el container o service ya lo tiene*/(req, res) => {
    try {
        const id = req.params.id;
        const product = await productServices.getProductById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
const getProducts = async (req, res) => {
    try {
        const products = await productServices.getProducts()
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
const saveProduct = async (req, res) => {
    try {
        const product = {...req.body};
        //validar cada dato de arriba ?
        const savedProductId = await productServices.saveProduct(product)
        res.status(201).json('Saved product id: ' + savedProductId);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProductId = await productServices.updateProduct(id, modifiedProduct);
        res.status(200).json('Updated product id: ' + updatedProductId);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await productServices.deleteProduct(id);
        res.status(200).json('Product deleted: ' + deletedProduct);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export { 
    getProducts,
    getProductById, 
    saveProduct, 
    updateProduct, 
    deleteProduct 
};