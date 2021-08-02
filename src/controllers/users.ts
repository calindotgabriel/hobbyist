import User, { IUser } from "../models/user";
import mongoose from "mongoose";

const users = {
  findAll: async () => await User.find().populate('hobbies'),
  findOne: async (filter: IUser) => await User.findOne(filter),
  save: async (user: IUser) => {
    const _id = new mongoose.Types.ObjectId();
    const userObj = new User({
        ...user,
        _id,
    });
    await userObj.save();
    return {
        success: true,
        ...user,
        _id,
    }
  },
  delete: async (filter: IUser) => await User.findOneAndDelete(filter),
  update: async (filter: IUser, user: IUser) => await User.findOneAndUpdate(filter, user),
};

export default { users };
