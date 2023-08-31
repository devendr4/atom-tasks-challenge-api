import { Request, Response } from "express";

import {
  addTaskToCollection,
  deleteTaskFromCollection,
  editCollectionTask,
  fetchTasksCollection,
} from "./db";
import { Task } from "./types";
import { handleUpdateError } from "./utils";

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
    // created response
    return res.status(201).json({ ...task, id: newTask.id });
  } catch (e) {
    return res
      .status(500)
      .json({ msg: "An error has ocurred when creating the task!" });
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const task: Task = req.body;
    await editCollectionTask({ ...task, id: req.params.id });
    return res.json({ msg: `edited task!${req.params.id}` });
  } catch (e: unknown) {
    return handleUpdateError({ e, res });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await deleteTaskFromCollection(req.params.id);
    return res.status(204).send();
  } catch (e: unknown) {
    return handleUpdateError({ e, res });
  }
};
