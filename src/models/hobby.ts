const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export interface IHobby {
  _id?: String;
  passionLevel?: Number;
  name?: String;
  year?: Number;
  user?: String;
}

const hobbySchema = Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  passionLevel: Number,
  name: String,
  year: Number,
});

export default mongoose.model('Hobby', hobbySchema);
