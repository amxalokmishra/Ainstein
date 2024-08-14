import { Router } from "express";
import {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.post("/", authMiddleware, errorHandler, createLesson);
router.get("/", authMiddleware, errorHandler, getLessons);
router.get("/:id", authMiddleware, errorHandler, getLessonById);
router.put("/:id", authMiddleware, errorHandler, updateLesson);
router.delete("/:id", authMiddleware, errorHandler, deleteLesson);

export default router;
