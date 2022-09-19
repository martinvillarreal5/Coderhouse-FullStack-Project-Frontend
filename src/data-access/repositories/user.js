//import mongoose from 'mongoose';
import BaseRepository from "./base.js";
import UserModel from "../models/user.js"

export default class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }

    async getByUsername(username) {
        const user = await this.model.findOne({ username: username }).exec();
        // Can use this in services this way: const { _id } = userService.getByUsername
        // then use the id for other methods?

        // since this has await the exec is not needed, but:
        // With `exec()`, the stack trace includes where in your code you called `exec()` for better error handling. 
        // Research error.stack
        // add .exec() to all the container methods included here: https://mongoosejs.com/docs/queries.html
        // https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
        return user;
    }
};