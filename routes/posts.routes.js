import express from 'express';
import { CommentController, PostController } from '../controllers/index.js';
import {
  checkAuth,
  handleValidationErrors,
  commentValidation,
  postsValidation,
} from '../middleware/index.js';

const router = express.Router({ mergeParams: true });
router.get('/posts', PostController.getAll);

router.get('/posts/:id', PostController.getOne);
router.get('/ptags', PostController.getLastTags);
router.get('/allposttags', PostController.getAllTags);
router.post('/posts', checkAuth, postsValidation, handleValidationErrors, PostController.create);
router.delete('/posts/:id', checkAuth, PostController.remove);
router.patch(
  '/posts/:id',
  checkAuth,
  postsValidation,
  handleValidationErrors,
  PostController.update
);

router.get('/posts/:id/comments', CommentController.getAll);
router.post(
  '/posts/:id/comments',
  checkAuth,
  commentValidation,
  handleValidationErrors,
  CommentController.create
);
router.patch(
  '/posts/:id/comments/:id',
  checkAuth,
  commentValidation,
  handleValidationErrors,
  CommentController.update
);
router.delete('/posts/:id/comments/:id', checkAuth, CommentController.remove);

export default router;
