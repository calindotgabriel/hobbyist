require("dotenv").config();

import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from "express";

import chalk from "chalk";
import morgan from "morgan";

import usersRouter from "./routes/users";
import hobbiesRouter from "./routes/hobbies";

import dbService from "./service/db";
dbService.init();

const handleSysMessage = (msg: string) => {
  console.log(chalk.blue(msg));
};

import "express-async-errors";

const app: Application = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, (): void => {
  handleSysMessage(`Server Running at https://${process.env.HOST}:${PORT}`);
});

app.use(express.json());

/** Logging */
app.use(morgan("dev"));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message) {
    res.status(403);
    res.json({ error: err.message });
  }

  next(err);
});

app.use("/users", usersRouter);
app.use("/hobbies", hobbiesRouter);

import * as swaggerDocument from "../swagger.json";
import swaggerUi from "swagger-ui-express";

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
