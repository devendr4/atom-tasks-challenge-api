import { Request, Response } from "express";
import { fetchTasksCollection } from "./db";

export const getTasks = async (_: Request, res: Response) => {
  try {
    return res.json({ tasks: await fetchTasksCollection() });
  } catch (e) {
    return res.status(500).json({ msg: "An error has ocurred!" });
  }
};

export const createTask = (_: Request, res: Response) => {
  try {
    return res.json({ msg: "created!" });
  } catch (e) {
    return res.status(500).json({ msg: "An error has ocurred!" });
  }
};
