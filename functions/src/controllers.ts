import { Request, Response } from "express";

import {
  addTaskToCollection,
  deleteTaskFromCollection,
  editCollectionTask,
  fetchTasksCollection,
} from "./db";
import { Task } from "./types";
import { handleUpdateError } from "./utils";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { lastTask } = req.query;
    return res.json(await fetchTasksCollection(lastTask as string));
  } catch {
    return res.status(500).json({ msg: "An error has ocurred!" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task: Task = req.body;
    const newTaskDocument = await (await addTaskToCollection(task)).get();
    const newTask = newTaskDocument.data();
    // created response
    return res.status(201).json({
      ...newTask,
      id: newTaskDocument.id,
      createdAt: newTask?.createdAt.toDate(),
    });
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
    return res.json(task);
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
