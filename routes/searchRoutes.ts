import { Router } from "express";
import { searchContent } from "../controllers/searchController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.get("/", authMiddleware, errorHandler, searchContent);

export default router;
