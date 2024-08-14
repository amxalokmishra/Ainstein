import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.post("/", authMiddleware, errorHandler, createCourse);
router.get("/", authMiddleware, errorHandler, getCourses);
router.get("/:id", authMiddleware, errorHandler, getCourseById);
router.put("/:id", authMiddleware, errorHandler, updateCourse);
router.delete("/:id", authMiddleware, errorHandler, deleteCourse);

export default router;
