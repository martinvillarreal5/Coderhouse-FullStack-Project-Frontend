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
    //? findOne returns null when no document satisfies the field in the filter
    //! But if the specified field in the filter does not exist,
    //! (for example because of a typo), MongoDB returns an arbitrary document.
    //! This can cause some really bad bugs and security issues.
  }

  async getAll() {
    return await this.model.find({});
    // ? find returns a empty array if didnt found a doc
    //! find method has the same problem as findOne above
  }

  async create(object) {
    const newObject = await this.model.create(object);
    return newObject;
  }

  async save(modelInstance) {
    //test
    const savedObject = await modelInstance.save();
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
