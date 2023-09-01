import { onRequest } from "firebase-functions/v2/https";

import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";

// For env File
dotenv.config();

const app: Application = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/v1", router);

// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
export default onRequest(app);
