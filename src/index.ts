/* eslint-disable no-console */
import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./routes";

// For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use("/v1", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
