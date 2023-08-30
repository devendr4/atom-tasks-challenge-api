import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";

// For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  console.log("test");
  res.json({ msg: "hello wlrd" });
});

app.get("/tasks", (req: Request, res: Response) => {
  console.log("test");
  res.json({ tasks: "tasks" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
