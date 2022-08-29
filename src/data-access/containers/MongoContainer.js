
import mongoose from "mongoose";
import dbConfig from "../dbConfig.js";

await mongoose.connect(dbConfig.mongodb.connectionString,) 
// move to another file using crete conection, the usea a conection instead of mongoose object
    .then(() => console.log("DB Connection Successfull!"))
    .catch((error) => {
        console.log('Error en la conección con mongodb: ', error);
    })
//research when to close a conection

class MongoContainer {
    constructor(collectionName, schema) {
        this.model = mongoose.model(collectionName, schema);
        //console.log(this.model.collection.collectionName)
    }

    getById(id) {
        return this.model.findById(id);
    }
/* 
    checkExistance(id){
        
    } */

    async getAll() {
        try {
            const array = await this.model.find({})
            // find returns a empty array if didnt found a doc
            return array ? array : null;
        } catch (error) {
            console.log('Error in getAll Method: ', error);
        }
    }

    async save(object) {
        object.timestamp = Date.now(); //aqui?
        const newObject = new this.model(object);
        const savedObject = await newObject.save();
        return savedObject._id;
    }

    async updateById(id, data) {
        //cambiar a metodos especificos para cada dao, o hacer esto validando en cada service mejor?
        const updatedObject = await this.model.findByIdAndUpdate(
            id,
            //{runValidators: true}, parece que tiene limitaciones essta validacion, luego cambiar a un find y luego un save con validacion entre medio
            {
                $set: data, //validar data para que no sobreEscriba campos que no deben cambiarse? (como _id, timestamp, etc )
            },
            { new: true } // sin esto, la funcion devuelve el objeto anterior a la modificacion
        );
        return (updatedObject._id); //cambiar para que devuelva el nuevo objeto
    }
    async deleteById(id) {
        const deletedProduct = await this.model.findByIdAndRemove(
            id
            // buscar parametro para que solo devuelva la id, y cambiarlos
        );
        return deletedProduct;
    }

    async deleteAll() { //Empty the collection
        const collectionName = this.model.collection.collectionName
        try {
            await mongoose.connection.db.dropCollection(collectionName)
        } catch (error) {
            console.log('Error in deleteAll Method: ', error);
        }
    }
}

export default MongoContainer;