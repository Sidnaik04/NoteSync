import express from 'express';
import { createTask,getTasks } from '../controller/TaskController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/post", auth, createTask);
router.get("/get", auth, getTasks);

export default router;