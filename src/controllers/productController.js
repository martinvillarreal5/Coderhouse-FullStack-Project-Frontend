const { Container } = require('../utils/Container');
const { Product } = require('../utils/Product');

// Base de productos
const products = new Container('src/db/products.json');

const getProducts = async (req, res) => {
    try {
        res.json(await products.getAll());
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const getProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await products.getById(id);
        if (!product) throw 'producto no encontrado';
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const saveProduct = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock, code } = req.body;
        const product = new Product(title, description, thumbnail, Number(price), Number(stock), code);
        let id = await products.save(product);
        res.status(201).json(id);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await products.getById(id);
        if (!product) throw 'producto no encontrado';
        const { title, description, thumbnail, price, stock, code } = req.body;
        modifiedProduct = new Product(title, description, thumbnail, Number(price), Number(stock), code);
        await products.updateById(id, modifiedProduct);
        res.status(200).json('Producto modificado');
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await products.getById(id);
        if (!product) throw 'producto no encontrado';

        await products.deleteById(id);
        res.status(200).json('Producto eliminado');
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = { getProducts, getProductById, saveProduct, updateProduct, deleteProduct }