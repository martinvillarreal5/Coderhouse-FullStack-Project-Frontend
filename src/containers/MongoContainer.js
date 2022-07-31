
import mongoose from "mongoose";
import dbConfig from "../dbConfig.js";

await mongoose.connect(dbConfig.mongodb.connectionString)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log('Error en la conección con mongodb: ', err);
    });

console.log("Conexión establecida con Mongo")

class MongoContainer {
    constructor(collectionName, schema) {
        this.model = mongoose.model(collectionName, new mongoose.Schema(schema));
    }

    getById = async (id) => {
        try {
            const object = await this.model.findById(id);
            return object ? object : null
        } catch (err) {
            console.log('Error en método getById: ', err);
        }
    }

    getAll = async () => {
        try {
           return await this.model.find({});
        } catch (err) {
            console.log('Error en método getAll: ', err);
        }
    } 

    save = async (object) => {
        try {
            object.timestamp = Date.now();
            const newObject = new this.model(object);
            const savedObject = await newObject.save();
            return savedObject.id; 
        } catch (err) { 
            console.log('Error en método save: ', err);
        }
    }

    update = async (req, res) => {
        try {
            const updatedObject = await Model.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedModel);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export default MongoContainer;