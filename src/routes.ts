import { Router, Request, Response } from "express";
import { getTasks } from "./controllers";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.json({ msg: "hello wlrd" });
});

router.get("/tasks", getTasks);

export default router;
