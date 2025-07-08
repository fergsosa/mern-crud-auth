import { Router } from "express";
import cTasks from "../controllers/tasks.c.js";
import mdAuth from "../middlewares/validateToken.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", mdAuth, cTasks.getTasks);
router.get("/task/:id", mdAuth, cTasks.getTask);

router.post(
  "/task",
  mdAuth,
  validateSchema(createTaskSchema),
  cTasks.createTask
);

router.put("/task/:id", mdAuth, cTasks.updateTask);
router.delete("/task/:id", mdAuth, cTasks.deleteTask);

export default router;
