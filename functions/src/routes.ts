import { Router } from "express";
import { deleteTask, editTask, getTasks, createTask } from "./controllers";

const router = Router();

router.get("/tasks", getTasks);

router.post("/tasks", createTask);

router.put("/tasks/:id", editTask);

router.delete("/tasks/:id", deleteTask);

export default router;
