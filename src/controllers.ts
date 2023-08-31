import { Request, Response } from "express";
import { fetchTasks } from "./db";

export const getTasks = async (_: Request, res: Response) => {
  try {
    return res.json({ tasks: await fetchTasks() });
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const createTask = () => {
  try {
    // creating
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
