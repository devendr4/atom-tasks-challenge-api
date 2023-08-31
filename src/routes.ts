import { Router } from "express";
import { getTasks } from "./controllers";

const router = Router();

router.get("/tasks", getTasks);

export default router;
