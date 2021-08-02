require("dotenv").config();

import express, { Express, Request, Response, Application } from "express";

import chalk from "chalk";
import morgan from "morgan";

import usersRouter from "./routes/users";
import hobbiesRouter from "./routes/hobbies";

import dbService from "./service/db";
dbService.init();

const handleSysMessage = (msg: string) => {
  console.log(chalk.blue(msg));
};

const app: Application = express();

const PORT = process.env.PORT || 8000;


app.listen(PORT, (): void => {
  handleSysMessage(`Server Running at https://${process.env.HOST}:${PORT}`);
});


app.use(express.json());

/** Logging */
app.use(morgan("dev"));

app.use('/users', usersRouter);
app.use('/hobbies', hobbiesRouter);
