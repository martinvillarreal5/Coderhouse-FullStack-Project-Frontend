import productServices from '../services/product/ProductServices.js';

const getProductById = async /* ver si hace falta poner estos asyncs, ya que el container o service ya lo tiene*/(req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({error: "No id found inside request params"}); //agregar validaciones similares en otros metodos,
            //estas validaciones van en esta capa?
        const product = await productServices.getProductById(id);
        product ?
            res.status(200).json(product)
            : response.status(404).end()
                // response.status(404).json("No product with matching id found")
            ;
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
const getProducts = async (req, res) => {
    try {
        const products = await productServices.getProducts()
        products ?
            res.json(products)
            : response.status(404).end();
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
const saveProduct = async (req, res) => {
    try {
        const product = { ...req.body };
        const savedProductId = await productServices.saveProduct(product)
        res.status(201).json('Saved product id: ' + savedProductId);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const data = req.body
        console.log(data)
        const updatedProductId = await productServices.updateProduct(id, data);
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
        //   response.status(204).end() // también podría ser, 204 no content
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