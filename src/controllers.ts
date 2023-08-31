import { Request, Response } from "express";
import { addTaskToCollection, fetchTasksCollection } from "./db";
import { Task } from "./types";

export const getTasks = async (_: Request, res: Response) => {
  try {
    return res.json({ tasks: await fetchTasksCollection() });
  } catch (e) {
    return res.status(500).json({ msg: "An error has ocurred!" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task: Task = req.body;
    const newTask = await addTaskToCollection(task);
    return res.json({ ...task, id: newTask.id });
  } catch (e) {
    return res
      .status(500)
      .json({ msg: "An error has ocurred when creating the task!" });
  }
};

export const editTask = (req: Request, res: Response) => {
  try {
    return res.json({ msg: `edited task!${req.params.id}` });
  } catch (e) {
    return res.status(500).json({ msg: "An error has ocurred!" });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  try {
    return res.json({ msg: `deleted task!${req.params.id}` });
  } catch (e) {
    return res.status(500).json({ msg: "An error has ocurred!" });
  }
};
