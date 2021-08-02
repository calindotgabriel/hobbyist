const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hobbySchema = Schema({
  _id: Schema.Types.ObCjectId,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  passionLevel: Number,
  name: String,
  year: Number,
});

export default mongoose.model('Hobby', hobbySchema);
