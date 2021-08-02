import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IUser {
  _id: String;
  name: String;
}

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  hobbies: [{ type: Schema.Types.ObjectId, ref: "Hobby" }],
});

// const userSchema: Schema = new Schema<IUser>({
//   _id: Schema.Types.ObjectId,
//   name: { type: String, required: true },
//   hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobby' }],
// });

// export default (mongoose.model<IUser>('User', userSchema));

export default (mongoose.model('User', userSchema));
