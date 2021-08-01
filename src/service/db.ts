import mongoose from "mongoose";

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@${process.env.DB_CLUSTER}/${process.env.APP_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

export default mongoose;