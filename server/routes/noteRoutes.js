import express from 'express';
import { createNote, getNotes } from '../controller/NoteController.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/", auth, createNote);
router.get("/", auth, getNotes);

export default router;