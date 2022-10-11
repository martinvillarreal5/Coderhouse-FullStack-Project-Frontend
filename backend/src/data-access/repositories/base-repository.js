import mongoose from "mongoose";
import { databaseConfig } from "../../config/index.js";

await mongoose
  .connect(databaseConfig.mongoDbUrl)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((error) => {
    console.log("Error en la conección con mongodb: ", error);
  });

class BaseRepository {
  constructor(model) {
    this.model = model;
    //console.log(this.model.collection.collectionName)
  }

  async getById(id) {
    return await this.model.findById(id);
  }
  async getOne(paramsObject) {
    return await this.model.findOne(paramsObject).exec();
  }

  async getAll() {
    //In user change this method to only return not sensible data,
    // i think the toJSON transform already do that tho
    const array = await this.model.find({});
    // find returns a empty array if didnt found a doc?
    return array;
  }

  async create(object) {
    const newObject = await this.model.create(object);
    return newObject;
  }

  async save(object) {
    const newObject = new this.model(object);
    //Usar este metodo solo para objetos ya instaciados? (aquellos que se obtiene desde un findOne, por ej)
    //Para no tener que instanciarlos en este metodo
    const savedObject = await newObject.save();
    return savedObject;
  }

  async updateById(id, data) {
    const updatedObject = await this.model.findByIdAndUpdate(
      id,
      //TODO: check {runValidators: true}
      {
        $set: data,
      },
      { new: true } // returns new object instead of the old one
    );
    return updatedObject;
  }
  async deleteById(id) {
    const deletedProduct = await this.model.findByIdAndRemove(id);
    return deletedProduct; //change to return nothing?
  }

  async deleteAll() {
    //Empty the collection
    const collectionName = this.model.collection.collectionName;
    await mongoose.connection.db.dropCollection(collectionName);
  }
}

export default BaseRepository;
