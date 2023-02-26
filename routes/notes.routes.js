import express from 'express';
import { NoteController } from '../controllers/index.js';
import { checkAuth, handleValidationErrors, notesValidation } from '../middleware/index.js';

const router = express.Router({ mergeParams: true });
router.get('/notes', NoteController.getAll);
router.get('/notes/:id', NoteController.getOne);
router.post('/notes', checkAuth, notesValidation, handleValidationErrors, NoteController.create);
router.delete('/notes/:id', checkAuth, NoteController.remove);
router.patch(
  '/notes/:id',
  checkAuth,
  notesValidation,
  handleValidationErrors,
  NoteController.update
);

export default router;
