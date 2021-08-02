import mongoose from "mongoose";
import Hobby, { IHobby } from "../models/hobby";

const hobbies = {
  findAll: async () => await Hobby.find().populate('user'),
  findOne: async (filter: IHobby) => await Hobby.findOne(filter),
  save: async (hobby: IHobby) => {
    const userObj = new Hobby({
      ...hobby,
      _id: new mongoose.Types.ObjectId(),
    });
    return await userObj.save();
  },
    delete: async (filter: IHobby) => await Hobby.findOneAndDelete(filter),
    update: async (filter: IHobby, hobby: IHobby) =>
      await Hobby.findOneAndUpdate(filter, hobby),
};

export default { hobbies };
