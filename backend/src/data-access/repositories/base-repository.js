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
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async getOne(paramsObject) {
    return await this.model.findOne(paramsObject).exec();
    //? findOne returns null when no document satisfies the field in the filter
    //! But if the specified field in the filter does not exist,
    //! (for example because of a typo), MongoDB returns an arbitrary document.
    //! This can cause some really bad bugs and security issues. Check strict schema mode
  }

  async getAll() {
    return await this.model.find({}).exec();
    // ? find returns a empty array if didnt found a doc
    //! find method has the same problem as findOne above
  }

  async create(object) {
    return await this.model.create(object);
  }

  async save(modelInstance) {
    return await modelInstance.save();
  }

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        runValidators: true,
        new: true, // returns new object instead of the old one
      }
    );
  }

  async deleteById(id) {
    await this.model.findByIdAndRemove(id);
  }

  async deleteAll() {
    //Empty the collection
    await mongoose.connection.db.dropCollection(
      this.model.collection.collectionName
    );
  }
}

export default BaseRepository;
