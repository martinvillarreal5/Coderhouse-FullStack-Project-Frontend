
import mongoose from "mongoose";
import dbConfig from "../dbConfig.js";

await mongoose.connect(dbConfig.mongodb.connectionString,)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log('Error en la conección con mongodb: ', err);
    })
//research when to close a conection

class MongoContainer {
    constructor(collectionName, schema) {
        this.model = mongoose.model(collectionName, schema);
        //console.log(this.model.collection.collectionName)
    }

    async getById(id) {
        try {
            const object = await this.model.findById(id);
            return object ? object : null
        } catch (err) {
            console.log('Error in getById Method: ', err);
        }
    }

    async getAll() {
        try {
            const array = await this.model.find({})
            // find returns a empty array if didnt found a doc
            return array ? array : null;
        } catch (err) {
            console.log('Error in getAll Method: ', err);
        }
    }

    async save(object) {
        try {
            console.log(object)
            object.timestamp = Date.now(); //aqui?
            const newObject = new this.model(object);
            const savedObject = await newObject.save();
            return savedObject._id;
        } catch (err) {
            console.log('Error in Save Method: ', err);
        }
    }

    async updateById(id, data) {
        //cambiar metodo en cartDao, o hacer que no tenga efecto en el mismo
        try {
            const updatedObject = await this.model.findByIdAndUpdate(
                id,
                //{runValidators: true}, parece que tiene limitaciones essta validacion, luego cambiar a un find y luego un save con validacion entre medio
                {
                    $set: data, //validar data para que no sobreEscriba campos que no deben cambiarse? (como _id, timestamp, etc )
                },
                { new: true } // sin esto, la funcion devuelve el objeto anterior a la modificacion
            );
            return (updatedObject._id);
        } catch (err) {
            console.log('Error in Update Method: ', err);
        }
    }
    async deleteById(id) {
        // Elimina del archivo el objeto con el id buscado.
        try {
            const deletedProduct = await this.model.findByIdAndRemove(
                id 
                // buscar parametro para que solo devuelva la id, y cambiarlos
            );
            return deletedProduct;
        } catch (err) {
            console.log('Error in deleteById Method: ', err);
        }
    }

    async deleteAll() {
        // Elimina todos los objetos presentes en el archivo.
        const collectionName = this.model.collection.collectionName //async??
        try {
            await mongoose.connection.db.dropCollection(collectionName)//async??
        } catch (err) {
            console.log('Error in deleteAll Method: ', err);
        }
    }
}

export default MongoContainer;