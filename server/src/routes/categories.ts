import express, { Router } from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryResponses
} from '../controllers/categoryController';
import { authenticate, authorize } from '../middleware/auth';

const router: Router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/:id/responses', getCategoryResponses);

// Protected routes (require authentication + admin/editor role)
router.post('/', authenticate, authorize(['admin', 'editor']), createCategory);
router.put('/:id', authenticate, authorize(['admin', 'editor']), updateCategory);
router.delete('/:id', authenticate, authorize(['admin']), deleteCategory);

export default router;
