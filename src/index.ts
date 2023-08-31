import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

initializeApp();

const db = getFirestore();

app.get("/", (req: Request, res: Response) => {
  console.log("test");
  res.json({ msg: "hello wlrd" });
});

app.get("/tasks", async (req: Request, res: Response) => {
  const snapshot = await db.collection("tasks").get();
  console.log(snapshot);
  res.json({ tasks: snapshot });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
