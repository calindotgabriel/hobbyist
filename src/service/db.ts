import mongoose from "mongoose";
import chalk from "chalk";
import User, { IUser } from "../models/user";
import Hobby from "../models/hobby";

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@${process.env.DB_CLUSTER}/${process.env.APP_NAME}?retryWrites=true&w=majority`;

const handleErr = (err: unknown) => {
  console.error(chalk.red(err));
};

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const init = () => {
  User.find().then((users: any) => {
    console.log({ users });
  });
};

const saveUser = () => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: "Rodrigo Perez",
  });

  user
    .save()
    .then(() => {
      console.log("Saved user");
    })
    .catch(handleErr);
};

export default { init };
