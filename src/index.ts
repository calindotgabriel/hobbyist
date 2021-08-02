require("dotenv").config();

import express, { Request, Response, Application } from "express";

import chalk from "chalk";

const handleSysMessage = (msg: string) => {
  console.log(chalk.blue(msg));
}

import dbService from './service/db';
dbService.init();

const app: Application = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!");
});

app.listen(PORT, (): void => {
  handleSysMessage(`Server Running at https://${process.env.HOST}:${PORT}`);
});
