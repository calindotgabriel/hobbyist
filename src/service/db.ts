import mongoose from "mongoose";
import chalk from "chalk";
import User, { IUser } from "../models/user";
import Hobby, { IHobby } from "../models/hobby";
import hobbiesController from "../controllers/hobbies";

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@${process.env.DB_CLUSTER}/${process.env.APP_NAME}?retryWrites=true&w=majority`;

const handleErr = (err: unknown) => {
  console.error(chalk.red(err));
};

mongoose.set("debug", true);

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const init = () => {
  User.find().then(async (users: any) => {
    // console.log({ users });
    const empty = users.length === 0;
    if (empty) {
      const user = await createUser({
        name: "Gevi Giustiniani",
      });
      console.log(user);
      await createHobby(user._id, { name: "Mining Crypto" });
    }
  });
};

const createUser = (user: IUser) => {
  const userObj = new User({
    ...user,
    _id: new mongoose.Types.ObjectId(),
  });

  return (
    userObj
      .save()
      // .then(() => {
      //   console.log("Saved user " + user.name);
      // })
      .catch(handleErr)
  );
};

const createHobby = (userId: string, hobby: IHobby) => {
  hobbiesController.hobbies.save({
    ...hobby,
    user: userId,
  });
};

export default { init };
