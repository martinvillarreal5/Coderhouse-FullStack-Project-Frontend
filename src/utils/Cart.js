class Cart {
    constructor(object={}) {
        //Check if constructor work
        this.id = object.id || 0;
        this.timestamp = object.timestamp || new Date(Date.now());
        this.products = object.products || [];
    }

    updateCart(object) {
        //Incesario si funciona el constructor de arriba? o es mejor usar este metodo por el try catch?
        //Actualiza atributos del carrito, recibe un carrito anterior
        try {
            this.id = object.id;
            this.timestamp = object.timestamp;
            this.products = object.products;
        } catch(err) {
            console.log('Error en método updateCart: ', err);
        }
    }

    getAll() {
        //Devuelve un array con los objetos presentes en el carrito.
        try {
            return this.products;
        } catch(err) {
            console.log('Error en método getAll: ', err);
        }
    }

    getById(number) {
        //Recibe un id y devuelve el producto con ese id, o null si no está.
        try {
            const product = this.products.find(product => product.id === number);
            return product ? product : null;
        } catch (err) {
            console.log('Error en método getById: ', err);
        }
    }

    addProduct(product) {
        //Agrega un producto al carrito.
        try {
            //TODO, check if product is already in cart
            this.products = [...this.products, product];
        } catch(err) {
            console.log('Error en método addProduct: ', err);
        }
    }

    removeProduct(product) {
        //Remueve un producto del carrito.try {
        try{
            this.products = this.products.filter(existingProduct => existingProduct.id != product.id);
        } catch(err) {
            console.log('Error en método removeProduct: ', err);
        }
        
    }
}

module.exports = {
    Cart: Cart,
};