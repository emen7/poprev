import express, { Router } from 'express';
import {
  getResponses,
  getResponseById,
  createResponse,
  updateResponse,
  deleteResponse,
  searchResponses,
  generatePdf
} from '../controllers/responseController';
import { authenticate, authorize } from '../middleware/auth';

const router: Router = express.Router();

// Public routes
router.get('/', getResponses);
router.get('/search', searchResponses);
router.get('/:id', getResponseById);
router.get('/:id/pdf', generatePdf);

// Protected routes (require authentication + admin/editor role)
router.post('/', authenticate, authorize(['admin', 'editor']), createResponse);
router.put('/:id', authenticate, authorize(['admin', 'editor']), updateResponse);
router.delete('/:id', authenticate, authorize(['admin']), deleteResponse);

export default router;
